import { useHazardsStore } from '../../state/hazardsState';
import { GLYPHS } from '@/lib/glyphs';
import { cn } from '@/lib/utils';

export function HorizontalHazardPanel() {
  const { levels } = useHazardsStore();

  const hazards = [
    { key: 'fire' as const, label: 'FIRE', icon: GLYPHS.fire, color: 'fire' },
    { key: 'bio' as const, label: 'BIO', icon: GLYPHS.bio, color: 'bio' },
    { key: 'radiation' as const, label: 'RAD', icon: GLYPHS.radiation, color: 'radiation' },
    { key: 'electrical' as const, label: 'ELEC', icon: GLYPHS.electrical, color: 'electrical' },
    { key: 'gas' as const, label: 'GAS', icon: GLYPHS.gas, color: 'gas' },
  ];

  const getSeverityClass = (level: number) => {
    if (level === 0) return 'severity-safe';
    if (level < 40) return 'severity-caution';
    if (level < 70) return 'severity-danger';
    return 'severity-critical';
  };

  return (
    <div className="horizontal-hazard-panel">
      <div className="horizontal-hazard-title">ENVIRONMENTAL HAZARDS</div>
      <div className="horizontal-hazard-grid">
        {hazards.map(({ key, label, icon, color }) => {
          const level = levels[key];
          const severityClass = getSeverityClass(level);
          
          return (
            <div key={key} className={cn('horizontal-hazard-item', severityClass)}>
              <span className="horizontal-hazard-icon">{icon}</span>
              <div className="horizontal-hazard-info">
                <div className="horizontal-hazard-label">{label}</div>
                <div className="horizontal-hazard-bar">
                  <div 
                    className={cn('horizontal-hazard-bar-fill', `${color}-fill`)}
                    style={{ width: `${level}%` }}
                  />
                </div>
                <div className="horizontal-hazard-value">{level}%</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
