import { useSuitStore } from '../../state/suitState';
import { useHazardsStore } from '../../state/hazardsState';
import { HudPanel } from '../hud/Panels';
import { cn } from '@/lib/utils';

export function MedicalReadouts() {
  const { stats, modules } = useSuitStore();
  const { levels } = useHazardsStore();

  const getHealthStatus = () => {
    if (stats.health >= 80) return 'EXCELLENT';
    if (stats.health >= 60) return 'GOOD';
    if (stats.health >= 40) return 'FAIR';
    if (stats.health >= 20) return 'POOR';
    return 'CRITICAL';
  };

  const getHeartRate = () => {
    if (stats.health < 30) return 125;
    if (stats.health < 50) return 110;
    if (stats.health < 70) return 85;
    return 72;
  };

  const getBloodPressure = () => {
    if (stats.health < 30) return '145/95';
    if (stats.health < 50) return '135/88';
    if (stats.health < 70) return '125/82';
    return '120/80';
  };

  const getRespirationRate = () => {
    if (stats.health < 30) return 24;
    if (stats.health < 50) return 20;
    if (stats.health < 70) return 16;
    return 14;
  };

  const getToxinLevel = () => {
    const bioLevel = levels.bio;
    const radLevel = levels.radiation;
    const gasLevel = levels.gas;
    return Math.round((bioLevel + radLevel + gasLevel) / 3);
  };

  const getPainIndex = () => {
    const damage = 100 - stats.health;
    return Math.round(damage / 10);
  };

  return (
    <div className="medical-readouts-container">
      <div className="medical-readouts-grid">
        <HudPanel title="VITAL SIGNS" className="medical-readout-panel">
          <div className="medical-stat-row">
            <span className="medical-label">HEALTH STATUS:</span>
            <span className={cn(
              "medical-value",
              stats.health < 30 && "status-critical",
              stats.health >= 30 && stats.health < 60 && "status-warning"
            )}>
              {getHealthStatus()}
            </span>
          </div>
          <div className="medical-stat-row">
            <span className="medical-label">HEART RATE:</span>
            <span className="medical-value">{getHeartRate()} BPM</span>
          </div>
          <div className="medical-stat-row">
            <span className="medical-label">BLOOD PRESSURE:</span>
            <span className="medical-value">{getBloodPressure()} mmHg</span>
          </div>
          <div className="medical-stat-row">
            <span className="medical-label">RESPIRATION:</span>
            <span className="medical-value">{getRespirationRate()} /min</span>
          </div>
          <div className="medical-stat-row">
            <span className="medical-label">BLOOD OXYGEN:</span>
            <span className="medical-value">{Math.max(85, Math.min(100, 95 + Math.round(stats.health / 20)))}%</span>
          </div>
          <div className="medical-stat-row">
            <span className="medical-label">BODY TEMP:</span>
            <span className="medical-value">{(36.5 + (100 - stats.health) * 0.015).toFixed(1)}°C</span>
          </div>
        </HudPanel>

        <HudPanel title="TRAUMA ASSESSMENT" className="medical-readout-panel">
          <div className="medical-stat-row">
            <span className="medical-label">SUIT INTEGRITY:</span>
            <span className={cn(
              "medical-value",
              stats.armor < 30 && "status-critical",
              stats.armor >= 30 && stats.armor < 60 && "status-warning"
            )}>
              {stats.armor}%
            </span>
          </div>
          <div className="medical-stat-row">
            <span className="medical-label">TISSUE DAMAGE:</span>
            <span className="medical-value">{100 - stats.health}%</span>
          </div>
          <div className="medical-stat-row">
            <span className="medical-label">BLOOD LOSS:</span>
            <span className="medical-value">{Math.max(0, Math.round((100 - stats.health) * 0.8))}mL</span>
          </div>
          <div className="medical-stat-row">
            <span className="medical-label">PAIN INDEX:</span>
            <span className="medical-value">{getPainIndex()}/10</span>
          </div>
          <div className="medical-stat-row">
            <span className="medical-label">SHOCK RISK:</span>
            <span className="medical-value">{stats.health < 30 ? 'HIGH' : stats.health < 60 ? 'MODERATE' : 'LOW'}</span>
          </div>
        </HudPanel>

        <HudPanel title="TOXINS & EXPOSURE" className="medical-readout-panel">
          <div className="medical-stat-row">
            <span className="medical-label">TOXIN LEVEL:</span>
            <span className={cn(
              "medical-value",
              getToxinLevel() > 60 && "status-critical",
              getToxinLevel() > 30 && getToxinLevel() <= 60 && "status-warning"
            )}>
              {getToxinLevel()}%
            </span>
          </div>
          <div className="medical-stat-row">
            <span className="medical-label">RADIATION DOSE:</span>
            <span className="medical-value">{levels.radiation} mSv</span>
          </div>
          <div className="medical-stat-row">
            <span className="medical-label">BIO CONTAMINATION:</span>
            <span className="medical-value">{levels.bio > 0 ? 'DETECTED' : 'NONE'}</span>
          </div>
          <div className="medical-stat-row">
            <span className="medical-label">CHEMICAL EXPOSURE:</span>
            <span className="medical-value">{levels.gas > 0 ? 'ACTIVE' : 'NONE'}</span>
          </div>
          <div className="medical-stat-row">
            <span className="medical-label">DECON STATUS:</span>
            <span className="medical-value">{modules.respirator ? 'ACTIVE' : 'STANDBY'}</span>
          </div>
        </HudPanel>

        <HudPanel title="SKELETAL & FRACTURE" className="medical-readout-panel">
          <div className="medical-stat-row">
            <span className="medical-label">BONE INTEGRITY:</span>
            <span className="medical-value">{Math.max(70, stats.health)}%</span>
          </div>
          <div className="medical-stat-row">
            <span className="medical-label">FRACTURES:</span>
            <span className="medical-value">{stats.health < 40 ? 'DETECTED' : 'NONE'}</span>
          </div>
          <div className="medical-stat-row">
            <span className="medical-label">SPINAL STATUS:</span>
            <span className="medical-value">{stats.health < 30 ? 'COMPROMISED' : 'NOMINAL'}</span>
          </div>
          <div className="medical-stat-row">
            <span className="medical-label">JOINT MOBILITY:</span>
            <span className="medical-value">{stats.health < 50 ? 'REDUCED' : 'FULL'}</span>
          </div>
        </HudPanel>

        <HudPanel title="LOCALIZED DAMAGE" className="medical-readout-panel">
          <div className="medical-stat-row">
            <span className="medical-label">HEAD:</span>
            <span className="medical-value">{modules.helmet ? 'PROTECTED' : 'EXPOSED'}</span>
          </div>
          <div className="medical-stat-row">
            <span className="medical-label">TORSO:</span>
            <span className="medical-value">{stats.armor > 60 ? 'NOMINAL' : stats.armor > 30 ? 'DAMAGED' : 'CRITICAL'}</span>
          </div>
          <div className="medical-stat-row">
            <span className="medical-label">ARMS:</span>
            <span className="medical-value">{stats.health > 60 ? 'NOMINAL' : stats.health > 30 ? 'INJURED' : 'SEVERE'}</span>
          </div>
          <div className="medical-stat-row">
            <span className="medical-label">LEGS:</span>
            <span className="medical-value">{stats.health > 60 ? 'NOMINAL' : stats.health > 30 ? 'INJURED' : 'SEVERE'}</span>
          </div>
        </HudPanel>

        <HudPanel title="MEDICAL SYSTEMS" className="medical-readout-panel">
          <div className="medical-stat-row">
            <span className="medical-label">MORPHINE ADMIN:</span>
            <span className="medical-value">{modules.advancedMedical ? 'ACTIVE' : 'STANDBY'}</span>
          </div>
          <div className="medical-stat-row">
            <span className="medical-label">AUTO-INJECT:</span>
            <span className="medical-value">{modules.advancedMedical ? 'ENABLED' : 'DISABLED'}</span>
          </div>
          <div className="medical-stat-row">
            <span className="medical-label">DEFIBRILLATOR:</span>
            <span className="medical-value">{modules.defibrillator ? 'READY' : 'OFFLINE'}</span>
          </div>
          <div className="medical-stat-row">
            <span className="medical-label">TRAUMA KIT:</span>
            <span className="medical-value">READY</span>
          </div>
        </HudPanel>
      </div>
    </div>
  );
}
