import { HudPanel } from '../components/hud/Panels';
import { RadarPanel } from '../components/tactical/RadarPanel';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Target, Radio, Shield, Zap, Users, AlertTriangle } from 'lucide-react';

export function TacticalTab() {
  return (
    <div className="tab-content tactical-tab">
      <div className="tactical-tab-grid-expanded">
        {/* Tactical Radar */}
        <HudPanel title="TACTICAL RADAR" className="tactical-panel">
          <RadarPanel />
        </HudPanel>
        
        {/* Tactical Readouts */}
        <HudPanel title="TACTICAL READOUTS" className="tactical-panel">
          <div className="tactical-readouts-container">
            <div className="tactical-readout-item">
              <span className="tactical-readout-label">HEART RATE:</span>
              <span className="tactical-readout-value pulse-animation">72 BPM</span>
            </div>
            <div className="tactical-readout-item">
              <span className="tactical-readout-label">THREAT LEVEL:</span>
              <span className="tactical-readout-value">MINIMAL</span>
            </div>
            <div className="tactical-readout-item">
              <span className="tactical-readout-label">COMBAT STATUS:</span>
              <span className="tactical-readout-value">STANDBY</span>
            </div>
            <div className="tactical-readout-item">
              <span className="tactical-readout-label">ENGAGEMENT:</span>
              <span className="tactical-readout-value">MANUAL</span>
            </div>
            <div className="tactical-readout-item">
              <span className="tactical-readout-label">SCAN MODE:</span>
              <span className="tactical-readout-value">ACTIVE</span>
            </div>
            <div className="tactical-readout-item">
              <span className="tactical-readout-label">TARGETING:</span>
              <span className="tactical-readout-value">OFFLINE</span>
            </div>
          </div>
        </HudPanel>

        {/* Contact List */}
        <HudPanel title="CONTACT LIST" className="tactical-panel">
          <div className="tactical-contacts-container">
            <div className="tactical-contact-item">
              <div className="tactical-contact-icon friendly">
                <Users className="w-4 h-4" />
              </div>
              <div className="tactical-contact-info">
                <div className="tactical-contact-name">FRIENDLY-01</div>
                <div className="tactical-contact-meta">
                  <Badge variant="outline" className="tactical-badge">ALLY</Badge>
                  <span className="tactical-contact-distance">45m NE</span>
                </div>
              </div>
            </div>
            <div className="tactical-contact-item">
              <div className="tactical-contact-icon friendly">
                <Users className="w-4 h-4" />
              </div>
              <div className="tactical-contact-info">
                <div className="tactical-contact-name">FRIENDLY-02</div>
                <div className="tactical-contact-meta">
                  <Badge variant="outline" className="tactical-badge">ALLY</Badge>
                  <span className="tactical-contact-distance">62m SW</span>
                </div>
              </div>
            </div>
            <div className="tactical-contact-item">
              <div className="tactical-contact-icon unknown">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="tactical-contact-info">
                <div className="tactical-contact-name">UNKNOWN-01</div>
                <div className="tactical-contact-meta">
                  <Badge variant="secondary" className="tactical-badge">UNKNOWN</Badge>
                  <span className="tactical-contact-distance">120m N</span>
                </div>
              </div>
            </div>
            <Separator className="my-2" />
            <div className="tactical-contact-summary">
              <span className="tactical-summary-label">TOTAL CONTACTS:</span>
              <span className="tactical-summary-value">3</span>
            </div>
          </div>
        </HudPanel>

        {/* Threat Assessment */}
        <HudPanel title="THREAT ASSESSMENT" className="tactical-panel">
          <div className="tactical-threat-container">
            <div className="tactical-threat-row">
              <span className="tactical-threat-label">HOSTILES DETECTED:</span>
              <span className="tactical-threat-value nominal">0</span>
            </div>
            <div className="tactical-threat-row">
              <span className="tactical-threat-label">THREAT PROXIMITY:</span>
              <span className="tactical-threat-value nominal">CLEAR</span>
            </div>
            <div className="tactical-threat-row">
              <span className="tactical-threat-label">ENGAGEMENT RANGE:</span>
              <span className="tactical-threat-value">N/A</span>
            </div>
            <Separator className="my-2" />
            <div className="tactical-threat-row">
              <span className="tactical-threat-label">ALERT STATUS:</span>
              <Badge variant="outline" className="tactical-status-badge nominal">NOMINAL</Badge>
            </div>
          </div>
        </HudPanel>

        {/* Engagement Controls */}
        <HudPanel title="ENGAGEMENT CONTROLS" className="tactical-panel">
          <div className="tactical-controls-container">
            <div className="tactical-control-row">
              <div className="tactical-control-info">
                <Label htmlFor="autoTarget" className="tactical-control-label">
                  <Target className="w-4 h-4 inline mr-2" />
                  AUTO TARGETING
                </Label>
                <p className="tactical-control-desc">Automatic target acquisition</p>
              </div>
              <Switch id="autoTarget" />
            </div>
            <Separator className="my-2" />
            <div className="tactical-control-row">
              <div className="tactical-control-info">
                <Label htmlFor="iff" className="tactical-control-label">
                  <Radio className="w-4 h-4 inline mr-2" />
                  IFF TRANSPONDER
                </Label>
                <p className="tactical-control-desc">Identify friend or foe</p>
              </div>
              <Switch id="iff" defaultChecked />
            </div>
            <Separator className="my-2" />
            <div className="tactical-control-row">
              <div className="tactical-control-info">
                <Label htmlFor="shield" className="tactical-control-label">
                  <Shield className="w-4 h-4 inline mr-2" />
                  COMBAT SHIELD
                </Label>
                <p className="tactical-control-desc">Energy shield boost</p>
              </div>
              <Switch id="shield" />
            </div>
          </div>
        </HudPanel>

        {/* Mission Objectives */}
        <HudPanel title="MISSION OBJECTIVES" className="tactical-panel">
          <div className="tactical-objectives-container">
            <div className="tactical-objective-item">
              <div className="tactical-objective-status complete">✓</div>
              <div className="tactical-objective-text">Initialize H.E.V systems</div>
            </div>
            <div className="tactical-objective-item">
              <div className="tactical-objective-status complete">✓</div>
              <div className="tactical-objective-text">Establish radio link</div>
            </div>
            <div className="tactical-objective-item">
              <div className="tactical-objective-status active">●</div>
              <div className="tactical-objective-text">Patrol sector 7-G</div>
            </div>
            <div className="tactical-objective-item">
              <div className="tactical-objective-status pending">○</div>
              <div className="tactical-objective-text">Report to command</div>
            </div>
          </div>
        </HudPanel>

        {/* Communications Status */}
        <HudPanel title="COMMUNICATIONS" className="tactical-panel">
          <div className="tactical-comms-container">
            <div className="tactical-comms-row">
              <span className="tactical-comms-label">RADIO LINK:</span>
              <Badge variant="outline" className="tactical-status-badge active">ACTIVE</Badge>
            </div>
            <div className="tactical-comms-row">
              <span className="tactical-comms-label">ENCRYPTION:</span>
              <Badge variant="outline" className="tactical-status-badge active">ENABLED</Badge>
            </div>
            <div className="tactical-comms-row">
              <span className="tactical-comms-label">SIGNAL STRENGTH:</span>
              <span className="tactical-comms-value">95%</span>
            </div>
            <Separator className="my-2" />
            <div className="tactical-comms-row">
              <span className="tactical-comms-label">LAST TRANSMISSION:</span>
              <span className="tactical-comms-time">00:42 ago</span>
            </div>
          </div>
        </HudPanel>

        {/* System Diagnostics */}
        <HudPanel title="SYSTEM DIAGNOSTICS" className="tactical-panel">
          <div className="tactical-diagnostics-container">
            <div className="tactical-diagnostic-item">
              <Zap className="w-4 h-4 tactical-diagnostic-icon" />
              <div className="tactical-diagnostic-info">
                <div className="tactical-diagnostic-name">POWER SYSTEMS</div>
                <div className="tactical-diagnostic-status nominal">NOMINAL</div>
              </div>
            </div>
            <div className="tactical-diagnostic-item">
              <Target className="w-4 h-4 tactical-diagnostic-icon" />
              <div className="tactical-diagnostic-info">
                <div className="tactical-diagnostic-name">TARGETING ARRAY</div>
                <div className="tactical-diagnostic-status nominal">NOMINAL</div>
              </div>
            </div>
            <div className="tactical-diagnostic-item">
              <Shield className="w-4 h-4 tactical-diagnostic-icon" />
              <div className="tactical-diagnostic-info">
                <div className="tactical-diagnostic-name">DEFENSE GRID</div>
                <div className="tactical-diagnostic-status nominal">NOMINAL</div>
              </div>
            </div>
            <div className="tactical-diagnostic-item">
              <Radio className="w-4 h-4 tactical-diagnostic-icon" />
              <div className="tactical-diagnostic-info">
                <div className="tactical-diagnostic-name">COMMS ARRAY</div>
                <div className="tactical-diagnostic-status nominal">NOMINAL</div>
              </div>
            </div>
          </div>
        </HudPanel>

        {/* Quick Actions */}
        <HudPanel title="QUICK ACTIONS" className="tactical-panel">
          <div className="tactical-actions-container">
            <Button variant="outline" size="sm" className="tactical-action-button">
              <Target className="w-4 h-4 mr-2" />
              SCAN AREA
            </Button>
            <Button variant="outline" size="sm" className="tactical-action-button">
              <Radio className="w-4 h-4 mr-2" />
              HAIL CONTACTS
            </Button>
            <Button variant="outline" size="sm" className="tactical-action-button">
              <Shield className="w-4 h-4 mr-2" />
              ACTIVATE SHIELD
            </Button>
            <Button variant="destructive" size="sm" className="tactical-action-button">
              <AlertTriangle className="w-4 h-4 mr-2" />
              EMERGENCY BEACON
            </Button>
          </div>
        </HudPanel>
      </div>
    </div>
  );
}
