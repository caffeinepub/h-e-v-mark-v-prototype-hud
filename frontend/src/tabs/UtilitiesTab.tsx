import React from 'react';
import { useSuitStore } from '../state/suitState';
import { useInfoSettingsStore } from '../state/infoSettingsStore';
import { FlashlightPowerModule } from '../components/utilities/FlashlightPowerModule';
import { AmbiencePlayer } from '../components/audio/AmbiencePlayer';
import { RadioControlPanel } from '../components/audio/RadioControlPanel';
import { GravityGunControl } from '../components/utilities/GravityGunControl';
import { HudPanel } from '../components/hud/Panels';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useLogStore } from '../state/systemLog';
import { uiSfx } from '../audio/uiSfx';
import { hevVoice } from '../audio/hevVoice';

type ModuleKey = 'helmet' | 'respirator' | 'longJump' | 'flashlight' | 'advancedMedical' | 'radiationShield' | 'defibrillator' | 'shieldBoost' | 'hazardSystem' | 'moduleSync';

const MODULE_LABELS: Record<ModuleKey, string> = {
  helmet: 'HELMET',
  respirator: 'RESPIRATOR',
  longJump: 'LONG JUMP MODULE',
  flashlight: 'FLASHLIGHT',
  advancedMedical: 'ADVANCED MEDICAL',
  radiationShield: 'RADIATION SHIELD',
  defibrillator: 'DEFIBRILLATOR',
  shieldBoost: 'SHIELD BOOST',
  hazardSystem: 'HAZARD SYSTEM',
  moduleSync: 'MODULE SYNC',
};

export function UtilitiesTab() {
  const { modules, toggleModule } = useSuitStore();
  const { systemStyle, useHl1Weapons } = useInfoSettingsStore();
  const { addEntry } = useLogStore();
  const prefersReduced = useReducedMotion();

  const handleToggle = (key: ModuleKey) => {
    const newState = !modules[key];
    toggleModule(key);
    addEntry('module', `${MODULE_LABELS[key]} ${newState ? 'activated' : 'deactivated'}`);
    uiSfx.toggle();
    hevVoice.moduleEnabled(key);
  };

  const moduleKeys = Object.keys(MODULE_LABELS) as ModuleKey[];

  return (
    <div className="p-2 space-y-2 animate-fade-in-up">
      {/* Equipment toggles */}
      <HudPanel title="EQUIPMENT MODULES">
        <div className="grid grid-cols-2 gap-2">
          {moduleKeys.map(key => {
            const isOn = modules[key] ?? false;
            return (
              <button
                key={key}
                onClick={() => handleToggle(key)}
                style={{
                  background: isOn ? 'var(--faction-muted)' : 'oklch(4% 0 0)',
                  border: `1px solid ${isOn ? 'var(--faction-primary)' : 'var(--faction-border)'}`,
                  color: isOn ? 'var(--faction-accent)' : 'var(--faction-dim)',
                  cursor: 'pointer',
                  fontFamily: 'Share Tech Mono, monospace',
                  fontSize: '0.6rem',
                  letterSpacing: '0.08em',
                  padding: '6px 8px',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: isOn ? '0 0 6px var(--faction-glow)' : 'none',
                  textShadow: isOn ? '0 0 4px var(--faction-glow)' : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <span style={{ fontSize: '0.5rem' }}>{isOn ? '●' : '○'}</span>
                {MODULE_LABELS[key]}
              </button>
            );
          })}
        </div>
      </HudPanel>

      {/* Flashlight power */}
      <FlashlightPowerModule />

      {/* Gravity gun (HL2 mode) */}
      {systemStyle === 'hev' && !useHl1Weapons && (
        <GravityGunControl />
      )}

      {/* Ambience player */}
      <AmbiencePlayer />

      {/* Radio control */}
      <RadioControlPanel />
    </div>
  );
}
