import React from 'react';
import { useHazardsStore } from '../../state/hazardsState';
import { GLYPHS } from '../../lib/glyphs';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const THRESHOLD = 75;

interface HazardIconProps {
  symbol: string;
  label: string;
  level: number;
  active: boolean;
  reduced: boolean;
}

function HazardIcon({ symbol, label, level, active, reduced }: HazardIconProps) {
  if (!active) return null;
  return (
    <div
      title={`${label}: ${level}%`}
      className={reduced ? '' : 'hazard-icon-active'}
      style={{
        color: 'var(--faction-accent)',
        fontSize: '1rem',
        textShadow: '0 0 8px var(--faction-glow)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1px',
      }}
    >
      <span>{symbol}</span>
      <span style={{ fontSize: '0.45rem', color: 'var(--faction-primary)', letterSpacing: '0.05em' }}>
        {level}%
      </span>
    </div>
  );
}

export function HazardWarningIcons() {
  const { levels } = useHazardsStore();
  const { fire, bio, radiation, electrical, gas } = levels;
  const prefersReduced = useReducedMotion();

  const anyActive = fire > THRESHOLD || bio > THRESHOLD || radiation > THRESHOLD || electrical > THRESHOLD || gas > THRESHOLD;

  if (!anyActive) return null;

  return (
    <div
      aria-label="Active hazard warnings"
      style={{
        position: 'fixed',
        top: '48px',
        right: '8px',
        zIndex: 9990,
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        padding: '6px',
        background: 'oklch(2% 0 0 / 0.9)',
        border: '1px solid var(--faction-border)',
        boxShadow: '0 0 8px var(--faction-glow)',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          fontSize: '0.45rem',
          color: 'var(--faction-primary)',
          letterSpacing: '0.1em',
          textAlign: 'center',
          marginBottom: '2px',
        }}
      >
        HAZARD
      </div>
      <HazardIcon symbol={GLYPHS.fire} label="FIRE" level={fire} active={fire > THRESHOLD} reduced={prefersReduced} />
      <HazardIcon symbol={GLYPHS.bio} label="BIO" level={bio} active={bio > THRESHOLD} reduced={prefersReduced} />
      <HazardIcon symbol={GLYPHS.radiation} label="RAD" level={radiation} active={radiation > THRESHOLD} reduced={prefersReduced} />
      <HazardIcon symbol={GLYPHS.electrical} label="ELEC" level={electrical} active={electrical > THRESHOLD} reduced={prefersReduced} />
      <HazardIcon symbol={GLYPHS.gas} label="GAS" level={gas} active={gas > THRESHOLD} reduced={prefersReduced} />
    </div>
  );
}
