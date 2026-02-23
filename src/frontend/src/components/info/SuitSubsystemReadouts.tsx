import { useState } from 'react';
import { useInfoSettingsStore } from '../../state/infoSettingsStore';
import { useLogStore } from '../../state/systemLog';
import { HudSwitch } from '../common/HudSwitch';
import { ConfirmActionModal } from './ConfirmActionModal';
import { uiSfx } from '../../audio/uiSfx';
import { hevVoice } from '../../audio/hevVoice';

export function SuitSubsystemReadouts() {
  const {
    radioLink,
    hudOnline,
    displayMode,
    setRadioLink,
    setHudOnline,
    setDisplayMode,
  } = useInfoSettingsStore();
  const { addEntry } = useLogStore();
  const [showHudConfirm, setShowHudConfirm] = useState(false);
  const [showRadioConfirm, setShowRadioConfirm] = useState(false);

  const handleRadioToggle = () => {
    if (radioLink) {
      setShowRadioConfirm(true);
    } else {
      setRadioLink(true);
      addEntry('system', 'RADIO LINK: ONLINE');
      uiSfx.toggle();
      hevVoice.radioLinkToggled(true);
    }
  };

  const confirmRadioDisable = () => {
    setRadioLink(false);
    addEntry('system', 'RADIO LINK: OFFLINE');
    setShowRadioConfirm(false);
    uiSfx.confirmAccept();
    hevVoice.radioLinkToggled(false);
  };

  const handleHudToggle = () => {
    if (hudOnline) {
      setShowHudConfirm(true);
    } else {
      setHudOnline(true);
      addEntry('system', 'HUD DISPLAY: ONLINE');
      uiSfx.toggle();
      hevVoice.hudToggled(true);
    }
  };

  const confirmHudDisable = () => {
    setHudOnline(false);
    addEntry('system', 'HUD DISPLAY: OFFLINE');
    setShowHudConfirm(false);
    uiSfx.confirmAccept();
    hevVoice.hudToggled(false);
  };

  const handleDisplayModeToggle = () => {
    const modes: Array<'STANDARD' | 'MINIMAL' | 'TACTICAL'> = ['STANDARD', 'MINIMAL', 'TACTICAL'];
    const currentIndex = modes.indexOf(displayMode as 'STANDARD' | 'MINIMAL' | 'TACTICAL');
    const nextIndex = (currentIndex + 1) % modes.length;
    const nextMode = modes[nextIndex];
    
    setDisplayMode(nextMode);
    addEntry('system', `DISPLAY MODE: ${nextMode}`);
    uiSfx.toggle();
    hevVoice.displayModeChanged(nextMode);
  };

  return (
    <div className="hud-panel hover-lift">
      <div className="hud-panel-title">SUIT SUBSYSTEMS</div>
      <div className="hud-panel-content">
        {/* Life Support */}
        <div className="subsystem-row">
          <div className="subsystem-info">
            <div className="subsystem-label">LIFE SUPPORT</div>
            <div className="subsystem-status status-nominal">OPERATIONAL</div>
          </div>
          <div className="subsystem-value">100%</div>
        </div>

        {/* Environmental Protection */}
        <div className="subsystem-row">
          <div className="subsystem-info">
            <div className="subsystem-label">ENVIRONMENTAL PROTECTION</div>
            <div className="subsystem-status status-nominal">ENGAGED</div>
          </div>
          <div className="subsystem-value">100%</div>
        </div>

        {/* Power Management */}
        <div className="subsystem-row">
          <div className="subsystem-info">
            <div className="subsystem-label">POWER MANAGEMENT</div>
            <div className="subsystem-status status-nominal">OPTIMAL</div>
          </div>
          <div className="subsystem-value">100%</div>
        </div>

        {/* Communications/AI */}
        <div className="subsystem-row interactive-subsystem" onClick={handleRadioToggle}>
          <div className="subsystem-info">
            <div className="subsystem-label">COMMUNICATIONS/AI</div>
            <div className={`subsystem-status ${radioLink ? 'status-nominal' : 'status-warning'}`}>
              {radioLink ? 'ONLINE' : 'OFFLINE'}
            </div>
          </div>
          <HudSwitch checked={radioLink} onCheckedChange={handleRadioToggle} />
        </div>

        {/* Augmented Reality Display */}
        <div className="subsystem-row interactive-subsystem" onClick={handleHudToggle}>
          <div className="subsystem-info">
            <div className="subsystem-label">AUGMENTED REALITY DISPLAY</div>
            <div className={`subsystem-status ${hudOnline ? 'status-nominal' : 'status-warning'}`}>
              {hudOnline ? 'ONLINE' : 'OFFLINE'}
            </div>
          </div>
          <HudSwitch checked={hudOnline} onCheckedChange={handleHudToggle} />
        </div>

        {/* Display Mode */}
        <div className="subsystem-row interactive-subsystem" onClick={handleDisplayModeToggle}>
          <div className="subsystem-info">
            <div className="subsystem-label">DISPLAY MODE</div>
            <div className="subsystem-status status-nominal">{displayMode}</div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDisplayModeToggle();
            }}
            className="subsystem-toggle-button"
          >
            CYCLE
          </button>
        </div>
      </div>

      {/* Confirmation Modals */}
      <ConfirmActionModal
        open={showRadioConfirm}
        onOpenChange={setShowRadioConfirm}
        onConfirm={confirmRadioDisable}
        title="DISABLE RADIO LINK"
        description="Disabling radio communications will prevent all external communication. Are you sure?"
      />

      <ConfirmActionModal
        open={showHudConfirm}
        onOpenChange={setShowHudConfirm}
        onConfirm={confirmHudDisable}
        title="DISABLE HUD DISPLAY"
        description="Disabling the HUD will block all visual information. You can re-enable it in the INFO tab. Continue?"
      />
    </div>
  );
}
