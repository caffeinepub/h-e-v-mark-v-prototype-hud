import { useState, useEffect } from 'react';
import { HudLayout } from './components/hud/HudLayout';
import { HudOfflineOverlay } from './components/hud/HudOfflineOverlay';
import { MinimalHudView } from './components/hud/MinimalHudView';
import { TacticalHudShell } from './components/hud/TacticalHudShell';
import { BootSequenceOverlay } from './components/boot/BootSequenceOverlay';
import { HudTabsBar } from './components/hud/HudTabsBar';
import { BasicsTab } from './tabs/BasicsTab';
import { MedicalTab } from './tabs/MedicalTab';
import { InfoTab } from './tabs/InfoTab';
import { UtilitiesTab } from './tabs/UtilitiesTab';
import { WeaponsTab } from './tabs/WeaponsTab';
import { TacticalTab } from './tabs/TacticalTab';
import { HazardsTab } from './tabs/HazardsTab';
import { SettingsTab } from './tabs/SettingsTab';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useInfoSettingsStore } from './state/infoSettingsState';
import { useSuitStore } from './state/suitState';
import { useGetModuleStates } from './hooks/useQueries';
import { uiSfx } from './audio/uiSfx';
import { registerServiceWorker } from './pwa/registerServiceWorker';

type TabValue = 'basics' | 'medical' | 'info' | 'utilities' | 'weapons' | 'hazards' | 'tactical' | 'settings';

function App() {
  const [bootComplete, setBootComplete] = useState(false);
  const [activeTab, setActiveTab] = useState<TabValue>('basics');
  const { hudActive, displayMode, tacticalModeEnabled } = useInfoSettingsStore();
  const { setModules } = useSuitStore();
  
  // Fetch module states from backend
  const { data: moduleStates } = useGetModuleStates();

  // Sync backend module states into Zustand store for other tabs that need it
  useEffect(() => {
    if (moduleStates) {
      setModules(moduleStates);
    }
  }, [moduleStates, setModules]);

  // Safety: If tactical tab is active but tactical mode is disabled, switch to basics
  useEffect(() => {
    if (activeTab === 'tactical' && !tacticalModeEnabled) {
      setActiveTab('basics');
    }
  }, [activeTab, tacticalModeEnabled]);

  // Register service worker after boot completes
  useEffect(() => {
    if (bootComplete) {
      registerServiceWorker();
    }
  }, [bootComplete]);

  const handleBootComplete = () => {
    setBootComplete(true);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as TabValue);
    uiSfx.tabSwitch();
  };

  if (!bootComplete) {
    return <BootSequenceOverlay onComplete={handleBootComplete} />;
  }

  // MINIMAL display mode
  if (displayMode === 'MINIMAL') {
    return (
      <HudLayout>
        <MinimalHudView />
      </HudLayout>
    );
  }

  // TACTICAL display mode
  if (displayMode === 'TACTICAL') {
    return (
      <HudLayout>
        <TacticalHudShell>
          <Tabs value={activeTab} onValueChange={handleTabChange} className="hud-tabs">
            <HudTabsBar showTactical={tacticalModeEnabled} />

            <TabsContent value="basics" className="hud-tab-content">
              <BasicsTab />
            </TabsContent>

            <TabsContent value="medical" className="hud-tab-content">
              <MedicalTab />
            </TabsContent>

            <TabsContent value="info" className="hud-tab-content">
              <InfoTab />
            </TabsContent>

            <TabsContent value="utilities" className="hud-tab-content">
              <UtilitiesTab />
            </TabsContent>

            <TabsContent value="weapons" className="hud-tab-content">
              <WeaponsTab />
            </TabsContent>

            <TabsContent value="hazards" className="hud-tab-content">
              <HazardsTab />
            </TabsContent>

            {tacticalModeEnabled && (
              <TabsContent value="tactical" className="hud-tab-content">
                <TacticalTab />
              </TabsContent>
            )}

            <TabsContent value="settings" className="hud-tab-content">
              <SettingsTab />
            </TabsContent>
          </Tabs>
        </TacticalHudShell>
      </HudLayout>
    );
  }

  // STANDARD display mode
  return (
    <HudLayout>
      {!hudActive && <HudOfflineOverlay />}
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="hud-tabs">
        <HudTabsBar showTactical={tacticalModeEnabled} />

        <TabsContent value="basics" className="hud-tab-content">
          <BasicsTab />
        </TabsContent>

        <TabsContent value="medical" className="hud-tab-content">
          <MedicalTab />
        </TabsContent>

        <TabsContent value="info" className="hud-tab-content">
          <InfoTab />
        </TabsContent>

        <TabsContent value="utilities" className="hud-tab-content">
          <UtilitiesTab />
        </TabsContent>

        <TabsContent value="weapons" className="hud-tab-content">
          <WeaponsTab />
        </TabsContent>

        <TabsContent value="hazards" className="hud-tab-content">
          <HazardsTab />
        </TabsContent>

        {tacticalModeEnabled && (
          <TabsContent value="tactical" className="hud-tab-content">
            <TacticalTab />
          </TabsContent>
        )}

        <TabsContent value="settings" className="hud-tab-content">
          <SettingsTab />
        </TabsContent>
      </Tabs>
    </HudLayout>
  );
}

export default App;
