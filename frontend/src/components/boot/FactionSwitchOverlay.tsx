import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface FactionSwitchOverlayProps {
  targetFaction: string;
  onComplete: () => void;
}

const FACTION_LABELS: Record<string, string> = {
  hev: 'H.E.V SUIT',
  hecu: 'HECU MARINES',
  guard: 'BLACK MESA SECURITY',
  resistance: 'COMBINE OVERWATCH',
};

const FACTION_LOGOS: Record<string, string> = {
  hev: '/assets/generated/hev-logo.dim_256x256.png',
  hecu: '/assets/generated/hecu-logo.dim_256x256.png',
  guard: '/assets/generated/security-logo.dim_256x256.png',
  resistance: '/assets/generated/combine-logo.dim_256x256.png',
};

const FACTION_CLASSES: Record<string, string> = {
  hev: 'faction-hev',
  hecu: 'faction-hecu',
  guard: 'faction-guard',
  resistance: 'faction-resistance',
};

export function FactionSwitchOverlay({ targetFaction, onComplete }: FactionSwitchOverlayProps) {
  const prefersReduced = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const duration = prefersReduced ? 300 : 1500;

  useEffect(() => {
    timerRef.current = setTimeout(onComplete, duration);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [duration, onComplete]);

  const factionClass = FACTION_CLASSES[targetFaction] || 'faction-hev';
  const label = FACTION_LABELS[targetFaction] || targetFaction.toUpperCase();
  const logo = FACTION_LOGOS[targetFaction];

  return (
    <div
      className={`faction-switch-overlay ${factionClass}`}
      style={{ background: '#000000' }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          animation: prefersReduced ? undefined : 'lambdaReveal 0.5s ease forwards',
        }}
      >
        {logo && (
          <img
            src={logo}
            alt={label}
            style={{
              width: '80px',
              height: '80px',
              opacity: 0.9,
              filter: 'sepia(1) saturate(3)',
            }}
          />
        )}
        <div
          style={{
            fontFamily: 'Orbitron, monospace',
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            color: 'var(--faction-primary)',
            textShadow: '0 0 12px var(--faction-glow)',
          }}
        >
          SWITCHING TO
        </div>
        <div
          style={{
            fontFamily: 'Orbitron, monospace',
            fontSize: '1rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            color: 'var(--faction-accent)',
            textShadow: '0 0 16px var(--faction-glow)',
          }}
        >
          {label}
        </div>

        {/* Progress bar */}
        <div
          style={{
            width: '200px',
            height: '3px',
            background: 'oklch(4% 0 0)',
            border: '1px solid var(--faction-border)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, var(--faction-secondary), var(--faction-primary))',
              boxShadow: '0 0 6px var(--faction-glow)',
              animation: prefersReduced ? undefined : `progressFill ${duration}ms linear forwards`,
              width: prefersReduced ? '100%' : '0%',
            }}
          />
        </div>

        <div
          style={{
            fontSize: '0.55rem',
            color: 'var(--faction-dim)',
            letterSpacing: '0.15em',
            animation: prefersReduced ? undefined : 'warningFlash 0.5s ease-in-out infinite',
          }}
        >
          LOADING FACTION DATA...
        </div>
      </div>
    </div>
  );
}
