import { useEffect, useRef, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import BootSequenceOverlay from "@/components/boot/BootSequenceOverlay";
import { FactionSwitchOverlay } from "@/components/boot/FactionSwitchOverlay";
import { HudLayout } from "@/components/hud/HudLayout";
import CrtOverlay from "@/components/hud/CrtOverlay";
import { HudTabsBar } from "@/components/hud/HudTabsBar";
import { HudGlobalEffects } from "@/components/hud/HudGlobalEffects";
import { DamageIndicator } from "@/components/hud/DamageIndicator";
import { SuitVoiceReadout } from "@/components/hud/SuitVoiceReadout";
import { HudOfflineOverlay } from "@/components/hud/HudOfflineOverlay";
import { MinimalHudView } from "@/components/hud/MinimalHudView";
import { EmergencyModeView } from "@/components/hud/EmergencyModeView";
import { TacticalOverlay } from "@/components/hud/TacticalOverlay";
import { EnhancedStatusIndicators } from "@/components/hud/EnhancedStatusIndicators";
import { HazardWarningIcons } from "@/components/hazards/HazardWarningIcons";
import { MiniAudioPlayer } from "@/components/utilities/MiniAudioPlayer";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Tabs
import { BasicsTab } from "@/tabs/BasicsTab";
import { MedicalTab } from "@/tabs/MedicalTab";
import { HazardsTab } from "@/tabs/HazardsTab";
import { TacticalTab } from "@/tabs/TacticalTab";
import { WeaponsTab } from "@/tabs/WeaponsTab";
import { UtilitiesTab } from "@/tabs/UtilitiesTab";
import { InfoTab } from "@/tabs/InfoTab";
import { SettingsTab } from "@/tabs/SettingsTab";
import { VehiclesTab } from "@/tabs/VehiclesTab";
import { ArsenalTab } from "@/tabs/ArsenalTab";
import { ObjectivesTab } from "@/tabs/ObjectivesTab";
import { SystemsDiagnosticsTab } from "@/tabs/SystemsDiagnosticsTab";
import { ResearchLabTab } from "@/tabs/ResearchLabTab";
import { CommandBriefingTab } from "@/tabs/CommandBriefingTab";
import { FacilityMonitoringTab } from "@/tabs/FacilityMonitoringTab";

import { useInfoSettingsStore } from "@/state/infoSettingsStore";
import { useSuitStore } from "@/state/suitState";
import { useAutoUiScale } from "@/hooks/useAutoUiScale";
import { useHudPresence } from "@/hooks/useHudPresence";
import { registerServiceWorker } from "@/pwa/registerServiceWorker";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 30_000 },
  },
});

registerServiceWorker();

type TabId =
  | "basics"
  | "medical"
  | "hazards"
  | "tactical"
  | "weapons"
  | "utilities"
  | "info"
  | "settings"
  | "vehicles"
  | "arsenal"
  | "objectives"
  | "diagnostics"
  | "research"
  | "command"
  | "facility";

/** Renders active damage flash indicators driven by the suit store's damageEvents queue. */
function DamageIndicatorManager() {
  const { damageEvents, clearOldDamageEvents } = useSuitStore();
  const [activeEvent, setActiveEvent] = useState<{
    direction: "top" | "bottom" | "left" | "right";
    id: number;
  } | null>(null);

  useEffect(() => {
    const latest = damageEvents[damageEvents.length - 1];
    if (latest) {
      setActiveEvent({ direction: latest.direction, id: latest.timestamp });
    }
  }, [damageEvents]);

  const handleComplete = () => {
    setActiveEvent(null);
    clearOldDamageEvents();
  };

  if (!activeEvent) return null;

  return (
    <DamageIndicator
      key={activeEvent.id}
      direction={activeEvent.direction}
      onComplete={handleComplete}
    />
  );
}

function HudApp() {
  const [bootDone, setBootDone] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("basics");
  const hudRef = useRef<HTMLDivElement>(null);

  const {
    systemStyle,
    displayMode,
    minimalLayoutEnabled,
    hudOnline,
    factionSwitching,
    targetFaction,
    completeFactionSwitch,
    uiScale,
  } = useInfoSettingsStore();

  const { stats } = useSuitStore();

  const autoScale = useAutoUiScale();
  const effectiveScale = (uiScale ?? 1.0) * autoScale;

  useHudPresence(hudRef);

  const handleBootComplete = () => {
    setBootDone(true);
  };

  // Derive critical flashing state for HudGlobalEffects
  const isCriticalFlashing = stats.health < 25 || stats.armor < 15;

  // Keyboard shortcuts for tab switching
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!bootDone) return;
      const tabMap: Record<string, TabId> = {
        "1": "basics",
        "2": "medical",
        "3": "hazards",
        "4": "tactical",
        "5": "weapons",
        "6": "utilities",
        "7": "info",
        "8": "settings",
        "9": "vehicles",
      };
      if (tabMap[e.key] && !e.ctrlKey && !e.altKey && !e.metaKey) {
        const target = e.target as HTMLElement;
        if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") {
          setActiveTab(tabMap[e.key]);
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [bootDone]);

  const isEmergency = displayMode === "EMERGENCY";
  const isMinimal = minimalLayoutEnabled;
  const isTactical = displayMode === "TACTICAL";

  const renderTabContent = () => {
    switch (activeTab) {
      case "basics": return <BasicsTab />;
      case "medical": return <MedicalTab />;
      case "hazards": return <HazardsTab />;
      case "tactical": return <TacticalTab />;
      case "weapons": return <WeaponsTab />;
      case "utilities": return <UtilitiesTab />;
      case "info": return <InfoTab />;
      case "settings": return <SettingsTab />;
      case "vehicles": return <VehiclesTab />;
      case "arsenal": return <ArsenalTab />;
      case "objectives": return <ObjectivesTab />;
      case "diagnostics": return <SystemsDiagnosticsTab />;
      case "research": return <ResearchLabTab />;
      case "command": return <CommandBriefingTab />;
      case "facility": return <FacilityMonitoringTab />;
      default: return <BasicsTab />;
    }
  };

  return (
    <>
      {/* Boot sequence — shown until complete */}
      {!bootDone && (
        <BootSequenceOverlay onComplete={handleBootComplete} />
      )}

      {/* Main HUD — rendered after boot completes */}
      {bootDone && (
        <div
          ref={hudRef}
          className="hud-root"
          style={{
            transform: `scale(${effectiveScale})`,
            transformOrigin: "top left",
            width: `${100 / effectiveScale}%`,
            height: `${100 / effectiveScale}%`,
          }}
        >
          <HudLayout>
            {/* Global visual effects (non-interactive overlays) */}
            <CrtOverlay />
            <HudGlobalEffects isCriticalFlashing={isCriticalFlashing} />
            <DamageIndicatorManager />
            <HazardWarningIcons />
            <EnhancedStatusIndicators />

            {/* HUD offline overlay */}
            {!hudOnline && <HudOfflineOverlay />}

            {/* Faction switch overlay */}
            {factionSwitching && (
              <FactionSwitchOverlay
                targetFaction={targetFaction || systemStyle}
                onComplete={completeFactionSwitch}
              />
            )}

            {/* Tactical overlay (non-exclusive) */}
            {isTactical && <TacticalOverlay />}

            {/* Main content area */}
            {isEmergency ? (
              <EmergencyModeView />
            ) : isMinimal ? (
              <MinimalHudView />
            ) : (
              <div className="hud-main flex flex-col h-full">
                {/* Suit voice readout */}
                <SuitVoiceReadout />

                {/* Tab navigation */}
                <HudTabsBar
                  activeTab={activeTab}
                  onTabChange={(tab) => setActiveTab(tab as TabId)}
                  systemStyle={systemStyle}
                />

                {/* Tab content */}
                <div className="hud-tab-content flex-1 overflow-y-auto">
                  <ErrorBoundary>
                    {renderTabContent()}
                  </ErrorBoundary>
                </div>
              </div>
            )}

            {/* Persistent mini audio player */}
            <MiniAudioPlayer />
          </HudLayout>
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <HudApp />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
