import { Button } from '@/components/ui/button';
import { useSuitStore } from '@/state/suitState';
import { useInfoSettingsStore } from '@/state/infoSettingsStore';
import { useToggleModule } from '@/hooks/useQueries';
import { uiSfx } from '@/audio/uiSfx';
import { Shield, Zap, Activity, Radio, Eye, Flashlight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function QuickAccessControls() {
  const { modules } = useSuitStore();
  const { systemStyle } = useInfoSettingsStore();
  const toggleModule = useToggleModule();

  const handleToggle = (moduleName: string) => {
    uiSfx.buttonClick();
    toggleModule.mutate(moduleName);
  };

  const controls = [
    { id: 'flashlight', label: 'LIGHT', icon: Flashlight, active: modules.flashlight },
    { id: 'helmet', label: 'HELMET', icon: Shield, active: modules.helmet },
    { id: 'respirator', label: 'FILTER', icon: Activity, active: modules.respirator },
    { id: 'radiationShield', label: 'RAD', icon: Shield, active: modules.radiationShield },
    { id: 'shieldBoost', label: 'BOOST', icon: Zap, active: modules.shieldBoost },
    { id: 'hazardSystem', label: 'HAZARD', icon: Eye, active: modules.hazardSystem },
  ];

  const getTitle = () => {
    switch (systemStyle) {
      case 'hecu': return 'QUICK COMBAT CONTROLS';
      case 'guard': return 'QUICK ACCESS SYSTEMS';
      default: return 'QUICK ACCESS CONTROLS';
    }
  };

  return (
    <div className="hud-panel-compact quick-access-panel">
      <div className="hud-panel-title-compact">{getTitle()}</div>
      <div className="hud-panel-content-compact">
        <div className="grid grid-cols-3 gap-2">
          {controls.map((control) => {
            const Icon = control.icon;
            return (
              <Button
                key={control.id}
                variant={control.active ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleToggle(control.id)}
                className={cn(
                  'flex flex-col items-center gap-1 h-auto py-2 transition-all',
                  control.active && 'quick-access-active'
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs">{control.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
