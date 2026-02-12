import { useSuitStore } from '../state/suitState';
import { useToggleModule } from '../hooks/useQueries';
import { HudSwitch } from '../components/common/HudSwitch';
import { Label } from '@/components/ui/label';
import { AmbiencePlayer } from '../components/audio/AmbiencePlayer';
import { hevVoice } from '../audio/hevVoice';
import { uiSfx } from '../audio/uiSfx';

type ModuleKey = keyof typeof initialModules;

const initialModules = {
  helmet: { label: 'HELMET', description: 'Heads-up display and protection' },
  respirator: { label: 'RESPIRATOR', description: 'Air filtration system' },
  longJump: { label: 'LONG JUMP', description: 'Enhanced mobility module' },
  flashlight: { label: 'FLASHLIGHT', description: 'Tactical illumination' },
  advancedMedical: { label: 'ADVANCED MEDICAL', description: 'Enhanced healing systems' },
  radiationShield: { label: 'RADIATION SHIELD', description: 'Radiation protection' },
  defibrillator: { label: 'DEFIBRILLATOR', description: 'Emergency cardiac response' },
  shieldBoost: { label: 'SHIELD BOOST', description: 'Temporary armor enhancement' },
  hazardSystem: { label: 'HAZARD SYSTEM', description: 'Environmental monitoring' },
  moduleSync: { label: 'MODULE SYNC', description: 'System synchronization' },
};

export function UtilitiesTab() {
  const { modules } = useSuitStore();
  const toggleModule = useToggleModule();

  const handleToggle = (moduleKey: ModuleKey) => {
    const willBeEnabled = !modules[moduleKey];
    const moduleLabel = initialModules[moduleKey].label;
    
    toggleModule.mutate(moduleKey, {
      onSuccess: () => {
        uiSfx.toggle();
        if (willBeEnabled) {
          hevVoice.moduleEnabled(moduleLabel);
        } else {
          hevVoice.moduleDisabled(moduleLabel);
        }
      },
    });
  };

  return (
    <div className="tab-content-compact">
      <div className="utilities-grid-compact">
        <div className="hud-panel-compact">
          <div className="hud-panel-title-compact">MODULE CONTROLS</div>
          <div className="hud-panel-content-compact">
            <div className="modules-list-compact">
              {(Object.keys(initialModules) as ModuleKey[]).map((key) => {
                const module = initialModules[key];
                const isActive = modules[key];
                
                return (
                  <div key={key} className="module-row-compact">
                    <div className="module-info-compact">
                      <Label htmlFor={key} className="module-label-compact">
                        {module.label}
                      </Label>
                      <span className="module-description-compact">{module.description}</span>
                    </div>
                    <HudSwitch
                      id={key}
                      checked={isActive}
                      onCheckedChange={() => handleToggle(key)}
                      disabled={toggleModule.isPending}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="hud-panel-compact">
          <div className="hud-panel-title-compact">AMBIENCE PLAYER</div>
          <div className="hud-panel-content-compact">
            <AmbiencePlayer />
          </div>
        </div>
      </div>
    </div>
  );
}
