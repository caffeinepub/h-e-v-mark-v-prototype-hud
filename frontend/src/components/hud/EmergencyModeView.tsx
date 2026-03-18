import { useSuitStore } from '../../state/suitState';
import { useHazardsStore } from '../../state/hazardsState';
import { useInfoSettingsStore } from '../../state/infoSettingsStore';
import { useLogStore } from '../../state/systemLog';
import { useMarkFeatures } from '../../hooks/useMarkFeatures';
import { EnvironmentalHazardsPanel } from '../hazards/EnvironmentalHazardsPanel';
import { EmergencySosPanel } from '../medical/panels/EmergencySosPanel';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Heart, Shield, X } from 'lucide-react';
import { uiSfx } from '../../audio/uiSfx';
import { hevVoice } from '../../audio/hevVoice';
import { HudSwitch } from '../common/HudSwitch';

export function EmergencyModeView() {
  const { stats, modules, toggleModule } = useSuitStore();
  const { getAggregateHazard } = useHazardsStore();
  const { toggleEmergencyMode, systemStyle } = useInfoSettingsStore();
  const { addEntry } = useLogStore();
  const markFeatures = useMarkFeatures();

  const handleExitEmergency = () => {
    toggleEmergencyMode();
    addEntry('system', 'EMERGENCY MODE: DEACTIVATED');
    uiSfx.toggle();
    hevVoice.displayModeChanged('STANDARD');
  };

  const handleTogglePainSuppression = () => {
    if (markFeatures.modules.advancedMedical) {
      toggleModule('advancedMedical');
      addEntry('medical', `Pain suppression ${!modules.advancedMedical ? 'ENABLED' : 'DISABLED'}`);
      uiSfx.toggle();
    }
  };

  const handleToggleAutoStimulant = () => {
    if (markFeatures.modules.defibrillator) {
      toggleModule('defibrillator');
      addEntry('medical', `Auto-stimulant ${!modules.defibrillator ? 'ENABLED' : 'DISABLED'}`);
      uiSfx.toggle();
    }
  };

  const aggregateHazard = getAggregateHazard();
  const isCritical = stats.health < 30 || aggregateHazard > 70;

  const getEmergencyTitle = () => {
    switch (systemStyle) {
      case 'hecu':
        return 'COMBAT ALERT';
      case 'security':
        return 'SECURITY EMERGENCY';
      default:
        return 'EMERGENCY MODE';
    }
  };

  return (
    <div className="emergency-mode-container">
      <div className="emergency-header">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-8 h-8 text-destructive animate-pulse" />
          <div>
            <h1 className="text-2xl font-bold text-destructive tracking-tactical">{getEmergencyTitle()}</h1>
            <p className="text-xs opacity-70">Essential vitals and emergency controls only</p>
          </div>
        </div>
        <Button onClick={handleExitEmergency} variant="outline" size="lg" className="emergency-exit-button">
          <X className="mr-2 h-5 w-5" />
          EXIT EMERGENCY MODE
        </Button>
      </div>

      <div className="emergency-content">
        {/* Critical Status Alert */}
        {isCritical && (
          <div className="emergency-alert critical-alert">
            <AlertTriangle className="w-6 h-6" />
            <div>
              <div className="font-bold">CRITICAL STATUS DETECTED</div>
              <div className="text-xs opacity-80">Immediate medical attention required</div>
            </div>
          </div>
        )}

        {/* Essential Vitals */}
        <div className="emergency-vitals-grid">
          {markFeatures.stats.health && (
            <div className="emergency-vital-panel health-panel">
              <div className="emergency-vital-header">
                <Heart className="w-6 h-6" />
                <span className="emergency-vital-label">HEALTH</span>
              </div>
              <div className="emergency-vital-value">{stats.health}</div>
              <div className="emergency-vital-bar">
                <div className="emergency-vital-bar-fill health-fill" style={{ width: `${stats.health}%` }} />
              </div>
              <div className="emergency-vital-status">{stats.health < 30 ? 'CRITICAL' : stats.health < 60 ? 'LOW' : 'STABLE'}</div>
            </div>
          )}

          {markFeatures.stats.armor && (
            <div className="emergency-vital-panel armor-panel">
              <div className="emergency-vital-header">
                <Shield className="w-6 h-6" />
                <span className="emergency-vital-label">ARMOR</span>
              </div>
              <div className="emergency-vital-value">{stats.armor}</div>
              <div className="emergency-vital-bar">
                <div className="emergency-vital-bar-fill armor-fill" style={{ width: `${stats.armor}%` }} />
              </div>
              <div className="emergency-vital-status">{stats.armor < 20 ? 'CRITICAL' : stats.armor < 50 ? 'LOW' : 'STABLE'}</div>
            </div>
          )}
        </div>

        {/* Environmental Hazards - Mark II+ */}
        {markFeatures.panels.hazards && (
          <div className="emergency-section">
            <h3 className="emergency-section-title">ENVIRONMENTAL HAZARDS</h3>
            <EnvironmentalHazardsPanel />
          </div>
        )}

        {/* Emergency Medical Controls - Mark V only */}
        {markFeatures.modules.advancedMedical && markFeatures.modules.defibrillator && (
          <div className="emergency-section">
            <h3 className="emergency-section-title">EMERGENCY MEDICAL</h3>
            <div className="emergency-controls-grid">
              <div className="emergency-control-item">
                <div className="emergency-control-label">Pain Suppression</div>
                <HudSwitch checked={modules.advancedMedical} onCheckedChange={handleTogglePainSuppression} />
              </div>
              <div className="emergency-control-item">
                <div className="emergency-control-label">Auto-Stimulant</div>
                <HudSwitch checked={modules.defibrillator} onCheckedChange={handleToggleAutoStimulant} />
              </div>
            </div>
          </div>
        )}

        {/* Emergency SOS - Mark IV+ */}
        {markFeatures.advanced.bioMonitoring && (
          <div className="emergency-section">
            <EmergencySosPanel />
          </div>
        )}
      </div>
    </div>
  );
}
