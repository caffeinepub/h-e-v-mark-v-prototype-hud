import { useSuitStore } from '../../state/suitState';
import { useInfoSettingsStore } from '../../state/infoSettingsStore';
import { useLogStore } from '../../state/systemLog';
import { useMarkFeatures } from '../../hooks/useMarkFeatures';
import { HorizontalHazardPanel } from '../hazards/HorizontalHazardPanel';
import { Button } from '@/components/ui/button';
import { Maximize2, Heart, Shield, Zap, Crosshair, AlertTriangle } from 'lucide-react';
import { uiSfx } from '../../audio/uiSfx';
import { hevVoice } from '../../audio/hevVoice';

export function MinimalHudView() {
  const { stats } = useSuitStore();
  const { setDisplayMode } = useInfoSettingsStore();
  const { addEntry } = useLogStore();
  const markFeatures = useMarkFeatures();

  const handleRestoreStandard = () => {
    setDisplayMode('STANDARD');
    addEntry('system', 'DISPLAY MODE: STANDARD');
    uiSfx.toggle();
    hevVoice.displayModeChanged('STANDARD');
  };

  const isHealthCritical = stats.health < 30;
  const isArmorLow = stats.armor < 20;
  const isAuxLow = stats.aux < 20;

  return (
    <div className="minimal-hud-view">
      {/* Critical Warnings */}
      {(isHealthCritical || isArmorLow) && (
        <div className="minimal-critical-alert">
          <AlertTriangle className="w-6 h-6 animate-pulse" />
          <div className="text-sm font-bold">
            {isHealthCritical && 'CRITICAL HEALTH'}
            {isHealthCritical && isArmorLow && ' / '}
            {isArmorLow && 'LOW ARMOR'}
          </div>
        </div>
      )}

      {/* Core Stats */}
      <div className="minimal-stats-grid">
        {markFeatures.stats.health && (
          <div className={`minimal-stat-panel health-panel ${isHealthCritical ? 'stat-critical' : ''}`}>
            <Heart className="minimal-stat-icon" />
            <div className="minimal-stat-label">HEALTH</div>
            <div className="minimal-stat-value">{stats.health}</div>
            <div className="minimal-stat-bar">
              <div className="minimal-stat-bar-fill health-fill" style={{ width: `${stats.health}%` }} />
            </div>
          </div>
        )}

        {markFeatures.stats.armor && (
          <div className={`minimal-stat-panel armor-panel ${isArmorLow ? 'stat-warning' : ''}`}>
            <Shield className="minimal-stat-icon" />
            <div className="minimal-stat-label">ARMOR</div>
            <div className="minimal-stat-value">{stats.armor}</div>
            <div className="minimal-stat-bar">
              <div className="minimal-stat-bar-fill armor-fill" style={{ width: `${stats.armor}%` }} />
            </div>
          </div>
        )}

        {markFeatures.stats.ammo && (
          <div className="minimal-stat-panel ammo-panel">
            <Crosshair className="minimal-stat-icon" />
            <div className="minimal-stat-label">AMMO</div>
            <div className="minimal-stat-value">{stats.ammo}</div>
            <div className="minimal-stat-bar">
              <div className="minimal-stat-bar-fill ammo-fill" style={{ width: `${Math.min((stats.ammo / 999) * 100, 100)}%` }} />
            </div>
          </div>
        )}

        {markFeatures.stats.aux && (
          <div className={`minimal-stat-panel aux-panel ${isAuxLow ? 'stat-warning' : ''}`}>
            <Zap className="minimal-stat-icon" />
            <div className="minimal-stat-label">AUX / SPRINT</div>
            <div className="minimal-stat-value">{stats.aux}</div>
            <div className="minimal-stat-bar">
              <div className="minimal-stat-bar-fill aux-fill" style={{ width: `${stats.aux}%` }} />
            </div>
          </div>
        )}
      </div>

      {/* Horizontal Hazard Panel - Mark II+ */}
      {markFeatures.panels.hazards && (
        <div className="minimal-hazard-section">
          <HorizontalHazardPanel />
        </div>
      )}

      {/* Restore Button */}
      <div className="minimal-restore-control">
        <Button onClick={handleRestoreStandard} variant="outline" size="lg" className="minimal-restore-button">
          <Maximize2 className="mr-2 h-5 w-5" />
          RESTORE FULL HUD
        </Button>
      </div>
    </div>
  );
}
