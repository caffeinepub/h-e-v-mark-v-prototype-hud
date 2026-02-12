import { useHazardsStore } from '../../state/hazardsState';
import { cn } from '@/lib/utils';
import { GLYPHS } from '../../lib/glyphs';

export function EnvironmentalHazardsPanel() {
  const { levels, getHazardStatus } = useHazardsStore();

  const hazards = [
    { key: 'fire' as const, label: 'FIRE/TEMPERATURE', icon: GLYPHS.fire },
    { key: 'bio' as const, label: 'BIOHAZARD', icon: GLYPHS.bio },
    { key: 'radiation' as const, label: 'RADIATION', icon: GLYPHS.radiation },
    { key: 'electrical' as const, label: 'ELECTRICAL', icon: GLYPHS.electrical },
    { key: 'gas' as const, label: 'TOXIC GAS', icon: GLYPHS.gas },
  ];

  const getStatusClass = (level: number) => {
    if (level === 0) return 'status-nominal';
    if (level < 60) return 'status-warning';
    return 'status-critical';
  };

  return (
    <div className="tactical-panel">
      <div className="hud-panel-title">ENVIRONMENTAL HAZARDS</div>
      <div className="hud-panel-content">
        <div className="hazards-list">
          {hazards.map(({ key, label, icon }) => {
            const level = levels[key];
            const status = getHazardStatus(level);
            const statusClass = getStatusClass(level);
            
            return (
              <div key={key} className={cn('hazard-row', statusClass)}>
                <span className="hazard-icon glyph-icon">{icon}</span>
                <div className="hazard-info">
                  <div className="hazard-label">{label}</div>
                  <div className="hazard-status-text">{status}</div>
                </div>
                <div className="hazard-level-value">{level}%</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
