import { useState, useEffect } from 'react';
import { HudLayout } from './components/hud/HudLayout';
import { HudOfflineOverlay } from './components/hud/HudOfflineOverlay';
import { MinimalHudView } from './components/hud/MinimalHudView';
import { TacticalHudShell } from './components/hud/TacticalHudShell';
import { BootSequenceOverlay } from './components/boot/BootSequenceOverlay';
import { BasicsTab } from './tabs/BasicsTab';
import { MedicalTab } from './tabs/MedicalTab';
import { InfoTab } from './tabs/InfoTab';
import { UtilitiesTab } from './tabs/UtilitiesTab';
import { WeaponsTab } from './tabs/WeaponsTab';
import { TacticalTab } from './tabs/TacticalTab';
import { HazardsTab } from './tabs/HazardsTab';
import { SettingsTab } from './tabs/SettingsTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useInfoSettingsStore } from './state/infoSettingsState';
import { uiSfx } from './audio/uiSfx';

type TabValue = 'basics' | 'medical' | 'info' | 'utilities' | 'weapons' | 'hazards' | 'tactical' | 'settings';

function App() {
  const [bootComplete, setBootComplete] = useState(false);
  const [activeTab, setActiveTab] = useState<TabValue>('basics');
  const { hudActive, displayMode, tacticalModeEnabled } = useInfoSettingsStore();

  // Safety: If tactical tab is active but tactical mode is disabled, switch to basics
  useEffect(() => {
    if (activeTab === 'tactical' && !tacticalModeEnabled) {
      setActiveTab('basics');
    }
  }, [activeTab, tacticalModeEnabled]);

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
            <TabsList className="hud-tabs-list">
              <TabsTrigger value="basics" className="hud-tab-trigger">
                BASICS
              </TabsTrigger>
              <TabsTrigger value="medical" className="hud-tab-trigger">
                MEDICAL
              </TabsTrigger>
              <TabsTrigger value="info" className="hud-tab-trigger">
                INFO
              </TabsTrigger>
              <TabsTrigger value="utilities" className="hud-tab-trigger">
                UTILITIES
              </TabsTrigger>
              <TabsTrigger value="weapons" className="hud-tab-trigger">
                WEAPONS
              </TabsTrigger>
              <TabsTrigger value="hazards" className="hud-tab-trigger">
                HAZARDS
              </TabsTrigger>
              {tacticalModeEnabled && (
                <TabsTrigger value="tactical" className="hud-tab-trigger">
                  TACTICAL
                </TabsTrigger>
              )}
              <TabsTrigger value="settings" className="hud-tab-trigger">
                SETTINGS
              </TabsTrigger>
            </TabsList>

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
        <TabsList className="hud-tabs-list">
          <TabsTrigger value="basics" className="hud-tab-trigger">
            BASICS
          </TabsTrigger>
          <TabsTrigger value="medical" className="hud-tab-trigger">
            MEDICAL
          </TabsTrigger>
          <TabsTrigger value="info" className="hud-tab-trigger">
            INFO
          </TabsTrigger>
          <TabsTrigger value="utilities" className="hud-tab-trigger">
            UTILITIES
          </TabsTrigger>
          <TabsTrigger value="weapons" className="hud-tab-trigger">
            WEAPONS
          </TabsTrigger>
          <TabsTrigger value="hazards" className="hud-tab-trigger">
            HAZARDS
          </TabsTrigger>
          {tacticalModeEnabled && (
            <TabsTrigger value="tactical" className="hud-tab-trigger">
              TACTICAL
            </TabsTrigger>
          )}
          <TabsTrigger value="settings" className="hud-tab-trigger">
            SETTINGS
          </TabsTrigger>
        </TabsList>

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
