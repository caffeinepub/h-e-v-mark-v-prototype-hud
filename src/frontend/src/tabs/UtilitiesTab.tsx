import { useSuitStore } from '../state/suitState';
import { useInfoSettingsStore } from '../state/infoSettingsStore';
import { useMarkFeatures } from '../hooks/useMarkFeatures';
import { useLogStore } from '../state/systemLog';
import { HudSwitch } from '../components/common/HudSwitch';
import { AmbiencePlayer } from '../components/audio/AmbiencePlayer';
import { RadioControlPanel } from '../components/audio/RadioControlPanel';
import { GravityGunControl } from '../components/utilities/GravityGunControl';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Lightbulb, Wind, Zap, Shield, Activity, Radio, Music, Settings } from 'lucide-react';
import { uiSfx } from '../audio/uiSfx';
import { hevVoice } from '../audio/hevVoice';

export function UtilitiesTab() {
  const { modules, toggleModule } = useSuitStore();
  const { systemStyle, halfLife2ThemeActive, hudStyleMode } = useInfoSettingsStore();
  const { addEntry } = useLogStore();
  const markFeatures = useMarkFeatures();

  const handleModuleToggle = (moduleName: keyof typeof modules, displayName: string) => {
    toggleModule(moduleName);
    const newState = !modules[moduleName];
    addEntry('module', `${displayName} ${newState ? 'ENABLED' : 'DISABLED'}`);
    uiSfx.toggle();
    if (newState) {
      hevVoice.moduleEnabled(displayName);
    } else {
      hevVoice.moduleDisabled(displayName);
    }
  };

  const getModuleTitle = () => {
    switch (systemStyle) {
      case 'hecu':
        return 'COMBAT SYSTEMS';
      case 'security':
      case 'guard':
        return 'SECURITY EQUIPMENT';
      default:
        return 'MODULE CONTROLS';
    }
  };

  // Filter modules based on mark features
  const availableModules = [
    {
      id: 'flashlight' as keyof typeof modules,
      name: 'Flashlight',
      icon: Lightbulb,
      enabled: modules.flashlight,
      available: markFeatures.modules.flashlight,
    },
    {
      id: 'helmet' as keyof typeof modules,
      name: 'Helmet HUD',
      icon: Shield,
      enabled: modules.helmet,
      available: markFeatures.modules.helmet,
    },
    {
      id: 'respirator' as keyof typeof modules,
      name: 'Respirator',
      icon: Wind,
      enabled: modules.respirator,
      available: markFeatures.modules.respirator,
    },
    {
      id: 'longJump' as keyof typeof modules,
      name: 'Long Jump',
      icon: Zap,
      enabled: modules.longJump,
      available: markFeatures.modules.longJump && hudStyleMode !== 'hl2',
    },
    {
      id: 'advancedMedical' as keyof typeof modules,
      name: 'Advanced Medical',
      icon: Activity,
      enabled: modules.advancedMedical,
      available: markFeatures.modules.advancedMedical,
    },
    {
      id: 'radiationShield' as keyof typeof modules,
      name: 'Radiation Shield',
      icon: Shield,
      enabled: modules.radiationShield,
      available: markFeatures.modules.radiationShield,
    },
    {
      id: 'defibrillator' as keyof typeof modules,
      name: 'Defibrillator',
      icon: Activity,
      enabled: modules.defibrillator,
      available: markFeatures.modules.defibrillator,
    },
    {
      id: 'shieldBoost' as keyof typeof modules,
      name: 'Shield Boost',
      icon: Shield,
      enabled: modules.shieldBoost,
      available: markFeatures.modules.shieldBoost,
    },
    {
      id: 'hazardSystem' as keyof typeof modules,
      name: 'Hazard System',
      icon: Activity,
      enabled: modules.hazardSystem,
      available: markFeatures.modules.hazardSystem,
    },
    {
      id: 'moduleSync' as keyof typeof modules,
      name: 'Module Sync',
      icon: Settings,
      enabled: modules.moduleSync,
      available: markFeatures.modules.moduleSync,
    },
  ].filter((module) => module.available);

  // Mark I has no utilities tab
  if (!markFeatures.tabs.utilities) {
    return (
      <div className="tab-content-compact">
        <div className="hud-panel-compact">
          <div className="text-center py-8 opacity-70">
            <Settings className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <div className="font-semibold">UTILITIES UNAVAILABLE</div>
            <div className="text-xs mt-2">This feature requires Mark III or higher</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tab-content-compact">
      {/* Module Controls */}
      <div className="hud-panel-compact mb-3">
        <div className="hud-panel-title-compact">{getModuleTitle()}</div>
        <div className="hud-panel-content-compact">
          <div className="module-grid">
            {availableModules.map((module) => (
              <div key={module.id} className="flex items-center justify-between">
                <Label htmlFor={module.id} className="text-xs flex items-center gap-2 cursor-pointer">
                  <module.icon className="w-4 h-4" />
                  {module.name}
                </Label>
                <HudSwitch
                  id={module.id}
                  checked={module.enabled}
                  onCheckedChange={() => handleModuleToggle(module.id, module.name)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gravity Gun Control - HL2 only */}
      {halfLife2ThemeActive && (
        <>
          <GravityGunControl />
          <Separator className="my-3" />
        </>
      )}

      {/* Ambience Player */}
      <div className="hud-panel-compact mb-3">
        <div className="hud-panel-title-compact flex items-center gap-2">
          <Music className="w-4 h-4" />
          AMBIENCE PLAYER
        </div>
        <div className="hud-panel-content-compact">
          <AmbiencePlayer />
        </div>
      </div>

      {/* Radio Control */}
      <div className="hud-panel-compact">
        <div className="hud-panel-title-compact flex items-center gap-2">
          <Radio className="w-4 h-4" />
          RADIO CONTROL
        </div>
        <div className="hud-panel-content-compact">
          <RadioControlPanel />
        </div>
      </div>
    </div>
  );
}
