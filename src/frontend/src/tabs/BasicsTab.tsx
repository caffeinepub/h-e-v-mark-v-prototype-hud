import { useSuitStore } from '../state/suitState';
import { StatPanel, VitalsPanel } from '../components/hud/Panels';
import { EnvironmentalHazardsPanel } from '../components/hazards/EnvironmentalHazardsPanel';

export function BasicsTab() {
  const { stats } = useSuitStore();

  const getStatus = (value: number, thresholds: { warning: number; critical: number }) => {
    if (value >= thresholds.warning) return 'nominal';
    if (value >= thresholds.critical) return 'warning';
    return 'critical';
  };

  return (
    <div className="tab-content">
      <div className="basics-grid">
        <div className="tactical-panel">
          <div className="hud-panel-title">CORE STATISTICS</div>
          <div className="hud-panel-content">
            <StatPanel
              label="HEALTH"
              value={stats.health}
              max={100}
              unit="%"
              status={getStatus(stats.health, { warning: 70, critical: 40 })}
            />
            <StatPanel
              label="ARMOR"
              value={stats.armor}
              max={100}
              unit="%"
              status={getStatus(stats.armor, { warning: 70, critical: 40 })}
            />
            <StatPanel
              label="AUX POWER"
              value={stats.aux}
              max={100}
              unit="%"
              status={getStatus(stats.aux, { warning: 50, critical: 25 })}
            />
            <StatPanel
              label="AMMUNITION"
              value={stats.ammo}
              max={999}
              status={getStatus(stats.ammo, { warning: 100, critical: 30 })}
            />
          </div>
        </div>

        <EnvironmentalHazardsPanel />

        <VitalsPanel health={stats.health} armor={stats.armor} aux={stats.aux} />
      </div>
    </div>
  );
}
