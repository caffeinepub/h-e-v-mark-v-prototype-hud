import { useState } from 'react';
import { HudPanel } from '../../hud/Panels';
import { HudSwitch } from '../../common/HudSwitch';
import { useSuitStore } from '../../../state/suitState';
import { useLogStore } from '../../../state/systemLog';
import { uiSfx } from '../../../audio/uiSfx';
import { cn } from '@/lib/utils';

interface LimbStatus {
  integrity: number;
  servoLoad: number;
  fractureProbability: number;
  calibrated: boolean;
}

export function LimbIntegrityPanel() {
  const { stats } = useSuitStore();
  const { addEntry } = useLogStore();

  const [limbs, setLimbs] = useState<Record<string, LimbStatus>>({
    leftArm: {
      integrity: Math.max(70, stats.health - 5),
      servoLoad: 42,
      fractureProbability: stats.health < 50 ? 18 : 3,
      calibrated: true,
    },
    rightArm: {
      integrity: Math.max(65, stats.health - 10),
      servoLoad: 38,
      fractureProbability: stats.health < 50 ? 22 : 5,
      calibrated: true,
    },
    leftLeg: {
      integrity: Math.max(75, stats.health),
      servoLoad: 55,
      fractureProbability: stats.health < 40 ? 15 : 2,
      calibrated: true,
    },
    rightLeg: {
      integrity: Math.max(72, stats.health - 3),
      servoLoad: 58,
      fractureProbability: stats.health < 40 ? 12 : 1,
      calibrated: true,
    },
  });

  const handleCalibrationToggle = (limbName: string) => {
    uiSfx.toggle();
    setLimbs((prev) => ({
      ...prev,
      [limbName]: {
        ...prev[limbName],
        calibrated: !prev[limbName].calibrated,
      },
    }));
    addEntry('system', `Limb calibration ${!limbs[limbName].calibrated ? 'enabled' : 'disabled'}: ${limbName.toUpperCase()}`);
  };

  const getLimbLabel = (key: string): string => {
    const labels: Record<string, string> = {
      leftArm: 'LEFT ARM',
      rightArm: 'RIGHT ARM',
      leftLeg: 'LEFT LEG',
      rightLeg: 'RIGHT LEG',
    };
    return labels[key] || key;
  };

  return (
    <HudPanel title="LIMB INTEGRITY MONITOR" className="medical-readout-panel">
      {Object.entries(limbs).map(([limbKey, limb]) => (
        <div key={limbKey} className="limb-integrity-section">
          <div className="limb-header">
            <span className="limb-name">{getLimbLabel(limbKey)}</span>
            <div className="limb-calibration-toggle">
              <span className="limb-toggle-label">CAL</span>
              <HudSwitch
                checked={limb.calibrated}
                onCheckedChange={() => handleCalibrationToggle(limbKey)}
              />
            </div>
          </div>
          <div className="limb-stats-grid">
            <div className="limb-stat-row">
              <span className="limb-stat-label">INTEGRITY:</span>
              <span className={cn(
                "limb-stat-value",
                limb.integrity < 50 && "status-critical",
                limb.integrity >= 50 && limb.integrity < 75 && "status-warning"
              )}>
                {limb.integrity}%
              </span>
            </div>
            <div className="limb-stat-row">
              <span className="limb-stat-label">SERVO LOAD:</span>
              <span className="limb-stat-value">{limb.servoLoad}%</span>
            </div>
            <div className="limb-stat-row">
              <span className="limb-stat-label">FRACTURE PROB:</span>
              <span className={cn(
                "limb-stat-value",
                limb.fractureProbability > 15 && "status-warning"
              )}>
                {limb.fractureProbability}%
              </span>
            </div>
            <div className="limb-stat-row">
              <span className="limb-stat-label">STATUS:</span>
              <span className={cn(
                "limb-stat-value",
                !limb.calibrated && "status-warning"
              )}>
                {limb.calibrated ? 'CALIBRATED' : 'UNCALIBRATED'}
              </span>
            </div>
          </div>
        </div>
      ))}
    </HudPanel>
  );
}
