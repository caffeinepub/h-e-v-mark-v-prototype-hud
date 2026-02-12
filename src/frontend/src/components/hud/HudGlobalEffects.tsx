import { useReducedMotion } from '../../hooks/useReducedMotion';

interface HudGlobalEffectsProps {
  isCriticalFlashing: boolean;
}

/**
 * Global HUD effects overlay component
 * Renders non-interactive visual effects (bloom, critical overlay, presence glow)
 */
export function HudGlobalEffects({ isCriticalFlashing }: HudGlobalEffectsProps) {
  const prefersReducedMotion = useReducedMotion();

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
    </>
  );
}
