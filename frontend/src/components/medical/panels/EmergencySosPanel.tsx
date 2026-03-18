import { useState } from 'react';
import { HudPanel } from '../../hud/Panels';
import { HudSwitch } from '../../common/HudSwitch';
import { Button } from '@/components/ui/button';
import { useLogStore } from '../../../state/systemLog';
import { uiSfx } from '../../../audio/uiSfx';
import { cn } from '@/lib/utils';

type SosMode = 'STANDBY' | 'ARMED' | 'TRANSMITTING';

export function EmergencySosPanel() {
  const { addEntry } = useLogStore();
  const [sosMode, setSosMode] = useState<SosMode>('STANDBY');
  const [beaconReady, setBeaconReady] = useState(true);
  const [spoofingEnabled, setSpoofingEnabled] = useState(false);
  const [signalIntegrity, setSignalIntegrity] = useState(98);
  const [lastBurst, setLastBurst] = useState<Date | null>(null);

  const handleArmToggle = () => {
    uiSfx.toggle();
    if (sosMode === 'STANDBY') {
      setSosMode('ARMED');
      addEntry('warning', 'Emergency SOS system ARMED');
    } else if (sosMode === 'ARMED') {
      setSosMode('STANDBY');
      addEntry('system', 'Emergency SOS system disarmed');
    }
  };

  const handleSpoofingToggle = () => {
    uiSfx.toggle();
    setSpoofingEnabled(!spoofingEnabled);
    addEntry('system', `Signal spoofing ${!spoofingEnabled ? 'enabled' : 'disabled'} (POLITE PANIC MODE)`);
  };

  const handleTestBurst = () => {
    if (sosMode !== 'ARMED') {
      addEntry('error', 'SOS system must be ARMED to send test burst');
      return;
    }
    uiSfx.buttonClick();
    setSosMode('TRANSMITTING');
    setLastBurst(new Date());
    addEntry('system', 'Emergency test burst transmitted');
    
    setTimeout(() => {
      setSosMode('ARMED');
      setSignalIntegrity(Math.max(85, Math.floor(Math.random() * 15) + 85));
    }, 2000);
  };

  return (
    <HudPanel title="EMERGENCY SOS SYSTEM" className="medical-readout-panel">
      <div className="sos-panel-content">
        <div className="sos-status-grid">
          <div className="sos-stat-row">
            <span className="sos-label">BEACON STATUS:</span>
            <span className={cn(
              "sos-value",
              !beaconReady && "status-critical"
            )}>
              {beaconReady ? 'READY' : 'OFFLINE'}
            </span>
          </div>
          <div className="sos-stat-row">
            <span className="sos-label">SYSTEM MODE:</span>
            <span className={cn(
              "sos-value",
              sosMode === 'ARMED' && "status-warning",
              sosMode === 'TRANSMITTING' && "status-critical"
            )}>
              {sosMode}
            </span>
          </div>
          <div className="sos-stat-row">
            <span className="sos-label">SIGNAL INTEGRITY:</span>
            <span className="sos-value">{signalIntegrity}%</span>
          </div>
          <div className="sos-stat-row">
            <span className="sos-label">PROTOCOL:</span>
            <span className="sos-value">LAMBDA-DISTRESS-7</span>
          </div>
          <div className="sos-stat-row">
            <span className="sos-label">CHECKSUM:</span>
            <span className="sos-value">0x{Math.floor(Math.random() * 0xFFFF).toString(16).toUpperCase().padStart(4, '0')}</span>
          </div>
          {lastBurst && (
            <div className="sos-stat-row">
              <span className="sos-label">LAST BURST:</span>
              <span className="sos-value">{lastBurst.toLocaleTimeString()}</span>
            </div>
          )}
        </div>

        <div className="sos-controls">
          <div className="sos-control-row">
            <span className="sos-control-label">ARM SYSTEM:</span>
            <HudSwitch
              checked={sosMode !== 'STANDBY'}
              onCheckedChange={handleArmToggle}
              disabled={sosMode === 'TRANSMITTING'}
            />
          </div>
          <div className="sos-control-row">
            <span className="sos-control-label">POLITE PANIC MODE:</span>
            <HudSwitch
              checked={spoofingEnabled}
              onCheckedChange={handleSpoofingToggle}
            />
          </div>
        </div>

        <Button
          onClick={handleTestBurst}
          disabled={sosMode !== 'ARMED'}
          className="sos-test-button"
          variant="outline"
        >
          {sosMode === 'TRANSMITTING' ? 'TRANSMITTING...' : 'SEND TEST BURST'}
        </Button>
      </div>
    </HudPanel>
  );
}
