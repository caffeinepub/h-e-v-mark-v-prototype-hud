import { HudPanel } from '../components/hud/Panels';
import { RadarPanel } from '../components/tactical/RadarPanel';
import { HudSwitch } from '../components/common/HudSwitch';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Target, Radio, Shield, Zap, Users, AlertTriangle } from 'lucide-react';

export function TacticalTab() {
  return (
    <div className="tab-content-compact tactical-tab-compact">
      <div className="tactical-tab-grid-compact">
        {/* Tactical Radar */}
        <HudPanel title="TACTICAL RADAR" className="hud-panel-compact">
          <RadarPanel />
        </HudPanel>
        
        {/* Tactical Readouts */}
        <HudPanel title="TACTICAL READOUTS" className="hud-panel-compact">
          <div className="tactical-readouts-container-compact">
            <div className="tactical-readout-item-compact">
              <span className="tactical-readout-label-compact">HEART RATE:</span>
              <span className="tactical-readout-value-compact pulse-animation">72 BPM</span>
            </div>
            <div className="tactical-readout-item-compact">
              <span className="tactical-readout-label-compact">THREAT LEVEL:</span>
              <span className="tactical-readout-value-compact">MINIMAL</span>
            </div>
            <div className="tactical-readout-item-compact">
              <span className="tactical-readout-label-compact">COMBAT STATUS:</span>
              <span className="tactical-readout-value-compact">STANDBY</span>
            </div>
            <div className="tactical-readout-item-compact">
              <span className="tactical-readout-label-compact">ENGAGEMENT:</span>
              <span className="tactical-readout-value-compact">MANUAL</span>
            </div>
            <div className="tactical-readout-item-compact">
              <span className="tactical-readout-label-compact">SCAN MODE:</span>
              <span className="tactical-readout-value-compact">ACTIVE</span>
            </div>
            <div className="tactical-readout-item-compact">
              <span className="tactical-readout-label-compact">TARGETING:</span>
              <span className="tactical-readout-value-compact">OFFLINE</span>
            </div>
          </div>
        </HudPanel>

        {/* Contact List */}
        <HudPanel title="CONTACT LIST" className="hud-panel-compact">
          <div className="tactical-contacts-container-compact">
            <div className="tactical-contact-item-compact">
              <div className="tactical-contact-icon-compact friendly">
                <Users className="w-4 h-4" />
              </div>
              <div className="tactical-contact-info-compact">
                <div className="tactical-contact-name-compact">FRIENDLY-01</div>
                <div className="tactical-contact-meta-compact">
                  <Badge variant="outline" className="tactical-badge-compact">ALLY</Badge>
                  <span className="tactical-contact-distance-compact">45m NE</span>
                </div>
              </div>
            </div>
            <div className="tactical-contact-item-compact">
              <div className="tactical-contact-icon-compact friendly">
                <Users className="w-4 h-4" />
              </div>
              <div className="tactical-contact-info-compact">
                <div className="tactical-contact-name-compact">FRIENDLY-02</div>
                <div className="tactical-contact-meta-compact">
                  <Badge variant="outline" className="tactical-badge-compact">ALLY</Badge>
                  <span className="tactical-contact-distance-compact">62m SW</span>
                </div>
              </div>
            </div>
            <div className="tactical-contact-item-compact">
              <div className="tactical-contact-icon-compact unknown">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="tactical-contact-info-compact">
                <div className="tactical-contact-name-compact">UNKNOWN-01</div>
                <div className="tactical-contact-meta-compact">
                  <Badge variant="secondary" className="tactical-badge-compact">UNKNOWN</Badge>
                  <span className="tactical-contact-distance-compact">120m N</span>
                </div>
              </div>
            </div>
            <Separator className="my-1" />
            <div className="tactical-contact-summary-compact">
              <span className="tactical-summary-label-compact">TOTAL CONTACTS:</span>
              <span className="tactical-summary-value-compact">3</span>
            </div>
          </div>
        </HudPanel>

        {/* Threat Assessment */}
        <HudPanel title="THREAT ASSESSMENT" className="hud-panel-compact">
          <div className="tactical-threat-container-compact">
            <div className="tactical-threat-row-compact">
              <span className="tactical-threat-label-compact">HOSTILES DETECTED:</span>
              <span className="tactical-threat-value-compact nominal">0</span>
            </div>
            <div className="tactical-threat-row-compact">
              <span className="tactical-threat-label-compact">THREAT PROXIMITY:</span>
              <span className="tactical-threat-value-compact nominal">CLEAR</span>
            </div>
            <div className="tactical-threat-row-compact">
              <span className="tactical-threat-label-compact">ENGAGEMENT RANGE:</span>
              <span className="tactical-threat-value-compact">N/A</span>
            </div>
            <Separator className="my-1" />
            <div className="tactical-threat-row-compact">
              <span className="tactical-threat-label-compact">ALERT STATUS:</span>
              <Badge variant="outline" className="tactical-status-badge-compact nominal">NOMINAL</Badge>
            </div>
          </div>
        </HudPanel>

        {/* Engagement Controls */}
        <HudPanel title="ENGAGEMENT CONTROLS" className="hud-panel-compact">
          <div className="tactical-controls-container-compact">
            <div className="tactical-control-row-compact">
              <div className="tactical-control-info-compact">
                <Label htmlFor="autoTarget" className="tactical-control-label-compact">
                  <Target className="w-4 h-4 inline mr-2" />
                  AUTO TARGETING
                </Label>
                <p className="tactical-control-desc-compact">Automatic target acquisition</p>
              </div>
              <HudSwitch id="autoTarget" />
            </div>
            <Separator className="my-1" />
            <div className="tactical-control-row-compact">
              <div className="tactical-control-info-compact">
                <Label htmlFor="iff" className="tactical-control-label-compact">
                  <Radio className="w-4 h-4 inline mr-2" />
                  IFF TRANSPONDER
                </Label>
                <p className="tactical-control-desc-compact">Identify friend or foe</p>
              </div>
              <HudSwitch id="iff" defaultChecked />
            </div>
            <Separator className="my-1" />
            <div className="tactical-control-row-compact">
              <div className="tactical-control-info-compact">
                <Label htmlFor="shield" className="tactical-control-label-compact">
                  <Shield className="w-4 h-4 inline mr-2" />
                  COMBAT SHIELD
                </Label>
                <p className="tactical-control-desc-compact">Energy shield boost</p>
              </div>
              <HudSwitch id="shield" />
            </div>
          </div>
        </HudPanel>

        {/* Mission Objectives */}
        <HudPanel title="MISSION OBJECTIVES" className="hud-panel-compact">
          <div className="tactical-objectives-container-compact">
            <div className="tactical-objective-item-compact">
              <div className="tactical-objective-status-compact complete">✓</div>
              <div className="tactical-objective-text-compact">Initialize H.E.V systems</div>
            </div>
            <div className="tactical-objective-item-compact">
              <div className="tactical-objective-status-compact complete">✓</div>
              <div className="tactical-objective-text-compact">Establish radio link</div>
            </div>
            <div className="tactical-objective-item-compact">
              <div className="tactical-objective-status-compact active">●</div>
              <div className="tactical-objective-text-compact">Patrol sector 7-G</div>
            </div>
            <div className="tactical-objective-item-compact">
              <div className="tactical-objective-status-compact pending">○</div>
              <div className="tactical-objective-text-compact">Report to command</div>
            </div>
          </div>
        </HudPanel>

        {/* Communications Status */}
        <HudPanel title="COMMUNICATIONS" className="hud-panel-compact">
          <div className="tactical-comms-container-compact">
            <div className="tactical-comms-row-compact">
              <span className="tactical-comms-label-compact">RADIO LINK:</span>
              <Badge variant="outline" className="tactical-status-badge-compact active">ACTIVE</Badge>
            </div>
            <div className="tactical-comms-row-compact">
              <span className="tactical-comms-label-compact">ENCRYPTION:</span>
              <Badge variant="outline" className="tactical-status-badge-compact active">ENABLED</Badge>
            </div>
            <div className="tactical-comms-row-compact">
              <span className="tactical-comms-label-compact">SIGNAL STRENGTH:</span>
              <span className="tactical-comms-value-compact">95%</span>
            </div>
            <Separator className="my-1" />
            <div className="tactical-comms-row-compact">
              <span className="tactical-comms-label-compact">LAST TRANSMISSION:</span>
              <span className="tactical-comms-time-compact">00:42 ago</span>
            </div>
          </div>
        </HudPanel>

        {/* System Diagnostics */}
        <HudPanel title="SYSTEM DIAGNOSTICS" className="hud-panel-compact">
          <div className="tactical-diagnostics-container-compact">
            <div className="tactical-diagnostic-item-compact">
              <Zap className="w-4 h-4 tactical-diagnostic-icon-compact" />
              <div className="tactical-diagnostic-info-compact">
                <div className="tactical-diagnostic-name-compact">POWER SYSTEMS</div>
                <div className="tactical-diagnostic-status-compact nominal">NOMINAL</div>
              </div>
            </div>
            <div className="tactical-diagnostic-item-compact">
              <Target className="w-4 h-4 tactical-diagnostic-icon-compact" />
              <div className="tactical-diagnostic-info-compact">
                <div className="tactical-diagnostic-name-compact">TARGETING ARRAY</div>
                <div className="tactical-diagnostic-status-compact nominal">NOMINAL</div>
              </div>
            </div>
            <div className="tactical-diagnostic-item-compact">
              <Shield className="w-4 h-4 tactical-diagnostic-icon-compact" />
              <div className="tactical-diagnostic-info-compact">
                <div className="tactical-diagnostic-name-compact">DEFENSE GRID</div>
                <div className="tactical-diagnostic-status-compact nominal">NOMINAL</div>
              </div>
            </div>
            <div className="tactical-diagnostic-item-compact">
              <Radio className="w-4 h-4 tactical-diagnostic-icon-compact" />
              <div className="tactical-diagnostic-info-compact">
                <div className="tactical-diagnostic-name-compact">COMMS ARRAY</div>
                <div className="tactical-diagnostic-status-compact nominal">NOMINAL</div>
              </div>
            </div>
          </div>
        </HudPanel>

        {/* Quick Actions */}
        <HudPanel title="QUICK ACTIONS" className="hud-panel-compact">
          <div className="tactical-actions-container-compact">
            <Button variant="outline" size="sm" className="tactical-action-button-compact">
              <Target className="w-4 h-4 mr-2" />
              SCAN AREA
            </Button>
            <Button variant="outline" size="sm" className="tactical-action-button-compact">
              <Radio className="w-4 h-4 mr-2" />
              HAIL CONTACTS
            </Button>
            <Button variant="outline" size="sm" className="tactical-action-button-compact">
              <Shield className="w-4 h-4 mr-2" />
              ACTIVATE SHIELD
            </Button>
            <Button variant="destructive" size="sm" className="tactical-action-button-compact">
              <AlertTriangle className="w-4 h-4 mr-2" />
              EMERGENCY BEACON
            </Button>
          </div>
        </HudPanel>
      </div>
    </div>
  );
}
