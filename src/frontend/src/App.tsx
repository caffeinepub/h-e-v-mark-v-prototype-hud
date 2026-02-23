import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Toaster } from '@/components/ui/sonner';
import { HudLayout } from './components/hud/HudLayout';
import { HudOfflineOverlay } from './components/hud/HudOfflineOverlay';
import { MinimalHudView } from './components/hud/MinimalHudView';
import { TacticalHudShell } from './components/hud/TacticalHudShell';
import { EmergencyModeView } from './components/hud/EmergencyModeView';
import { HudTabsBar } from './components/hud/HudTabsBar';
import { BootSequenceOverlay } from './components/boot/BootSequenceOverlay';
import { BasicsTab } from './tabs/BasicsTab';
import { MedicalTab } from './tabs/MedicalTab';
import { InfoTab } from './tabs/InfoTab';
import { UtilitiesTab } from './tabs/UtilitiesTab';
import { WeaponsTab } from './tabs/WeaponsTab';
import { SettingsTab } from './tabs/SettingsTab';
import { HazardsTab } from './tabs/HazardsTab';
import { TacticalTab } from './tabs/TacticalTab';
import { VehiclesTab } from './tabs/VehiclesTab';
import { SecurityTab } from './tabs/SecurityTab';
import { MilitaryTab } from './tabs/MilitaryTab';
import { HevTab } from './tabs/HevTab';
import { useInfoSettingsStore } from './state/infoSettingsStore';
import { useSuitStore } from './state/suitState';
import { useGetModuleStates } from './hooks/useQueries';
import { registerServiceWorker } from './pwa/registerServiceWorker';
import { uiSfx } from './audio/uiSfx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function AppContent() {
  const [bootComplete, setBootComplete] = useState(false);
  const [activeTab, setActiveTab] = useState('basics');
  const { displayMode, hudOnline, showTacticalTab, emergencyMode, setDisplayMode, systemStyle } = useInfoSettingsStore();
  const { stats } = useSuitStore();
  const { data: modules } = useGetModuleStates();
  const setSuitModules = useSuitStore((state) => state.setModules);

  // Sync backend module state to Zustand store
  useEffect(() => {
    if (modules) {
      setSuitModules(modules);
    }
  }, [modules, setSuitModules]);

  // Register service worker for PWA
  useEffect(() => {
    registerServiceWorker();
  }, []);

  // Auto-activate emergency mode when vitals are critical
  useEffect(() => {
    if (stats.health < 25 || stats.armor < 20) {
      if (displayMode !== 'EMERGENCY' && !emergencyMode) {
        setDisplayMode('EMERGENCY');
      }
    }
  }, [stats.health, stats.armor, displayMode, emergencyMode, setDisplayMode]);

  // Keyboard shortcuts for tab navigation, display mode switching, and faction switching
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Faction switching shortcuts (Ctrl+1/2/3/4)
      if (e.ctrlKey || e.metaKey) {
        const factionMap: Record<string, 'hev' | 'hecu' | 'security' | 'resistance'> = {
          '1': 'hev',
          '2': 'hecu',
          '3': 'security',
          '4': 'resistance',
        };

        if (factionMap[e.key]) {
          e.preventDefault();
          useInfoSettingsStore.getState().setSystemStyle(factionMap[e.key]);
          uiSfx.confirm();
          return;
        }
      }

      // Display mode hotkeys (F1-F4)
      if (e.key === 'F1') {
        e.preventDefault();
        setDisplayMode('STANDARD');
        uiSfx.toggle();
        return;
      }
      if (e.key === 'F2') {
        e.preventDefault();
        setDisplayMode('MINIMAL');
        uiSfx.toggle();
        return;
      }
      if (e.key === 'F3') {
        e.preventDefault();
        setDisplayMode('TACTICAL');
        uiSfx.toggle();
        return;
      }
      if (e.key === 'F4') {
        e.preventDefault();
        setDisplayMode('EMERGENCY');
        uiSfx.toggle();
        return;
      }

      // Tab navigation shortcuts (1-9)
      const tabMap: Record<string, string> = {
        '1': 'basics',
        '2': 'medical',
        '3': 'info',
        '4': 'utilities',
        '5': 'weapons',
        '6': 'hazards',
        '7': showTacticalTab ? 'tactical' : 'vehicles',
        '8': 'vehicles',
        '9': 'settings',
      };

      if (tabMap[e.key]) {
        e.preventDefault();
        setActiveTab(tabMap[e.key]);
        uiSfx.tabSwitch();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showTacticalTab, setDisplayMode]);

  if (!bootComplete) {
    return <BootSequenceOverlay onComplete={() => setBootComplete(true)} />;
  }

  // Emergency mode
  if (displayMode === 'EMERGENCY' || emergencyMode) {
    return (
      <HudLayout>
        <EmergencyModeView />
      </HudLayout>
    );
  }

  // Minimal display mode
  if (displayMode === 'MINIMAL') {
    return (
      <HudLayout>
        <MinimalHudView />
      </HudLayout>
    );
  }

  // Tactical display mode
  if (displayMode === 'TACTICAL') {
    return (
      <HudLayout>
        <TacticalHudShell>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <HudTabsBar activeTab={activeTab} onTabChange={setActiveTab} />
            <TabsContent value="basics" className="tab-content-animated">
              <BasicsTab />
            </TabsContent>
            <TabsContent value="medical" className="tab-content-animated">
              <MedicalTab />
            </TabsContent>
            <TabsContent value="info" className="tab-content-animated">
              <InfoTab />
            </TabsContent>
            <TabsContent value="utilities" className="tab-content-animated">
              <UtilitiesTab />
            </TabsContent>
            <TabsContent value="weapons" className="tab-content-animated">
              <WeaponsTab />
            </TabsContent>
            <TabsContent value="hazards" className="tab-content-animated">
              <HazardsTab />
            </TabsContent>
            {showTacticalTab && (
              <TabsContent value="tactical" className="tab-content-animated">
                <TacticalTab />
              </TabsContent>
            )}
            {(systemStyle === 'security' || systemStyle === 'guard') && (
              <TabsContent value="security" className="tab-content-animated">
                <SecurityTab />
              </TabsContent>
            )}
            {systemStyle === 'hecu' && (
              <TabsContent value="military" className="tab-content-animated">
                <MilitaryTab />
              </TabsContent>
            )}
            {systemStyle === 'hev' && (
              <TabsContent value="hev" className="tab-content-animated">
                <HevTab />
              </TabsContent>
            )}
            <TabsContent value="vehicles" className="tab-content-animated">
              <VehiclesTab />
            </TabsContent>
            <TabsContent value="settings" className="tab-content-animated">
              <SettingsTab />
            </TabsContent>
          </Tabs>
        </TacticalHudShell>
      </HudLayout>
    );
  }

  // Standard display mode
  return (
    <HudLayout>
      {!hudOnline && <HudOfflineOverlay />}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <HudTabsBar activeTab={activeTab} onTabChange={setActiveTab} />
        <TabsContent value="basics" className="tab-content-animated">
          <BasicsTab />
        </TabsContent>
        <TabsContent value="medical" className="tab-content-animated">
          <MedicalTab />
        </TabsContent>
        <TabsContent value="info" className="tab-content-animated">
          <InfoTab />
        </TabsContent>
        <TabsContent value="utilities" className="tab-content-animated">
          <UtilitiesTab />
        </TabsContent>
        <TabsContent value="weapons" className="tab-content-animated">
          <WeaponsTab />
        </TabsContent>
        <TabsContent value="hazards" className="tab-content-animated">
          <HazardsTab />
        </TabsContent>
        {showTacticalTab && (
          <TabsContent value="tactical" className="tab-content-animated">
            <TacticalTab />
          </TabsContent>
        )}
        {(systemStyle === 'security' || systemStyle === 'guard') && (
          <TabsContent value="security" className="tab-content-animated">
            <SecurityTab />
          </TabsContent>
        )}
        {systemStyle === 'hecu' && (
          <TabsContent value="military" className="tab-content-animated">
            <MilitaryTab />
          </TabsContent>
        )}
        {systemStyle === 'hev' && (
          <TabsContent value="hev" className="tab-content-animated">
            <HevTab />
          </TabsContent>
        )}
        <TabsContent value="vehicles" className="tab-content-animated">
          <VehiclesTab />
        </TabsContent>
        <TabsContent value="settings" className="tab-content-animated">
          <SettingsTab />
        </TabsContent>
      </Tabs>
    </HudLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
