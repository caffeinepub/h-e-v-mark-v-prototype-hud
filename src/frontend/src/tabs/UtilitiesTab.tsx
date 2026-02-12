import { useSuitStore } from '../state/suitState';
import { useActor } from '../hooks/useActor';
import { Switch } from '@/components/ui/switch';
import { AmbiencePlayer } from '../components/audio/AmbiencePlayer';
import { uiSfx } from '../audio/uiSfx';
import { hevVoice } from '../audio/hevVoice';

export function UtilitiesTab() {
  const { modules, toggleModule } = useSuitStore();
  const { actor } = useActor();

  const handleToggle = async (moduleName: keyof typeof modules, label: string) => {
    if (!actor) return;
    
    try {
      const wasEnabled = modules[moduleName];
      toggleModule(moduleName);
      uiSfx.toggle();
      if (wasEnabled) {
        hevVoice.moduleDisabled(label);
      } else {
        hevVoice.moduleEnabled(label);
      }
    } catch (error) {
      console.error('Failed to toggle module:', error);
    }
  };

  const modulesList: Array<{ key: keyof typeof modules; label: string; desc: string }> = [
    { key: 'helmet', label: 'HELMET SEAL', desc: 'Environmental protection and HUD integration' },
    { key: 'respirator', label: 'RESPIRATOR', desc: 'Air filtration and toxin removal' },
    { key: 'longJump', label: 'LONG JUMP MODULE', desc: 'Enhanced mobility and jump distance' },
    { key: 'flashlight', label: 'FLASHLIGHT', desc: 'Illumination system for low-light environments' },
    { key: 'advancedMedical', label: 'ADVANCED MEDICAL', desc: 'Automated trauma response and morphine administration' },
    { key: 'radiationShield', label: 'RADIATION SHIELD', desc: 'Active radiation protection system' },
    { key: 'defibrillator', label: 'DEFIBRILLATOR', desc: 'Emergency cardiac response system' },
    { key: 'shieldBoost', label: 'SHIELD BOOST', desc: 'Temporary armor enhancement' },
    { key: 'hazardSystem', label: 'HAZARD DETECTION', desc: 'Environmental threat monitoring' },
    { key: 'moduleSync', label: 'MODULE SYNC', desc: 'Cross-system integration and optimization' },
  ];

  return (
    <div className="tab-content">
      <div className="utilities-grid">
        <div className="tactical-panel">
          <div className="hud-panel-title">SUIT MODULES</div>
          <div className="hud-panel-content">
            {modulesList.map(({ key, label, desc }) => (
              <div key={key} className="module-row">
                <div className="module-info">
                  <div className="module-label">{label}</div>
                  <div className="module-desc">{desc}</div>
                </div>
                <Switch
                  checked={modules[key]}
                  onCheckedChange={() => handleToggle(key, label)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="tactical-panel">
          <div className="hud-panel-title">AMBIENCE PLAYER</div>
          <div className="hud-panel-content">
            <AmbiencePlayer />
          </div>
        </div>
      </div>
    </div>
  );
}
