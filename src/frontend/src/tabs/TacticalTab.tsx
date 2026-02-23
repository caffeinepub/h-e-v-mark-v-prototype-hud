import { useInfoSettingsStore } from '@/state/infoSettingsStore';
import { useMarkFeatures } from '@/hooks/useMarkFeatures';
import { RadarPanel } from '../components/tactical/RadarPanel';
import { ThreatAssessmentPanel } from '../components/tactical/ThreatAssessmentPanel';
import { QuickAccessControls } from '../components/tactical/QuickAccessControls';
import { MissionBriefingDisplay } from '../components/tactical/MissionBriefingDisplay';
import { Badge } from '@/components/ui/badge';
import { HudSwitch } from '@/components/common/HudSwitch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Radio, Target, Shield, Zap, Crosshair } from 'lucide-react';

export function TacticalTab() {
  const { systemStyle } = useInfoSettingsStore();
  const markFeatures = useMarkFeatures();

  const getRadarTitle = () => {
    switch (systemStyle) {
      case 'hecu':
        return 'COMBAT RADAR';
      case 'guard':
        return 'SECURITY SCANNER';
      default:
        return 'TACTICAL RADAR';
    }
  };

  const getContactsTitle = () => {
    switch (systemStyle) {
      case 'hecu':
        return 'HOSTILE CONTACTS';
      case 'guard':
        return 'SECURITY ALERTS';
      default:
        return 'DETECTED CONTACTS';
    }
  };

  // Mark I and II have no tactical tab
  if (!markFeatures.tabs.tactical) {
    return (
      <div className="tab-content-compact">
        <div className="hud-panel-compact">
          <div className="text-center py-8 opacity-70">
            <Crosshair className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <div className="font-semibold">TACTICAL SYSTEMS UNAVAILABLE</div>
            <div className="text-xs mt-2">This feature requires Mark III or higher</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tab-content-compact">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Radar Panel - Mark III+ */}
        {markFeatures.advanced.tacticalRadar && (
          <div className="hud-panel-compact">
            <div className="hud-panel-title-compact">{getRadarTitle()}</div>
            <div className="hud-panel-content-compact">
              <RadarPanel />
            </div>
          </div>
        )}

        {/* Threat Assessment - Mark III+ */}
        {markFeatures.advanced.threatAssessment && <ThreatAssessmentPanel />}

        {/* Quick Access Controls */}
        <QuickAccessControls />

        {/* Mission Briefing - Mark IV+ */}
        {markFeatures.advanced.missionBriefing && <MissionBriefingDisplay />}

        {/* Contacts List */}
        {markFeatures.advanced.tacticalRadar && (
          <div className="hud-panel-compact">
            <div className="hud-panel-title-compact">{getContactsTitle()}</div>
            <div className="hud-panel-content-compact space-y-2">
              <div className="contact-item flex justify-between items-center p-2 border border-border/30 rounded">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                  <span className="text-xs font-mono">HOSTILE-01</span>
                </div>
                <Badge variant="outline" className="text-xs status-critical">
                  45m
                </Badge>
              </div>
              <div className="contact-item flex justify-between items-center p-2 border border-border/30 rounded">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <span className="text-xs font-mono">UNKNOWN-02</span>
                </div>
                <Badge variant="outline" className="text-xs status-warning">
                  78m
                </Badge>
              </div>
              <div className="contact-item flex justify-between items-center p-2 border border-border/30 rounded">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-xs font-mono">FRIENDLY-01</span>
                </div>
                <Badge variant="outline" className="text-xs status-nominal">
                  120m
                </Badge>
              </div>
            </div>
          </div>
        )}

        {/* Engagement Controls */}
        <div className="hud-panel-compact">
          <div className="hud-panel-title-compact">ENGAGEMENT SYSTEMS</div>
          <div className="hud-panel-content-compact space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="autoTarget" className="text-xs flex items-center gap-1">
                <Target className="w-3 h-3" />
                Auto-Target
              </Label>
              <HudSwitch id="autoTarget" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="threatAlert" className="text-xs flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Threat Alerts
              </Label>
              <HudSwitch id="threatAlert" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="combatMode" className="text-xs flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Combat Mode
              </Label>
              <HudSwitch id="combatMode" />
            </div>
          </div>
        </div>

        {/* Communications */}
        <div className="hud-panel-compact md:col-span-2">
          <div className="hud-panel-title-compact flex items-center gap-2">
            <Radio className="w-4 h-4" />
            COMMUNICATIONS
          </div>
          <div className="hud-panel-content-compact">
            <div className="space-y-1 text-xs font-mono">
              <div className="comm-message p-2 border-l-2 border-primary/50 bg-primary/5">
                <span className="opacity-70">[12:34:56]</span> COMMAND: All units, maintain radio silence.
              </div>
              <div className="comm-message p-2 border-l-2 border-yellow-500/50 bg-yellow-500/5">
                <span className="opacity-70">[12:33:12]</span> ALERT: Hostile activity detected in Sector C.
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="hud-panel-compact md:col-span-2">
          <div className="hud-panel-title-compact">QUICK ACTIONS</div>
          <div className="hud-panel-content-compact">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <Button variant="outline" size="sm" className="text-xs">
                SCAN AREA
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                MARK TARGET
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                CALL BACKUP
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                EMERGENCY
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
