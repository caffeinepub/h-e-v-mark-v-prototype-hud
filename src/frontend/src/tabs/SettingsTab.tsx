import { useState } from 'react';
import { useInfoSettingsStore } from '../state/infoSettingsState';
import { useUIStore } from '../state/uiState';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { ConfirmActionModal } from '../components/info/ConfirmActionModal';
import { uiSfx } from '../audio/uiSfx';
import { hevVoice } from '../audio/hevVoice';
import { useLogStore } from '../state/systemLog';

export function SettingsTab() {
  const {
    voiceEnabled,
    displayMode,
    hudColorScheme,
    uiScale,
    tacticalModeEnabled,
    setVoiceEnabled,
    setDisplayMode,
    setHudColorScheme,
    setUiScale,
    setTacticalModeEnabled,
    reset: resetInfoSettings,
  } = useInfoSettingsStore();

  const { landscapeModeEnabled, toggleLandscapeMode, reset: resetUIState } = useUIStore();
  const { addEntry } = useLogStore();
  const [showRestartModal, setShowRestartModal] = useState(false);

  const handleVoiceToggle = (checked: boolean) => {
    setVoiceEnabled(checked);
    addEntry('system', `VOICE FEEDBACK: ${checked ? 'ENABLED' : 'DISABLED'}`);
    uiSfx.toggle();
    if (checked) {
      hevVoice.voiceSystemEnabled();
    }
  };

  const handleDisplayModeChange = (value: string) => {
    setDisplayMode(value as 'TACTICAL' | 'STANDARD' | 'MINIMAL');
    addEntry('system', `DISPLAY MODE: ${value}`);
    uiSfx.toggle();
    hevVoice.displayModeChanged(value as 'TACTICAL' | 'STANDARD' | 'MINIMAL');
  };

  const handleColorSchemeChange = (value: string) => {
    setHudColorScheme(value as 'AMBER' | 'BLUE' | 'GREEN' | 'PINK');
    uiSfx.toggle();
  };

  const handleUIScaleChange = (value: number[]) => {
    setUiScale(value[0]);
  };

  const handleLandscapeModeToggle = () => {
    toggleLandscapeMode();
    uiSfx.toggle();
  };

  const handleTacticalModeToggle = (checked: boolean) => {
    setTacticalModeEnabled(checked);
    addEntry('system', `TACTICAL MODE: ${checked ? 'ENABLED' : 'DISABLED'}`);
    uiSfx.toggle();
    if (checked) {
      hevVoice.moduleEnabled('TACTICAL MODE');
    } else {
      hevVoice.moduleDisabled('TACTICAL MODE');
    }
  };

  const handleSystemRestart = () => {
    setShowRestartModal(false);
    addEntry('system', 'SYSTEM RESTART INITIATED');
    uiSfx.buttonClick();
    
    setTimeout(() => {
      resetInfoSettings();
      resetUIState();
      addEntry('system', 'SYSTEM RESTART COMPLETE');
      hevVoice.moduleEnabled('SYSTEM');
    }, 1000);
  };

  return (
    <div className="tab-content">
      <div className="settings-sections">
        <div className="settings-section">
          <div className="settings-section-title">DISPLAY & UI</div>
          
          <div className="settings-row">
            <div className="settings-info">
              <div className="settings-label">DISPLAY MODE</div>
              <div className="settings-desc">Select HUD display configuration</div>
            </div>
            <Select value={displayMode} onValueChange={handleDisplayModeChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TACTICAL">TACTICAL</SelectItem>
                <SelectItem value="STANDARD">STANDARD</SelectItem>
                <SelectItem value="MINIMAL">MINIMAL</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="settings-row">
            <div className="settings-info">
              <div className="settings-label">HUD COLOR SCHEME</div>
              <div className="settings-desc">Customize HUD color palette</div>
            </div>
            <Select value={hudColorScheme} onValueChange={handleColorSchemeChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AMBER">AMBER</SelectItem>
                <SelectItem value="BLUE">BLUE</SelectItem>
                <SelectItem value="GREEN">GREEN</SelectItem>
                <SelectItem value="PINK">PINK</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="settings-row">
            <div className="settings-info">
              <div className="settings-label">UI SCALE: {uiScale.toFixed(2)}x</div>
              <div className="settings-desc">Adjust interface size</div>
            </div>
            <Slider
              value={[uiScale]}
              onValueChange={handleUIScaleChange}
              min={0.75}
              max={1.5}
              step={0.05}
              className="w-[180px]"
            />
          </div>

          <div className="settings-row">
            <div className="settings-info">
              <div className="settings-label">LANDSCAPE MODE</div>
              <div className="settings-desc">Force landscape layout on all devices</div>
            </div>
            <Switch checked={landscapeModeEnabled} onCheckedChange={handleLandscapeModeToggle} />
          </div>
        </div>

        <div className="settings-section">
          <div className="settings-section-title">AUDIO & VOICE</div>
          
          <div className="settings-row">
            <div className="settings-info">
              <div className="settings-label">VOICE FEEDBACK</div>
              <div className="settings-desc">Enable HEV voice announcements</div>
            </div>
            <Switch checked={voiceEnabled} onCheckedChange={handleVoiceToggle} />
          </div>
        </div>

        <div className="settings-section">
          <div className="settings-section-title">TACTICAL SYSTEMS</div>
          
          <div className="settings-row">
            <div className="settings-info">
              <div className="settings-label">TACTICAL MODE</div>
              <div className="settings-desc">Enable advanced tactical interface and TACTICAL tab</div>
            </div>
            <Switch checked={tacticalModeEnabled} onCheckedChange={handleTacticalModeToggle} />
          </div>
        </div>

        <div className="settings-section">
          <div className="settings-section-title">SYSTEM ACTIONS</div>
          
          <div className="settings-row">
            <div className="settings-info">
              <div className="settings-label">SYSTEM RESTART</div>
              <div className="settings-desc">Reset all settings to defaults</div>
            </div>
            <Button
              variant="destructive"
              onClick={() => setShowRestartModal(true)}
            >
              RESTART
            </Button>
          </div>
        </div>

        <div className="settings-section">
          <div className="settings-section-title">SYSTEM INFORMATION</div>
          
          <div className="tactical-panel">
            <div className="hud-panel-content">
              <div className="tactical-readouts-container">
                <div className="tactical-readout-item">
                  <span className="tactical-readout-label">FIRMWARE VERSION:</span>
                  <span className="tactical-readout-value">HEV-MK5-2026</span>
                </div>
                <div className="tactical-readout-item">
                  <span className="tactical-readout-label">BUILD DATE:</span>
                  <span className="tactical-readout-value">2026-02-12</span>
                </div>
                <div className="tactical-readout-item">
                  <span className="tactical-readout-label">SYSTEM STATUS:</span>
                  <span className="tactical-readout-value">OPERATIONAL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmActionModal
        open={showRestartModal}
        onOpenChange={setShowRestartModal}
        title="CONFIRM SYSTEM RESTART"
        description="This will reset all settings to their default values. All customizations will be lost. Are you sure you want to proceed?"
        onConfirm={handleSystemRestart}
      />
    </div>
  );
}
