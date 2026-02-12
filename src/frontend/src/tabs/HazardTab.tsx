import { useHazardsStore } from '../state/hazardsState';
import { useGetAllHazardStatuses, useGetLifeSupportInfo, useGetEnvProtectionInfo, useGetPowerInfo } from '../hooks/useQueries';
import { cn } from '@/lib/utils';
import { GLYPHS } from '../lib/glyphs';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export function HazardTab() {
  const { levels, getAggregateHazard, getHazardStatus, getTrend } = useHazardsStore();
  const { data: hazardStatuses } = useGetAllHazardStatuses();
  const { data: lifeSupportInfo } = useGetLifeSupportInfo();
  const { data: envProtectionInfo } = useGetEnvProtectionInfo();
  const { data: powerInfo } = useGetPowerInfo();

  const aggregateHazard = getAggregateHazard();
  const aggregateStatus = getHazardStatus(aggregateHazard);

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

  const getTrendIcon = (trend: 'rising' | 'falling' | 'steady') => {
    if (trend === 'rising') return <TrendingUp className="w-4 h-4" />;
    if (trend === 'falling') return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  return (
    <div className="tab-content">
      {/* Aggregate Hazard Summary */}
      <div className="tactical-panel mb-4">
        <div className="hud-panel-title">AGGREGATE HAZARD SEVERITY</div>
        <div className="hud-panel-content">
          <div className={cn('aggregate-hazard-display', getStatusClass(aggregateHazard))}>
            <div className="aggregate-value">{aggregateHazard}%</div>
            <div className="aggregate-status">{aggregateStatus}</div>
          </div>
        </div>
      </div>

      {/* All Hazards Panel */}
      <div className="tactical-panel mb-4">
        <div className="hud-panel-title">ALL HAZARDS</div>
        <div className="hud-panel-content">
          <div className="hazards-list">
            {hazards.map(({ key, label, icon }) => {
              const level = levels[key];
              const status = getHazardStatus(level);
              const statusClass = getStatusClass(level);
              const trend = getTrend(key);
              const backendStatus = hazardStatuses?.[key];
              
              return (
                <div key={key} className={cn('hazard-row-detailed', statusClass)}>
                  <span className="hazard-icon glyph-icon">{icon}</span>
                  <div className="hazard-info-detailed">
                    <div className="hazard-label">{label}</div>
                    <div className="hazard-backend-status">
                      {backendStatus || 'Loading...'}
                    </div>
                  </div>
                  <div className="hazard-metrics">
                    <div className="hazard-trend">
                      {getTrendIcon(trend)}
                    </div>
                    <div className="hazard-level-value">{level}%</div>
                    <div className="hazard-status-badge">{status}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Environmental Status Panel */}
      <div className="tactical-panel">
        <div className="hud-panel-title">ENVIRONMENTAL STATUS</div>
        <div className="hud-panel-content">
          <div className="env-status-grid">
            {/* Life Support System */}
            <div className="env-status-section">
              <div className="env-section-title">LIFE SUPPORT SYSTEM</div>
              <div className="env-readouts">
                <div className="env-readout">
                  <span className="env-label">System Status:</span>
                  <span className={cn('env-value', lifeSupportInfo?.[0] ? 'status-nominal' : 'status-critical')}>
                    {lifeSupportInfo?.[0] ? 'ACTIVE' : 'OFFLINE'}
                  </span>
                </div>
                <div className="env-readout">
                  <span className="env-label">Oxygen Level:</span>
                  <span className={cn('env-value', 
                    (lifeSupportInfo?.[1] ?? 0) > 70 ? 'status-nominal' : 
                    (lifeSupportInfo?.[1] ?? 0) > 40 ? 'status-warning' : 'status-critical'
                  )}>
                    {lifeSupportInfo?.[1] !== undefined ? `${Number(lifeSupportInfo[1])}%` : '--'}
                  </span>
                </div>
                <div className="env-readout">
                  <span className="env-label">CO₂ Level:</span>
                  <span className={cn('env-value',
                    (lifeSupportInfo?.[2] ?? 0) < 30 ? 'status-nominal' :
                    (lifeSupportInfo?.[2] ?? 0) < 60 ? 'status-warning' : 'status-critical'
                  )}>
                    {lifeSupportInfo?.[2] !== undefined ? `${Number(lifeSupportInfo[2])}%` : '--'}
                  </span>
                </div>
                <div className="env-readout">
                  <span className="env-label">Temperature:</span>
                  <span className={cn('env-value',
                    (lifeSupportInfo?.[3] ?? 0) >= 18 && (lifeSupportInfo?.[3] ?? 0) <= 25 ? 'status-nominal' :
                    (lifeSupportInfo?.[3] ?? 0) >= 15 && (lifeSupportInfo?.[3] ?? 0) <= 30 ? 'status-warning' : 'status-critical'
                  )}>
                    {lifeSupportInfo?.[3] !== undefined ? `${Number(lifeSupportInfo[3])}°C` : '--'}
                  </span>
                </div>
                <div className="env-readout">
                  <span className="env-label">Air Purification:</span>
                  <span className="env-value status-nominal">
                    {lifeSupportInfo?.[4] || 'Unknown'}
                  </span>
                </div>
              </div>
            </div>

            {/* Environmental Protection System */}
            <div className="env-status-section">
              <div className="env-section-title">ENVIRONMENTAL PROTECTION</div>
              <div className="env-readouts">
                <div className="env-readout">
                  <span className="env-label">System Status:</span>
                  <span className={cn('env-value', envProtectionInfo?.[0] ? 'status-nominal' : 'status-critical')}>
                    {envProtectionInfo?.[0] ? 'ACTIVE' : 'OFFLINE'}
                  </span>
                </div>
                <div className="env-readout">
                  <span className="env-label">Polarisation Level:</span>
                  <span className="env-value status-nominal">
                    {envProtectionInfo?.[1] !== undefined ? `${Number(envProtectionInfo[1])}` : '--'}
                  </span>
                </div>
                <div className="env-readout">
                  <span className="env-label">Radiation Level:</span>
                  <span className={cn('env-value',
                    (envProtectionInfo?.[2] ?? 0) < 30 ? 'status-nominal' :
                    (envProtectionInfo?.[2] ?? 0) < 60 ? 'status-warning' : 'status-critical'
                  )}>
                    {envProtectionInfo?.[2] !== undefined ? `${Number(envProtectionInfo[2])}` : '--'}
                  </span>
                </div>
                <div className="env-readout">
                  <span className="env-label">Shield Status:</span>
                  <span className="env-value status-nominal">
                    {envProtectionInfo?.[3] || 'Unknown'}
                  </span>
                </div>
              </div>
            </div>

            {/* Power Management System */}
            <div className="env-status-section">
              <div className="env-section-title">POWER MANAGEMENT</div>
              <div className="env-readouts">
                <div className="env-readout">
                  <span className="env-label">System Status:</span>
                  <span className={cn('env-value', powerInfo?.[0] ? 'status-nominal' : 'status-critical')}>
                    {powerInfo?.[0] ? 'ACTIVE' : 'OFFLINE'}
                  </span>
                </div>
                <div className="env-readout">
                  <span className="env-label">Battery Level:</span>
                  <span className={cn('env-value',
                    (powerInfo?.[1] ?? 0) > 70 ? 'status-nominal' :
                    (powerInfo?.[1] ?? 0) > 40 ? 'status-warning' : 'status-critical'
                  )}>
                    {powerInfo?.[1] !== undefined ? `${Number(powerInfo[1])}%` : '--'}
                  </span>
                </div>
                <div className="env-readout">
                  <span className="env-label">Power Output:</span>
                  <span className="env-value status-nominal">
                    {powerInfo?.[2] !== undefined ? `${Number(powerInfo[2])}W` : '--'}
                  </span>
                </div>
                <div className="env-readout">
                  <span className="env-label">Aux Power Output:</span>
                  <span className="env-value status-nominal">
                    {powerInfo?.[3] !== undefined ? `${Number(powerInfo[3])}W` : '--'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
