import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useInfoSettingsStore } from '@/state/infoSettingsStore';

interface HudGlobalEffectsProps {
  isCriticalFlashing: boolean;
}

/**
 * Global HUD effects overlay component
 * Renders non-interactive visual effects (bloom, critical overlay, presence glow, scan-lines for HL1 mode)
 */
export function HudGlobalEffects({ isCriticalFlashing }: HudGlobalEffectsProps) {
  const prefersReducedMotion = useReducedMotion();
  const { hudStyleMode } = useInfoSettingsStore();

  return (
    <>
      {/* Bloom overlay - subtle ambient glow */}
      <div 
        className="hud-bloom-overlay"
        style={{
          opacity: prefersReducedMotion ? 0.05 : undefined,
        }}
      />

      {/* Critical overlay - intensifies during critical state */}
      <div 
        className={`hud-critical-overlay ${isCriticalFlashing ? 'hud-critical-active' : ''}`}
        style={{
          opacity: prefersReducedMotion && isCriticalFlashing ? 0.3 : undefined,
        }}
      />

      {/* Presence glow - reactive to pointer/touch */}
      {!prefersReducedMotion && (
        <div className="hud-presence-glow" />
      )}

      {/* HL1 scan-line effect */}
      {hudStyleMode === 'hl1' && !prefersReducedMotion && (
        <div className="hud-hl1-scanlines" />
      )}
    </>
  );
}
