import { useState } from 'react';
import { useSuitStore } from '../../state/suitState';
import { useHazardsStore } from '../../state/hazardsState';
import { useInfoSettingsStore } from '../../state/infoSettingsState';
import { useLogStore } from '../../state/systemLog';
import { ConfirmActionModal } from './ConfirmActionModal';
import { uiSfx } from '../../audio/uiSfx';
import { hevVoice } from '../../audio/hevVoice';
import { cn } from '@/lib/utils';

export function SuitSubsystemReadouts() {
  const { stats, modules } = useSuitStore();
  const { levels } = useHazardsStore();
  const { 
    voiceEnabled, 
    displayMode, 
    radioLinkActive, 
    hudActive,
    setVoiceEnabled,
    setDisplayMode,
    setRadioLinkActive,
    setHudActive,
  } = useInfoSettingsStore();
  const { addEntry } = useLogStore();

  const [confirmModal, setConfirmModal] = useState<{
    open: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
  }>({
    open: false,
    title: '',
    description: '',
    onConfirm: () => {},
  });

  const activeModules = Object.entries(modules)
    .filter(([_, active]) => active)
    .map(([name]) => name);

  const handleCriticalToggle = (
    title: string,
    description: string,
    action: () => void
  ) => {
    setConfirmModal({
      open: true,
      title,
      description,
      onConfirm: action,
    });
  };

  const toggleVoice = () => {
    const newState = !voiceEnabled;
    setVoiceEnabled(newState);
    addEntry('system', `AI ASSISTANT / VOICE FEEDBACK: ${newState ? 'ENABLED' : 'DISABLED'}`);
    uiSfx.toggle();
    if (newState) {
      hevVoice.voiceSystemEnabled();
    }
  };

  const toggleRadioLink = () => {
    const newState = !radioLinkActive;
    setRadioLinkActive(newState);
    addEntry('system', `RADIO LINK: ${newState ? 'ACTIVE' : 'OFFLINE'}`);
    uiSfx.toggle();
    hevVoice.radioLinkToggled(newState);
  };

  const toggleHud = () => {
    const newState = !hudActive;
    setHudActive(newState);
    addEntry('system', `HUD STATUS: ${newState ? 'ACTIVE' : 'OFFLINE'}`);
    uiSfx.toggle();
    hevVoice.hudToggled(newState);
  };

  const cycleDisplayMode = () => {
    const modes: Array<'TACTICAL' | 'STANDARD' | 'MINIMAL'> = ['TACTICAL', 'STANDARD', 'MINIMAL'];
    const currentIndex = modes.indexOf(displayMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setDisplayMode(nextMode);
    addEntry('system', `DISPLAY MODE: ${nextMode}`);
    uiSfx.toggle();
    hevVoice.displayModeChanged(nextMode);
  };

  return (
    <div className="subsystem-readouts">
      <div className="tactical-panel">
        <div className="hud-panel-title">LIFE SUPPORT SYSTEMS</div>
        <div className="hud-panel-content">
          <div className="subsystem-grid">
            <div className="subsystem-item">
              <span className="subsystem-label">OXYGEN SUPPLY:</span>
              <span className="subsystem-value">NOMINAL</span>
            </div>
            <div className="subsystem-item">
              <span className="subsystem-label">CO2 SCRUBBER:</span>
              <span className="subsystem-value interactive" onClick={() => {
                addEntry('system', 'CO2 SCRUBBER: Status query');
                uiSfx.buttonClick();
              }}>
                ACTIVE
              </span>
            </div>
            <div className="subsystem-item">
              <span className="subsystem-label">TEMPERATURE REG:</span>
              <span className="subsystem-value">22°C</span>
            </div>
            <div className="subsystem-item">
              <span className="subsystem-label">PRESSURE:</span>
              <span className="subsystem-value">101.3 kPa</span>
            </div>
          </div>
        </div>
      </div>

      <div className="tactical-panel">
        <div className="hud-panel-title">ENVIRONMENTAL PROTECTION</div>
        <div className="hud-panel-content">
          <div className="subsystem-grid">
            <div className="subsystem-item">
              <span className="subsystem-label">RADIATION SHIELD:</span>
              <span className="subsystem-value interactive" onClick={() => {
                addEntry('system', `RADIATION SHIELD: ${modules.radiationShield ? 'ACTIVE' : 'STANDBY'}`);
                uiSfx.buttonClick();
              }}>
                {modules.radiationShield ? 'ACTIVE' : 'STANDBY'}
              </span>
            </div>
            <div className="subsystem-item">
              <span className="subsystem-label">BIO FILTER:</span>
              <span className="subsystem-value interactive" onClick={() => {
                addEntry('system', `BIO FILTER: ${modules.respirator ? 'ACTIVE' : 'STANDBY'}`);
                uiSfx.buttonClick();
              }}>
                {modules.respirator ? 'ACTIVE' : 'STANDBY'}
              </span>
            </div>
            <div className="subsystem-item">
              <span className="subsystem-label">THERMAL PROTECTION:</span>
              <span className="subsystem-value interactive" onClick={() => {
                addEntry('system', `THERMAL PROTECTION: ${levels.fire > 50 ? 'ENGAGED' : 'STANDBY'}`);
                uiSfx.buttonClick();
              }}>
                {levels.fire > 50 ? 'ENGAGED' : 'STANDBY'}
              </span>
            </div>
            <div className="subsystem-item">
              <span className="subsystem-label">HAZMAT SEAL:</span>
              <span className="subsystem-value interactive" onClick={() => {
                addEntry('system', `HAZMAT SEAL: ${modules.helmet ? 'SEALED' : 'OPEN'}`);
                uiSfx.buttonClick();
              }}>
                {modules.helmet ? 'SEALED' : 'OPEN'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="tactical-panel">
        <div className="hud-panel-title">POWER MANAGEMENT</div>
        <div className="hud-panel-content">
          <div className="subsystem-grid">
            <div className="subsystem-item">
              <span className="subsystem-label">MAIN BATTERY:</span>
              <span className="subsystem-value">{stats.armor}%</span>
            </div>
            <div className="subsystem-item">
              <span className="subsystem-label">AUX POWER:</span>
              <span className="subsystem-value">{stats.aux}%</span>
            </div>
            <div className="subsystem-item">
              <span className="subsystem-label">POWER OUTPUT:</span>
              <span className="subsystem-value">{activeModules.length * 15}W</span>
            </div>
            <div className="subsystem-item">
              <span className="subsystem-label">RECHARGE RATE:</span>
              <span className="subsystem-value">5%/min</span>
            </div>
          </div>
        </div>
      </div>

      <div className="tactical-panel">
        <div className="hud-panel-title">COMMUNICATIONS & AI</div>
        <div className="hud-panel-content">
          <div className="subsystem-grid">
            <div className="subsystem-item">
              <span className="subsystem-label">RADIO LINK:</span>
              <span 
                className={cn("subsystem-value interactive", radioLinkActive && "status-active")}
                onClick={() => handleCriticalToggle(
                  'CONFIRM ACTION: RADIO LINK',
                  'Toggle radio communications link. This will affect external communications. Are you sure?',
                  toggleRadioLink
                )}
              >
                {radioLinkActive ? 'ACTIVE' : 'OFFLINE'}
              </span>
            </div>
            <div className="subsystem-item">
              <span className="subsystem-label">AI ASSISTANT:</span>
              <span 
                className={cn("subsystem-value interactive", voiceEnabled && "status-active")}
                onClick={() => handleCriticalToggle(
                  'CONFIRM ACTION: AI ASSISTANT',
                  'Toggle AI assistant and voice feedback system. This will mute all HEV voice announcements. Are you sure?',
                  toggleVoice
                )}
              >
                {voiceEnabled ? 'ONLINE' : 'OFFLINE'}
              </span>
            </div>
            <div className="subsystem-item">
              <span className="subsystem-label">VOICE FEEDBACK:</span>
              <span 
                className={cn("subsystem-value interactive", voiceEnabled && "status-active")}
                onClick={() => handleCriticalToggle(
                  'CONFIRM ACTION: VOICE FEEDBACK',
                  'Toggle voice feedback system. This will mute all HEV voice announcements. Are you sure?',
                  toggleVoice
                )}
              >
                {voiceEnabled ? 'ENABLED' : 'DISABLED'}
              </span>
            </div>
            <div className="subsystem-item">
              <span className="subsystem-label">MODULE SYNC:</span>
              <span className="subsystem-value interactive" onClick={() => {
                addEntry('system', `MODULE SYNC: ${modules.moduleSync ? 'ACTIVE' : 'STANDBY'}`);
                uiSfx.buttonClick();
              }}>
                {modules.moduleSync ? 'ACTIVE' : 'STANDBY'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="tactical-panel">
        <div className="hud-panel-title">AUGMENTED REALITY DISPLAY</div>
        <div className="hud-panel-content">
          <div className="subsystem-grid">
            <div className="subsystem-item">
              <span className="subsystem-label">HUD STATUS:</span>
              <span 
                className={cn("subsystem-value interactive", hudActive && "status-active")}
                onClick={() => handleCriticalToggle(
                  'CONFIRM ACTION: HUD STATUS',
                  'Toggle heads-up display system. This may affect visibility of critical information. Are you sure?',
                  toggleHud
                )}
              >
                {hudActive ? 'ACTIVE' : 'OFFLINE'}
              </span>
            </div>
            <div className="subsystem-item">
              <span className="subsystem-label">DISPLAY MODE:</span>
              <span 
                className="subsystem-value interactive"
                onClick={cycleDisplayMode}
              >
                {displayMode}
              </span>
            </div>
            <div className="subsystem-item">
              <span className="subsystem-label">RESOLUTION:</span>
              <span className="subsystem-value">2048x1536</span>
            </div>
            <div className="subsystem-item">
              <span className="subsystem-label">REFRESH RATE:</span>
              <span className="subsystem-value">120Hz</span>
            </div>
          </div>
        </div>
      </div>

      <ConfirmActionModal
        open={confirmModal.open}
        onOpenChange={(open) => setConfirmModal({ ...confirmModal, open })}
        title={confirmModal.title}
        description={confirmModal.description}
        onConfirm={confirmModal.onConfirm}
      />
    </div>
  );
}
