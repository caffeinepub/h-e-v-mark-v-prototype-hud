import { AdvancedTacticalPanel } from '@/components/military/AdvancedTacticalPanel';
import { ExpandedWeaponsPanel } from '@/components/military/ExpandedWeaponsPanel';
import { SquadStatusPanel } from '@/components/military/SquadStatusPanel';
import { Crosshair } from 'lucide-react';

export function MilitaryTab() {
  return (
    <div className="tab-content">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Crosshair className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold tracking-wider">MILITARY OPERATIONS</h2>
        </div>

        <div className="tactical-panel">
          <div className="hud-panel-title-compact">ADVANCED TACTICAL SYSTEMS</div>
          <div className="hud-panel-content-compact">
            <AdvancedTacticalPanel />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="tactical-panel">
            <div className="hud-panel-title-compact">WEAPONS SPECIFICATIONS</div>
            <div className="hud-panel-content-compact">
              <ExpandedWeaponsPanel />
            </div>
          </div>

          <div className="tactical-panel">
            <div className="hud-panel-title-compact">SQUAD STATUS</div>
            <div className="hud-panel-content-compact">
              <SquadStatusPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
