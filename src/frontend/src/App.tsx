import { useState, useEffect, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HudLayout } from './components/hud/HudLayout';
import { BootSequenceOverlay } from './components/boot/BootSequenceOverlay';
import { BasicsTab } from './tabs/BasicsTab';
import { MedicalTab } from './tabs/MedicalTab';
import { InfoTab } from './tabs/InfoTab';
import { UtilitiesTab } from './tabs/UtilitiesTab';
import { WeaponsTab } from './tabs/WeaponsTab';
import { SettingsTab } from './tabs/SettingsTab';
import { TacticalTab } from './tabs/TacticalTab';
import { MinimalHudView } from './components/hud/MinimalHudView';
import { TacticalHudShell } from './components/hud/TacticalHudShell';
import { HudOfflineOverlay } from './components/hud/HudOfflineOverlay';
import { useUIStore } from './state/uiState';
import { useSuitStore } from './state/suitState';
import { useLogStore } from './state/systemLog';
import { useAudioStore } from './state/audioState';
import { useHazardsStore } from './state/hazardsState';
import { useInfoSettingsStore } from './state/infoSettingsState';
import { useWeaponSystemsStore } from './state/weaponSystemsState';
import { useHazardAlertMonitor } from './state/hazardAlerts';
import { audioBus } from './audio/audioBus';
import { uiSfx } from './audio/uiSfx';
import { cn } from '@/lib/utils';

export default function App() {
  const [showBoot, setShowBoot] = useState(true);
  const [bootKey, setBootKey] = useState(0);
  const [currentTab, setCurrentTab] = useState('basics');
  const { displayMode, hudActive, tacticalModeEnabled } = useInfoSettingsStore();
  
  // Initialize audio bus
  useEffect(() => {
    audioBus.initialize();
  }, []);

  // Monitor hazard alerts
  useHazardAlertMonitor();

  const resetUI = useCallback((reason?: string) => {
    // Reset all stores to defaults
    useSuitStore.getState().reset();
    useHazardsStore.getState().reset();
    useLogStore.getState().clear();
    useAudioStore.getState().stop();
    useUIStore.getState().reset();
    useInfoSettingsStore.getState().reset();
    useWeaponSystemsStore.getState().reset();
    // Trigger boot sequence again
    setBootKey(prev => prev + 1);
    setShowBoot(true);
    // Add log entry after boot completes
    setTimeout(() => {
      useLogStore.getState().addEntry('system', reason || 'System restart initiated via console command.');
    }, 100);
  }, []);

  const handleBootComplete = useCallback(() => {
    setShowBoot(false);
    useLogStore.getState().addEntry('system', 'Boot sequence completed. H.E.V Mark V PROTOTYPE systems online. Welcome to Black Mesa Research Facility.');
  }, []);

  const handleTabChange = useCallback((value: string) => {
    setCurrentTab(value);
    uiSfx.tabSwitch();
  }, []);

  // Safety: if tactical tab is active but tactical mode is disabled, switch to basics
  useEffect(() => {
    if (currentTab === 'tactical' && !tacticalModeEnabled) {
      setCurrentTab('basics');
    }
  }, [currentTab, tacticalModeEnabled]);

  // Expose restart function globally for console commands
  useEffect(() => {
    (window as any).__hevRestart = resetUI;
    return () => {
      delete (window as any).__hevRestart;
    };
  }, [resetUI]);

  // Render minimal mode view
  if (displayMode === 'MINIMAL') {
    return (
      <>
        {showBoot && <BootSequenceOverlay key={bootKey} onComplete={handleBootComplete} />}
        <HudLayout displayMode={displayMode}>
          <MinimalHudView />
        </HudLayout>
      </>
    );
  }

  // Render tactical mode with reorganized layout
  if (displayMode === 'TACTICAL') {
    return (
      <>
        {showBoot && <BootSequenceOverlay key={bootKey} onComplete={handleBootComplete} />}
        <HudLayout displayMode={displayMode}>
          <TacticalHudShell>
            <div className={cn('hud-content-wrapper', !hudActive && 'hud-offline')}>
              <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full h-full flex flex-col">
                <TabsList className="hud-tabs-list">
                  <TabsTrigger value="basics" className="hud-tab-trigger">BASICS</TabsTrigger>
                  <TabsTrigger value="medical" className="hud-tab-trigger">MEDICAL</TabsTrigger>
                  {tacticalModeEnabled && (
                    <TabsTrigger value="tactical" className="hud-tab-trigger">TACTICAL</TabsTrigger>
                  )}
                  <TabsTrigger value="info" className="hud-tab-trigger">INFO</TabsTrigger>
                  <TabsTrigger value="utilities" className="hud-tab-trigger">UTILITIES</TabsTrigger>
                  <TabsTrigger value="weapons" className="hud-tab-trigger">WEAPONS</TabsTrigger>
                  <TabsTrigger value="settings" className="hud-tab-trigger">SETTINGS</TabsTrigger>
                </TabsList>
                
                <div className="flex-1 overflow-hidden">
                  <TabsContent value="basics" className="h-full m-0 data-[state=active]:flex">
                    <BasicsTab />
                  </TabsContent>
                  <TabsContent value="medical" className="h-full m-0 data-[state=active]:flex">
                    <MedicalTab />
                  </TabsContent>
                  {tacticalModeEnabled && (
                    <TabsContent value="tactical" className="h-full m-0 data-[state=active]:flex">
                      <TacticalTab />
                    </TabsContent>
                  )}
                  <TabsContent value="info" className="h-full m-0 data-[state=active]:flex">
                    <InfoTab />
                  </TabsContent>
                  <TabsContent value="utilities" className="h-full m-0 data-[state=active]:flex">
                    <UtilitiesTab />
                  </TabsContent>
                  <TabsContent value="weapons" className="h-full m-0 data-[state=active]:flex">
                    <WeaponsTab />
                  </TabsContent>
                  <TabsContent value="settings" className="h-full m-0 data-[state=active]:flex">
                    <SettingsTab />
                  </TabsContent>
                </div>
              </Tabs>
              {!hudActive && <HudOfflineOverlay />}
            </div>
          </TacticalHudShell>
        </HudLayout>
      </>
    );
  }

  // Render standard mode
  return (
    <>
      {showBoot && <BootSequenceOverlay key={bootKey} onComplete={handleBootComplete} />}
      <HudLayout displayMode={displayMode}>
        <div className={cn('hud-content-wrapper', !hudActive && 'hud-offline')}>
          <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full h-full flex flex-col">
            <TabsList className="hud-tabs-list">
              <TabsTrigger value="basics" className="hud-tab-trigger">BASICS</TabsTrigger>
              <TabsTrigger value="medical" className="hud-tab-trigger">MEDICAL</TabsTrigger>
              {tacticalModeEnabled && (
                <TabsTrigger value="tactical" className="hud-tab-trigger">TACTICAL</TabsTrigger>
              )}
              <TabsTrigger value="info" className="hud-tab-trigger">INFO</TabsTrigger>
              <TabsTrigger value="utilities" className="hud-tab-trigger">UTILITIES</TabsTrigger>
              <TabsTrigger value="weapons" className="hud-tab-trigger">WEAPONS</TabsTrigger>
              <TabsTrigger value="settings" className="hud-tab-trigger">SETTINGS</TabsTrigger>
            </TabsList>
            
            <div className="flex-1 overflow-hidden">
              <TabsContent value="basics" className="h-full m-0 data-[state=active]:flex">
                <BasicsTab />
              </TabsContent>
              <TabsContent value="medical" className="h-full m-0 data-[state=active]:flex">
                <MedicalTab />
              </TabsContent>
              {tacticalModeEnabled && (
                <TabsContent value="tactical" className="h-full m-0 data-[state=active]:flex">
                  <TacticalTab />
                </TabsContent>
              )}
              <TabsContent value="info" className="h-full m-0 data-[state=active]:flex">
                <InfoTab />
              </TabsContent>
              <TabsContent value="utilities" className="h-full m-0 data-[state=active]:flex">
                <UtilitiesTab />
              </TabsContent>
              <TabsContent value="weapons" className="h-full m-0 data-[state=active]:flex">
                <WeaponsTab />
              </TabsContent>
              <TabsContent value="settings" className="h-full m-0 data-[state=active]:flex">
                <SettingsTab />
              </TabsContent>
            </div>
          </Tabs>
          {!hudActive && <HudOfflineOverlay />}
        </div>
      </HudLayout>
    </>
  );
}
