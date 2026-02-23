import { useSuitStore } from '../state/suitState';
import { useHazardsStore } from '../state/hazardsState';
import { useMarkFeatures } from '../hooks/useMarkFeatures';
import { useMarkGlitchEffects } from '../hooks/useMarkGlitchEffects';
import { StatPanel, MeterPanel } from '../components/hud/Panels';
import { EnvironmentalHazardsPanel } from '../components/hazards/EnvironmentalHazardsPanel';
import { CriticalStatAlert } from '../components/hud/CriticalStatAlert';
import { LowAmmoWarning } from '../components/hud/LowAmmoWarning';
import { Heart, Shield, Zap, Crosshair, AlertTriangle } from 'lucide-react';
import { hevVoice } from '../audio/hevVoice';
import { useEffect, useRef, useState } from 'react';

export function BasicsTab() {
  const { stats } = useSuitStore();
  const markFeatures = useMarkFeatures();
  const glitchEffects = useMarkGlitchEffects();
  const prevStatsRef = useRef(stats);
  
  // Delayed stat values for Mark I
  const [displayStats, setDisplayStats] = useState(stats);

  // Apply delay for Mark I
  useEffect(() => {
    if (glitchEffects.delayMs > 0) {
      const timeout = setTimeout(() => {
        setDisplayStats(stats);
      }, glitchEffects.delayMs);
      return () => clearTimeout(timeout);
    } else {
      setDisplayStats(stats);
    }
  }, [stats, glitchEffects.delayMs]);

  // Voice warnings for critical thresholds
  useEffect(() => {
    const prevStats = prevStatsRef.current;

    if (stats.health < 30 && prevStats.health >= 30) {
      hevVoice.healthCritical();
    }

    if (stats.armor < 20 && prevStats.armor >= 20) {
      hevVoice.armorLow();
    }

    if (stats.ammo < 20 && prevStats.ammo >= 20) {
      hevVoice.ammoLow();
    }

    if (stats.aux < 20 && prevStats.aux >= 20) {
      hevVoice.healthCritical();
    }

    prevStatsRef.current = stats;
  }, [stats]);

  const isHealthCritical = displayStats.health < 30;
  const isArmorLow = displayStats.armor < 20;
  const isAmmoLow = displayStats.ammo < 20;
  const isAuxLow = displayStats.aux < 20;

  // Apply glitch effects to class names
  const glitchClass = glitchEffects.isFlickering ? 'mark-i-flicker' : '';
  const hideClass = glitchEffects.isElementHidden ? 'mark-i-hidden' : '';

  return (
    <div className="tab-content-compact">
      <div className={`basics-grid-compact ${glitchClass}`}>
        {/* Health - Always visible */}
        {markFeatures.stats.health && (
          <CriticalStatAlert isActive={isHealthCritical} color="red">
            <div className={hideClass}>
              <MeterPanel
                label="HEALTH"
                value={displayStats.health}
                max={100}
                unit="%"
              />
            </div>
          </CriticalStatAlert>
        )}

        {/* Armor - Mark II+ */}
        {markFeatures.stats.armor && (
          <CriticalStatAlert isActive={isArmorLow} color="orange">
            <div className={hideClass}>
              <MeterPanel
                label="ARMOR"
                value={displayStats.armor}
                max={100}
                unit="%"
              />
            </div>
          </CriticalStatAlert>
        )}

        {/* Aux Power - Mark III+ */}
        {markFeatures.stats.aux && (
          <CriticalStatAlert isActive={isAuxLow} color="orange">
            <div className={hideClass}>
              <MeterPanel
                label="AUX POWER"
                value={displayStats.aux}
                max={100}
                unit="%"
              />
            </div>
          </CriticalStatAlert>
        )}

        {/* Ammo - Mark IV+ */}
        {markFeatures.stats.ammo && (
          <div className={`relative ${hideClass}`}>
            <StatPanel
              label="AMMO"
              value={displayStats.ammo}
              unit=""
            />
            {isAmmoLow && <LowAmmoWarning isLow={true} />}
          </div>
        )}
      </div>

      {/* Environmental Hazards - Mark II+ */}
      {markFeatures.panels.hazards && (
        <div className={`mt-4 ${glitchClass} ${hideClass}`}>
          <EnvironmentalHazardsPanel />
        </div>
      )}

      {/* Low Power Warning - Mark III+ */}
      {markFeatures.stats.aux && isAuxLow && (
        <div className={`mt-4 hud-panel-compact ${glitchClass}`}>
          <div className="flex items-center gap-2 text-warning">
            <AlertTriangle className="w-5 h-5" />
            <div>
              <div className="font-bold text-sm">AUXILIARY POWER LOW</div>
              <div className="text-xs opacity-80">Sprint capability reduced. Recharge required.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
