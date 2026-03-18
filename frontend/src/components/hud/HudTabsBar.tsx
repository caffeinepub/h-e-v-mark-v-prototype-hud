import { useSuitStore } from "@/state/suitState";
import { useHazardsStore } from "@/state/hazardsState";
import { uiSfx } from "@/audio/uiSfx";

interface Tab {
  id: string;
  label: string;
  shortLabel?: string;
}

function getTabsForStyle(systemStyle: string): Tab[] {
  const common: Tab[] = [
    { id: "basics", label: "BASICS", shortLabel: "BAS" },
    { id: "medical", label: "MEDICAL", shortLabel: "MED" },
    { id: "hazards", label: "HAZARDS", shortLabel: "HAZ" },
    { id: "tactical", label: "TACTICAL", shortLabel: "TAC" },
    { id: "weapons", label: "WEAPONS", shortLabel: "WPN" },
    { id: "utilities", label: "UTILITIES", shortLabel: "UTL" },
    { id: "vehicles", label: "VEHICLES", shortLabel: "VEH" },
    { id: "arsenal", label: "ARSENAL", shortLabel: "ARS" },
    { id: "objectives", label: "OBJECTIVES", shortLabel: "OBJ" },
    { id: "diagnostics", label: "DIAGNOSTICS", shortLabel: "DGN" },
    { id: "info", label: "INFO", shortLabel: "INF" },
    { id: "settings", label: "SETTINGS", shortLabel: "SET" },
  ];

  if (systemStyle === "hev") {
    common.push({ id: "research", label: "RESEARCH", shortLabel: "RES" });
  } else if (systemStyle === "hecu") {
    common.push({ id: "command", label: "COMMAND", shortLabel: "CMD" });
  } else if (systemStyle === "security" || systemStyle === "guard") {
    common.push({ id: "facility", label: "FACILITY", shortLabel: "FAC" });
  }

  return common;
}

interface HudTabsBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  systemStyle: string;
}

export function HudTabsBar({ activeTab, onTabChange, systemStyle }: HudTabsBarProps) {
  const { stats } = useSuitStore();
  const { getAggregateHazard } = useHazardsStore();

  const tabs = getTabsForStyle(systemStyle);
  const hazardLevel = getAggregateHazard();

  const hasAlert = (tabId: string): boolean => {
    switch (tabId) {
      case "basics":
        return stats.health <= 30 || stats.armor <= 20 || stats.ammo <= 20;
      case "medical":
        return stats.health <= 40;
      case "hazards":
        return hazardLevel >= 50;
      default:
        return false;
    }
  };

  const handleTabClick = (tabId: string) => {
    uiSfx.tabSwitch();
    onTabChange(tabId);
  };

  return (
    <div className="hud-tabs-bar flex flex-wrap gap-px border-b border-border/40 bg-background/20 px-1 py-1 overflow-x-auto">
      {tabs.map((tab) => {
        const alert = hasAlert(tab.id);
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`relative font-mono text-[10px] tracking-widest uppercase px-2 py-1 transition-all duration-150 border shrink-0
              ${
                isActive
                  ? "border-accent text-accent bg-accent/10"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border/60"
              }`}
          >
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.shortLabel ?? tab.label}</span>
            {alert && (
              <span
                className={`absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-destructive ${
                  isActive ? "" : "animate-pulse"
                }`}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
