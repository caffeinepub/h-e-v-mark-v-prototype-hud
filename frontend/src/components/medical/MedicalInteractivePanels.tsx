import { useState } from 'react';
import { LimbIntegrityPanel } from './panels/LimbIntegrityPanel';
import { EmergencySosPanel } from './panels/EmergencySosPanel';
import { HudPanel } from '../hud/Panels';
import { HudSwitch } from '../common/HudSwitch';
import { useSuitStore } from '../../state/suitState';
import { useLogStore } from '../../state/systemLog';
import { uiSfx } from '../../audio/uiSfx';
import { cn } from '@/lib/utils';

export function MedicalInteractivePanels() {
  const { stats, modules } = useSuitStore();
  const { addEntry } = useLogStore();

  const [neuralStability, setNeuralStability] = useState(94);
  const [cognitiveLoad, setCognitiveLoad] = useState(38);
  const [painSuppression, setPainSuppression] = useState(modules.advancedMedical);
  const [autoStim, setAutoStim] = useState(false);
  const [nanoRepair, setNanoRepair] = useState(false);
  const [bioMonitor, setBioMonitor] = useState(true);

  const handlePainSuppressionToggle = () => {
    uiSfx.toggle();
    setPainSuppression(!painSuppression);
    addEntry('system', `Pain suppression ${!painSuppression ? 'activated' : 'deactivated'}`);
  };

  const handleAutoStimToggle = () => {
    uiSfx.toggle();
    setAutoStim(!autoStim);
    addEntry('system', `Auto-stimulant injection ${!autoStim ? 'enabled' : 'disabled'}`);
  };

  const handleNanoRepairToggle = () => {
    uiSfx.toggle();
    setNanoRepair(!nanoRepair);
    addEntry('system', `Nano-repair swarm ${!nanoRepair ? 'deployed' : 'recalled'}`);
  };

  const handleBioMonitorToggle = () => {
    uiSfx.toggle();
    setBioMonitor(!bioMonitor);
    addEntry('system', `Continuous bio-monitoring ${!bioMonitor ? 'enabled' : 'disabled'}`);
  };

  return (
    <div className="medical-interactive-panels">
      <LimbIntegrityPanel />
      <EmergencySosPanel />

      <HudPanel title="NEURAL INTERFACE STATUS" className="medical-readout-panel">
        <div className="medical-stat-row">
          <span className="medical-label">NEURAL STABILITY:</span>
          <span className={cn(
            "medical-value",
            neuralStability < 70 && "status-warning"
          )}>
            {neuralStability}%
          </span>
        </div>
        <div className="medical-stat-row">
          <span className="medical-label">COGNITIVE LOAD:</span>
          <span className={cn(
            "medical-value",
            cognitiveLoad > 70 && "status-warning"
          )}>
            {cognitiveLoad}%
          </span>
        </div>
        <div className="medical-stat-row">
          <span className="medical-label">SYNAPTIC RESPONSE:</span>
          <span className="medical-value">{Math.floor(Math.random() * 20) + 180}ms</span>
        </div>
        <div className="medical-stat-row">
          <span className="medical-label">BRAIN ACTIVITY:</span>
          <span className="medical-value">NOMINAL</span>
        </div>
        <div className="medical-stat-row">
          <span className="medical-label">DREAM SUPPRESSION:</span>
          <span className="medical-value">ACTIVE</span>
        </div>
      </HudPanel>

      <HudPanel title="ADVANCED MEDICAL SYSTEMS" className="medical-readout-panel">
        <div className="medical-control-row">
          <span className="medical-control-label">PAIN SUPPRESSION:</span>
          <HudSwitch
            checked={painSuppression}
            onCheckedChange={handlePainSuppressionToggle}
          />
        </div>
        <div className="medical-control-row">
          <span className="medical-control-label">AUTO-STIMULANT:</span>
          <HudSwitch
            checked={autoStim}
            onCheckedChange={handleAutoStimToggle}
          />
        </div>
        <div className="medical-control-row">
          <span className="medical-control-label">NANO-REPAIR SWARM:</span>
          <HudSwitch
            checked={nanoRepair}
            onCheckedChange={handleNanoRepairToggle}
          />
        </div>
        <div className="medical-control-row">
          <span className="medical-control-label">BIO-MONITORING:</span>
          <HudSwitch
            checked={bioMonitor}
            onCheckedChange={handleBioMonitorToggle}
          />
        </div>
      </HudPanel>

      <HudPanel title="METABOLIC ANALYSIS" className="medical-readout-panel">
        <div className="medical-stat-row">
          <span className="medical-label">GLUCOSE LEVEL:</span>
          <span className="medical-value">{Math.floor(Math.random() * 30) + 85} mg/dL</span>
        </div>
        <div className="medical-stat-row">
          <span className="medical-label">HYDRATION:</span>
          <span className={cn(
            "medical-value",
            stats.health < 50 && "status-warning"
          )}>
            {Math.max(60, stats.health + 5)}%
          </span>
        </div>
        <div className="medical-stat-row">
          <span className="medical-label">ELECTROLYTE BALANCE:</span>
          <span className="medical-value">OPTIMAL</span>
        </div>
        <div className="medical-stat-row">
          <span className="medical-label">CALORIC RESERVE:</span>
          <span className="medical-value">{Math.floor(Math.random() * 500) + 1500} kcal</span>
        </div>
        <div className="medical-stat-row">
          <span className="medical-label">FATIGUE INDEX:</span>
          <span className="medical-value">{Math.floor((100 - stats.health) / 5)}/10</span>
        </div>
      </HudPanel>

      <HudPanel title="IMMUNOLOGICAL STATUS" className="medical-readout-panel">
        <div className="medical-stat-row">
          <span className="medical-label">WHITE CELL COUNT:</span>
          <span className="medical-value">{(Math.random() * 2 + 6).toFixed(1)} K/µL</span>
        </div>
        <div className="medical-stat-row">
          <span className="medical-label">ANTIBODY RESPONSE:</span>
          <span className="medical-value">ACTIVE</span>
        </div>
        <div className="medical-stat-row">
          <span className="medical-label">INFECTION RISK:</span>
          <span className={cn(
            "medical-value",
            stats.armor < 50 && "status-warning"
          )}>
            {stats.armor < 50 ? 'ELEVATED' : 'LOW'}
          </span>
        </div>
        <div className="medical-stat-row">
          <span className="medical-label">VACCINE STATUS:</span>
          <span className="medical-value">CURRENT</span>
        </div>
        <div className="medical-stat-row">
          <span className="medical-label">PATHOGEN SCAN:</span>
          <span className="medical-value">CLEAR</span>
        </div>
      </HudPanel>

      <HudPanel title="ORGAN FUNCTION MONITOR" className="medical-readout-panel">
        <div className="medical-stat-row">
          <span className="medical-label">CARDIAC OUTPUT:</span>
          <span className="medical-value">{(Math.random() * 1.5 + 4.5).toFixed(1)} L/min</span>
        </div>
        <div className="medical-stat-row">
          <span className="medical-label">LUNG CAPACITY:</span>
          <span className="medical-value">{Math.max(75, stats.health)}%</span>
        </div>
        <div className="medical-stat-row">
          <span className="medical-label">LIVER FUNCTION:</span>
          <span className="medical-value">NOMINAL</span>
        </div>
        <div className="medical-stat-row">
          <span className="medical-label">KIDNEY FILTRATION:</span>
          <span className="medical-value">{Math.floor(Math.random() * 30) + 90} mL/min</span>
        </div>
        <div className="medical-stat-row">
          <span className="medical-label">DIGESTIVE STATUS:</span>
          <span className="medical-value">OPERATIONAL</span>
        </div>
      </HudPanel>
    </div>
  );
}
