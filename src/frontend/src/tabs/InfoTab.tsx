import { SuitSubsystemReadouts } from '../components/info/SuitSubsystemReadouts';
import { SystemLogView } from '../components/info/SystemLogView';
import { CommandConsole } from '../components/info/CommandConsole';
import { HudPanel } from '../components/hud/Panels';

export function InfoTab() {
  return (
    <div className="tab-content">
      <div className="info-tab-layout">
        <SuitSubsystemReadouts />
        
        <div className="tactical-panel">
          <div className="hud-panel-title">SYSTEM LOG</div>
          <div className="hud-panel-content">
            <SystemLogView />
          </div>
        </div>

        <div className="tactical-panel">
          <div className="hud-panel-title">COMMAND CONSOLE</div>
          <div className="hud-panel-content">
            <CommandConsole />
          </div>
        </div>
      </div>
    </div>
  );
}
