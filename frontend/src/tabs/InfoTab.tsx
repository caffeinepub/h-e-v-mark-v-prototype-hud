import { useInfoSettingsStore } from '@/state/infoSettingsStore';
import { OperatorProfilePanel } from '../components/info/OperatorProfilePanel';
import { CharacterBackstoryPanel } from '../components/info/CharacterBackstoryPanel';
import { SuitSubsystemReadouts } from '../components/info/SuitSubsystemReadouts';
import { SystemLogView } from '../components/info/SystemLogView';
import { CommandConsole } from '../components/info/CommandConsole';
import { SystemDiagnosticsPanel } from '../components/info/SystemDiagnosticsPanel';
import { EquipmentDescriptionsPanel } from '../components/info/EquipmentDescriptionsPanel';
import { SuitLorePanel } from '../components/info/SuitLorePanel';

export function InfoTab() {
  const { systemStyle } = useInfoSettingsStore();

  const getSubsystemTitle = () => {
    switch (systemStyle) {
      case 'hecu':
        return 'COMBAT SYSTEMS';
      case 'guard':
        return 'SECURITY SYSTEMS';
      default:
        return 'SUIT SUBSYSTEMS';
    }
  };

  return (
    <div className="tab-content">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <OperatorProfilePanel />
          <SystemDiagnosticsPanel />
        </div>

        <CharacterBackstoryPanel />

        <div className="tactical-panel">
          <div className="hud-panel-title-compact">{getSubsystemTitle()}</div>
          <div className="hud-panel-content-compact">
            <SuitSubsystemReadouts />
          </div>
        </div>

        <EquipmentDescriptionsPanel />

        <SuitLorePanel />

        <div className="tactical-panel">
          <div className="hud-panel-title-compact">SYSTEM LOG</div>
          <div className="hud-panel-content-compact">
            <SystemLogView />
          </div>
        </div>

        <div className="tactical-panel">
          <div className="hud-panel-title-compact">COMMAND CONSOLE</div>
          <div className="hud-panel-content-compact">
            <CommandConsole />
          </div>
        </div>
      </div>
    </div>
  );
}
