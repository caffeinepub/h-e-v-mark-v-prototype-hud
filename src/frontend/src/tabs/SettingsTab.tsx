import { useInfoSettingsStore } from '../state/infoSettingsState';
import { useSuitStore } from '../state/suitState';
import { useWeaponSystemsStore } from '../state/weaponSystemsState';
import { useHazardsStore } from '../state/hazardsState';
import { useLogStore } from '../state/systemLog';
import { HudSwitch } from '../components/common/HudSwitch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { hevVoice } from '../audio/hevVoice';
import { uiSfx } from '../audio/uiSfx';

export function SettingsTab() {
  const {
    voiceEnabled,
    displayMode,
    radioLinkActive,
    hudActive,
    hudColorScheme,
    uiScale,
    tacticalModeEnabled,
    setVoiceEnabled,
    setDisplayMode,
    setRadioLinkActive,
    setHudActive,
    setHudColorScheme,
    setUiScale,
    setTacticalModeEnabled,
    reset: resetSettings,
  } = useInfoSettingsStore();

  const { reset: resetSuit } = useSuitStore();
  const { reset: resetWeapons } = useWeaponSystemsStore();
  const { reset: resetHazards } = useHazardsStore();
  const { clear: clearLog } = useLogStore();

  const handleVoiceToggle = (enabled: boolean) => {
    setVoiceEnabled(enabled);
    uiSfx.settingsChange();
    if (enabled) {
      hevVoice.voiceSystemEnabled();
    }
  };

  const handleDisplayModeChange = (mode: 'TACTICAL' | 'STANDARD' | 'MINIMAL') => {
    setDisplayMode(mode);
    uiSfx.settingsChange();
    hevVoice.displayModeChanged(mode);
  };

  const handleRadioToggle = (active: boolean) => {
    setRadioLinkActive(active);
    uiSfx.settingsChange();
    hevVoice.radioLinkToggled(active);
  };

  const handleHudToggle = (active: boolean) => {
    setHudActive(active);
    uiSfx.settingsChange();
    hevVoice.hudToggled(active);
  };

  const handleColorSchemeChange = (scheme: string) => {
    setHudColorScheme(scheme as 'AMBER' | 'BLUE' | 'GREEN' | 'PINK');
    uiSfx.settingsChange();
  };

  const handleUiScaleChange = (value: number[]) => {
    setUiScale(value[0]);
    uiSfx.settingsChange();
  };

  const handleTacticalModeToggle = (enabled: boolean) => {
    setTacticalModeEnabled(enabled);
    uiSfx.settingsChange();
  };

  const handleSystemRestart = () => {
    resetSettings();
    resetSuit();
    resetWeapons();
    resetHazards();
    clearLog();
    uiSfx.confirmAccept();
    // Play a generic voice confirmation since systemRestarted doesn't exist
    hevVoice.voiceSystemEnabled();
  };

  return (
    <div className="tab-content-compact">
      <div className="settings-grid-compact">
        {/* Display & UI */}
        <div className="hud-panel-compact">
          <div className="hud-panel-title-compact">DISPLAY & UI</div>
          <div className="hud-panel-content-compact">
            <div className="settings-section-compact">
              <div className="setting-row-compact">
                <div className="setting-info-compact">
                  <Label htmlFor="hud-active" className="setting-label-compact">HUD STATUS</Label>
                  <span className="setting-description-compact">Toggle heads-up display</span>
                </div>
                <HudSwitch
                  id="hud-active"
                  checked={hudActive}
                  onCheckedChange={handleHudToggle}
                />
              </div>

              <Separator className="my-2" />

              <div className="setting-row-compact">
                <div className="setting-info-compact">
                  <Label htmlFor="display-mode" className="setting-label-compact">DISPLAY MODE</Label>
                  <span className="setting-description-compact">Current: {displayMode}</span>
                </div>
                <Select value={displayMode} onValueChange={handleDisplayModeChange}>
                  <SelectTrigger id="display-mode" className="setting-select-compact">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MINIMAL">MINIMAL</SelectItem>
                    <SelectItem value="STANDARD">STANDARD</SelectItem>
                    <SelectItem value="TACTICAL">TACTICAL</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator className="my-2" />

              <div className="setting-row-compact">
                <div className="setting-info-compact">
                  <Label htmlFor="color-scheme" className="setting-label-compact">COLOR SCHEME</Label>
                  <span className="setting-description-compact">Current: {hudColorScheme}</span>
                </div>
                <Select value={hudColorScheme} onValueChange={handleColorSchemeChange}>
                  <SelectTrigger id="color-scheme" className="setting-select-compact">
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

              <Separator className="my-2" />

              <div className="setting-row-compact">
                <div className="setting-info-compact">
                  <Label htmlFor="ui-scale" className="setting-label-compact">UI SCALE</Label>
                  <span className="setting-description-compact">{(uiScale * 100).toFixed(0)}%</span>
                </div>
                <Slider
                  id="ui-scale"
                  min={0.7}
                  max={1.3}
                  step={0.1}
                  value={[uiScale]}
                  onValueChange={handleUiScaleChange}
                  className="setting-slider-compact"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Audio & Voice */}
        <div className="hud-panel-compact">
          <div className="hud-panel-title-compact">AUDIO & VOICE</div>
          <div className="hud-panel-content-compact">
            <div className="settings-section-compact">
              <div className="setting-row-compact">
                <div className="setting-info-compact">
                  <Label htmlFor="voice-enabled" className="setting-label-compact">VOICE SYSTEM</Label>
                  <span className="setting-description-compact">H.E.V voice announcements</span>
                </div>
                <HudSwitch
                  id="voice-enabled"
                  checked={voiceEnabled}
                  onCheckedChange={handleVoiceToggle}
                />
              </div>

              <Separator className="my-2" />

              <div className="setting-row-compact">
                <div className="setting-info-compact">
                  <Label htmlFor="radio-link" className="setting-label-compact">RADIO LINK</Label>
                  <span className="setting-description-compact">Communication system</span>
                </div>
                <HudSwitch
                  id="radio-link"
                  checked={radioLinkActive}
                  onCheckedChange={handleRadioToggle}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tactical Systems */}
        <div className="hud-panel-compact">
          <div className="hud-panel-title-compact">TACTICAL SYSTEMS</div>
          <div className="hud-panel-content-compact">
            <div className="settings-section-compact">
              <div className="setting-row-compact">
                <div className="setting-info-compact">
                  <Label htmlFor="tactical-mode" className="setting-label-compact">TACTICAL MODE</Label>
                  <span className="setting-description-compact">Enable tactical overlay</span>
                </div>
                <HudSwitch
                  id="tactical-mode"
                  checked={tacticalModeEnabled}
                  onCheckedChange={handleTacticalModeToggle}
                />
              </div>
            </div>
          </div>
        </div>

        {/* System Actions */}
        <div className="hud-panel-compact">
          <div className="hud-panel-title-compact">SYSTEM ACTIONS</div>
          <div className="hud-panel-content-compact">
            <div className="settings-section-compact">
              <Button
                variant="destructive"
                onClick={handleSystemRestart}
                className="system-action-btn-compact"
              >
                SYSTEM RESTART
              </Button>
              <p className="system-action-description-compact">
                Reset all settings and clear system log
              </p>
            </div>
          </div>
        </div>

        {/* System Information */}
        <div className="hud-panel-compact">
          <div className="hud-panel-title-compact">SYSTEM INFORMATION</div>
          <div className="hud-panel-content-compact">
            <div className="system-info-compact">
              <div className="system-info-row-compact">
                <span className="system-info-label-compact">VERSION:</span>
                <span className="system-info-value-compact">H.E.V MK-V 2.1.0</span>
              </div>
              <div className="system-info-row-compact">
                <span className="system-info-label-compact">BUILD:</span>
                <span className="system-info-value-compact">2026.02.12</span>
              </div>
              <div className="system-info-row-compact">
                <span className="system-info-label-compact">STATUS:</span>
                <span className="system-info-value-compact">OPERATIONAL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
