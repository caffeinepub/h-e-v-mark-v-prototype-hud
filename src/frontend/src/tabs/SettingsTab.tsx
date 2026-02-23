import { useState } from 'react';
import { useInfoSettingsStore } from '@/state/infoSettingsStore';
import { useSuitStore } from '@/state/suitState';
import { useLogStore } from '@/state/systemLog';
import { HudSwitch } from '@/components/common/HudSwitch';
import { HevMarkSelector } from '@/components/settings/HevMarkSelector';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Settings, Volume2, User, Palette, Monitor, Keyboard, RotateCcw, Download, Heart } from 'lucide-react';
import { uiSfx } from '../audio/uiSfx';
import { hevVoice } from '../audio/hevVoice';

export function SettingsTab() {
  const {
    voiceEnabled,
    toggleVoice,
    hudOpacity,
    setHudOpacity,
    uiScale,
    setUiScale,
    displayMode,
    setDisplayMode,
    tacticalTabEnabled,
    toggleTacticalTab,
    emergencyMode,
    toggleEmergencyMode,
    systemStyle,
    setSystemStyle,
    operatorName,
    setOperatorName,
    detailedMode,
    toggleDetailedMode,
    resetSettings,
  } = useInfoSettingsStore();

  const { resetStats } = useSuitStore();
  const { clearLog } = useLogStore();
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  const handleVoiceToggle = () => {
    toggleVoice();
    uiSfx.toggle();
    if (!voiceEnabled) {
      hevVoice.voiceEnabled();
    }
  };

  const handleSystemReset = () => {
    resetSettings();
    resetStats();
    clearLog();
    uiSfx.confirm();
    hevVoice.systemRestart();
  };

  const handleInstallPWA = () => {
    setShowInstallPrompt(true);
  };

  const getFactionDescription = (faction: string) => {
    switch (faction) {
      case 'hev':
        return 'H.E.V. Mark V Suit - Standard Black Mesa research personnel configuration with full life support and hazard protection systems.';
      case 'hecu':
        return 'Hazardous Environment Combat Unit - Military configuration with tactical enhancements and combat-optimized systems.';
      case 'security':
      case 'guard':
        return 'Black Mesa Security - Security personnel configuration with facility monitoring and patrol systems.';
      case 'resistance':
        return 'Resistance Fighter - Improvised equipment configuration adapted for guerrilla warfare against the Combine.';
      default:
        return '';
    }
  };

  return (
    <div className="tab-content">
      <div className="hud-panel">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="w-5 h-5 text-primary" />
          <h2 className="hud-panel-title">SYSTEM SETTINGS</h2>
        </div>

        {/* PWA Installation */}
        <div className="settings-section">
          <h3 className="settings-section-title">INSTALLATION</h3>
          <div className="settings-row">
            <div className="settings-label">
              <Download className="w-4 h-4" />
              <div>
                <div className="font-semibold">Install as App</div>
                <div className="text-xs opacity-70">Install HUD as standalone application</div>
              </div>
            </div>
            <Button onClick={handleInstallPWA} variant="outline" size="sm">
              Install
            </Button>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Faction Selection */}
        <div className="settings-section">
          <h3 className="settings-section-title">SYSTEM STYLE (FACTION)</h3>
          <RadioGroup value={systemStyle} onValueChange={(value) => setSystemStyle(value as any)}>
            <div className="faction-cards-grid">
              <div className={`faction-card ${systemStyle === 'hev' ? 'faction-card-active' : ''}`}>
                <RadioGroupItem value="hev" id="faction-hev" className="faction-radio" />
                <Label htmlFor="faction-hev" className="faction-card-label">
                  <div className="faction-card-header">
                    <span className="faction-card-title">H.E.V. STANDARD</span>
                    <Badge variant="outline" className="faction-badge">CIVILIAN</Badge>
                  </div>
                  <p className="faction-card-description">{getFactionDescription('hev')}</p>
                  <div className="faction-card-specs">
                    <div className="text-xs opacity-80">
                      <strong>H.E.V. Mark V Specifications:</strong>
                      <ul className="list-disc list-inside mt-1 space-y-0.5">
                        <li>Power Output: 1.21 GW sustained</li>
                        <li>Life Support: 72 hours autonomous</li>
                        <li>Environmental Protection: Class IV</li>
                        <li>Hazard Resistance: Multi-spectrum</li>
                        <li>Neural Interface: Direct cortical link</li>
                      </ul>
                    </div>
                  </div>
                </Label>
              </div>

              <div className={`faction-card ${systemStyle === 'hecu' ? 'faction-card-active' : ''}`}>
                <RadioGroupItem value="hecu" id="faction-hecu" className="faction-radio" />
                <Label htmlFor="faction-hecu" className="faction-card-label">
                  <div className="faction-card-header">
                    <span className="faction-card-title">HECU MILITARY</span>
                    <Badge variant="outline" className="faction-badge">MILITARY</Badge>
                  </div>
                  <p className="faction-card-description">{getFactionDescription('hecu')}</p>
                  <div className="faction-card-specs">
                    <div className="text-xs opacity-80">
                      <strong>HECU Equipment:</strong>
                      <ul className="list-disc list-inside mt-1 space-y-0.5">
                        <li>Tactical Combat Armor Mk. III</li>
                        <li>Integrated Comm System</li>
                        <li>Squad Coordination Network</li>
                        <li>Combat Stim Injectors</li>
                        <li>Mission-Specific Loadouts</li>
                      </ul>
                    </div>
                  </div>
                </Label>
              </div>

              <div className={`faction-card ${systemStyle === 'security' ? 'faction-card-active' : ''}`}>
                <RadioGroupItem value="security" id="faction-security" className="faction-radio" />
                <Label htmlFor="faction-security" className="faction-card-label">
                  <div className="faction-card-header">
                    <span className="faction-card-title">BLACK MESA SECURITY</span>
                    <Badge variant="outline" className="faction-badge">SECURITY</Badge>
                  </div>
                  <p className="faction-card-description">{getFactionDescription('security')}</p>
                  <div className="faction-card-specs">
                    <div className="text-xs opacity-80">
                      <strong>Security Equipment:</strong>
                      <ul className="list-disc list-inside mt-1 space-y-0.5">
                        <li>Standard Security Vest</li>
                        <li>Facility Access System</li>
                        <li>Emergency Response Kit</li>
                        <li>Patrol Monitoring Network</li>
                        <li>Non-Lethal Options</li>
                      </ul>
                    </div>
                  </div>
                </Label>
              </div>

              <div className={`faction-card ${systemStyle === 'resistance' ? 'faction-card-active' : ''}`}>
                <RadioGroupItem value="resistance" id="faction-resistance" className="faction-radio" />
                <Label htmlFor="faction-resistance" className="faction-card-label">
                  <div className="faction-card-header">
                    <span className="faction-card-title">RESISTANCE</span>
                    <Badge variant="outline" className="faction-badge">REBEL</Badge>
                  </div>
                  <p className="faction-card-description">{getFactionDescription('resistance')}</p>
                  <div className="faction-card-specs">
                    <div className="text-xs opacity-80">
                      <strong>Resistance Gear:</strong>
                      <ul className="list-disc list-inside mt-1 space-y-0.5">
                        <li>Improvised Body Armor</li>
                        <li>Encrypted Communications</li>
                        <li>Scavenged Combine Tech</li>
                        <li>Guerrilla Tactics Support</li>
                        <li>Underground Network Access</li>
                      </ul>
                    </div>
                  </div>
                </Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        <Separator className="my-4" />

        {/* H.E.V. Mark Selector */}
        <div className="settings-section">
          <h3 className="settings-section-title">H.E.V. MARK SELECTION</h3>
          <HevMarkSelector />
        </div>

        <Separator className="my-4" />

        {/* Display Mode Toggles */}
        <div className="settings-section">
          <h3 className="settings-section-title">DISPLAY MODES</h3>
          
          <div className="settings-row">
            <div className="settings-label">
              <Monitor className="w-4 h-4" />
              <div>
                <div className="font-semibold">Detailed Mode</div>
                <div className="text-xs opacity-70">Show extended information and lore</div>
              </div>
            </div>
            <HudSwitch checked={detailedMode} onCheckedChange={toggleDetailedMode} />
          </div>

          <div className="settings-row">
            <div className="settings-label">
              <Monitor className="w-4 h-4" />
              <div>
                <div className="font-semibold">Tactical Tab</div>
                <div className="text-xs opacity-70">Enable tactical operations interface</div>
              </div>
            </div>
            <HudSwitch checked={tacticalTabEnabled} onCheckedChange={toggleTacticalTab} />
          </div>

          <div className="settings-row">
            <div className="settings-label">
              <Monitor className="w-4 h-4" />
              <div>
                <div className="font-semibold">Emergency Mode</div>
                <div className="text-xs opacity-70">Manual emergency mode toggle (auto-activates when health/armor critical)</div>
              </div>
            </div>
            <HudSwitch checked={emergencyMode} onCheckedChange={toggleEmergencyMode} />
          </div>

          <div className="settings-row">
            <div className="settings-label">
              <Monitor className="w-4 h-4" />
              <div>
                <div className="font-semibold">Minimal HUD Mode</div>
                <div className="text-xs opacity-70">Reduce HUD to essential vitals only (Hotkey: F2)</div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setDisplayMode('MINIMAL');
                uiSfx.toggle();
              }}
            >
              Activate
            </Button>
          </div>
        </div>

        <Separator className="my-4" />

        {/* HUD Customization */}
        <div className="settings-section">
          <h3 className="settings-section-title">HUD CUSTOMIZATION</h3>
          
          <div className="settings-slider-row">
            <div className="settings-label">
              <Palette className="w-4 h-4" />
              <div>
                <div className="font-semibold">HUD Opacity</div>
                <div className="text-xs opacity-70">{Math.round(hudOpacity * 100)}%</div>
              </div>
            </div>
            <Slider
              value={[hudOpacity * 100]}
              onValueChange={(value) => setHudOpacity(value[0] / 100)}
              min={40}
              max={100}
              step={5}
              className="settings-slider"
            />
          </div>

          <div className="settings-slider-row">
            <div className="settings-label">
              <Monitor className="w-4 h-4" />
              <div>
                <div className="font-semibold">UI Scale</div>
                <div className="text-xs opacity-70">{Math.round(uiScale * 100)}%</div>
              </div>
            </div>
            <Slider
              value={[uiScale * 100]}
              onValueChange={(value) => setUiScale(value[0] / 100)}
              min={80}
              max={120}
              step={5}
              className="settings-slider"
            />
          </div>
        </div>

        <Separator className="my-4" />

        {/* Operator Profile */}
        <div className="settings-section">
          <h3 className="settings-section-title">OPERATOR PROFILE</h3>
          
          <div className="settings-row">
            <div className="settings-label">
              <User className="w-4 h-4" />
              <div>
                <div className="font-semibold">Operator Name</div>
                <div className="text-xs opacity-70">Customize operator identification</div>
              </div>
            </div>
            <Input
              value={operatorName}
              onChange={(e) => setOperatorName(e.target.value)}
              className="settings-input"
              placeholder="Enter name"
            />
          </div>
        </div>

        <Separator className="my-4" />

        {/* Audio Controls */}
        <div className="settings-section">
          <h3 className="settings-section-title">AUDIO CONTROLS</h3>
          
          <div className="settings-row">
            <div className="settings-label">
              <Volume2 className="w-4 h-4" />
              <div>
                <div className="font-semibold">Sound Effects</div>
                <div className="text-xs opacity-70">UI sounds and HEV voice announcements</div>
              </div>
            </div>
            <HudSwitch checked={voiceEnabled} onCheckedChange={handleVoiceToggle} />
          </div>
        </div>

        <Separator className="my-4" />

        {/* Keyboard Shortcuts */}
        <div className="settings-section">
          <h3 className="settings-section-title">KEYBOARD SHORTCUTS</h3>
          
          <Dialog open={showKeyboardShortcuts} onOpenChange={setShowKeyboardShortcuts}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                <Keyboard className="w-4 h-4 mr-2" />
                View Keyboard Shortcuts
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>KEYBOARD SHORTCUTS</DialogTitle>
                <DialogDescription>Quick access keys for HUD navigation and mode switching</DialogDescription>
              </DialogHeader>
              <div className="shortcuts-grid">
                <div className="shortcuts-section">
                  <h4 className="shortcuts-section-title">Display Modes</h4>
                  <div className="shortcuts-list">
                    <div className="shortcut-item">
                      <Badge variant="outline">F1</Badge>
                      <span>Standard Mode</span>
                    </div>
                    <div className="shortcut-item">
                      <Badge variant="outline">F2</Badge>
                      <span>Minimal Mode</span>
                    </div>
                    <div className="shortcut-item">
                      <Badge variant="outline">F3</Badge>
                      <span>Tactical Mode</span>
                    </div>
                    <div className="shortcut-item">
                      <Badge variant="outline">F4</Badge>
                      <span>Emergency Mode</span>
                    </div>
                  </div>
                </div>
                <div className="shortcuts-section">
                  <h4 className="shortcuts-section-title">Tab Navigation</h4>
                  <div className="shortcuts-list">
                    <div className="shortcut-item">
                      <Badge variant="outline">1</Badge>
                      <span>Basics</span>
                    </div>
                    <div className="shortcut-item">
                      <Badge variant="outline">2</Badge>
                      <span>Medical</span>
                    </div>
                    <div className="shortcut-item">
                      <Badge variant="outline">3</Badge>
                      <span>Info</span>
                    </div>
                    <div className="shortcut-item">
                      <Badge variant="outline">4</Badge>
                      <span>Utilities</span>
                    </div>
                    <div className="shortcut-item">
                      <Badge variant="outline">5</Badge>
                      <span>Weapons</span>
                    </div>
                    <div className="shortcut-item">
                      <Badge variant="outline">6</Badge>
                      <span>Hazards</span>
                    </div>
                    <div className="shortcut-item">
                      <Badge variant="outline">7</Badge>
                      <span>Tactical</span>
                    </div>
                    <div className="shortcut-item">
                      <Badge variant="outline">8</Badge>
                      <span>Vehicles</span>
                    </div>
                    <div className="shortcut-item">
                      <Badge variant="outline">9</Badge>
                      <span>Settings</span>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Separator className="my-4" />

        {/* System Reset */}
        <div className="settings-section">
          <h3 className="settings-section-title">SYSTEM RESET</h3>
          
          <Button variant="destructive" onClick={handleSystemReset} className="w-full">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset All Settings
          </Button>
        </div>

        {/* Footer Attribution */}
        <div className="mt-8 pt-4 border-t border-border text-center text-xs opacity-70">
          <div className="flex items-center justify-center gap-2">
            <span>© {new Date().getFullYear()} Built with</span>
            <Heart className="w-3 h-3 fill-current text-primary" />
            <span>using</span>
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.hostname : 'hev-hud'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
