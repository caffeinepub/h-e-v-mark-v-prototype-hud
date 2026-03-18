import React, { useState, useEffect } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface MorphineState {
  dose: number;
  cooldownRemaining: number;
  lastAdminTime: number | null;
}

const COOLDOWN_SECONDS = 60;

export function MorphineDoseModule() {
  const prefersReduced = useReducedMotion();
  const [state, setState] = useState<MorphineState>({
    dose: 0,
    cooldownRemaining: 0,
    lastAdminTime: null,
  });

  // Countdown timer
  useEffect(() => {
    if (state.cooldownRemaining <= 0) return;
    const timer = setInterval(() => {
      setState(prev => ({
        ...prev,
        cooldownRemaining: Math.max(0, prev.cooldownRemaining - 1),
        dose: prev.cooldownRemaining > 1 ? Math.max(0, prev.dose - (100 / COOLDOWN_SECONDS)) : 0,
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, [state.cooldownRemaining]);

  const administer = () => {
    if (state.cooldownRemaining > 0) return;
    setState({
      dose: 100,
      cooldownRemaining: COOLDOWN_SECONDS,
      lastAdminTime: Date.now(),
    });
  };

  const isReady = state.cooldownRemaining === 0;
  const isCritical = state.dose > 80;

  return (
    <div className="hud-panel">
      <div className="hud-panel-header">MORPHINE DOSE INDICATOR</div>

      <div className="flex items-end justify-between mb-2">
        <div>
          <div className="hud-value" style={{ fontSize: '1.2rem' }}>
            {Math.round(state.dose)}
            <span style={{ fontSize: '0.6rem', marginLeft: '4px', color: 'var(--faction-dim)' }}>%</span>
          </div>
          <div className="hud-label">CURRENT DOSE</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          {isReady ? (
            <div style={{ color: 'var(--faction-accent)', fontSize: '0.6rem', letterSpacing: '0.1em' }}>
              ● READY
            </div>
          ) : (
            <div
              style={{
                color: 'oklch(75% 0.18 80)',
                fontSize: '0.6rem',
                letterSpacing: '0.1em',
                animation: !prefersReduced ? 'warningFlash 1s ease-in-out infinite' : undefined,
              }}
            >
              ⏱ {state.cooldownRemaining}s
            </div>
          )}
          <div className="hud-label">STATUS</div>
        </div>
      </div>

      <div className="hud-bar-track mb-2">
        <div
          className="hud-bar-fill"
          style={{
            width: `${state.dose}%`,
            background: isCritical
              ? 'linear-gradient(90deg, oklch(45% 0.18 25), oklch(55% 0.22 25))'
              : 'linear-gradient(90deg, var(--faction-secondary), var(--faction-primary))',
          }}
        />
      </div>

      <button
        onClick={administer}
        disabled={!isReady}
        style={{
          width: '100%',
          padding: '5px',
          background: isReady ? 'var(--faction-muted)' : 'oklch(4% 0 0)',
          border: `1px solid ${isReady ? 'var(--faction-primary)' : 'var(--faction-border)'}`,
          color: isReady ? 'var(--faction-accent)' : 'var(--faction-dim)',
          fontFamily: 'Share Tech Mono, monospace',
          fontSize: '0.6rem',
          letterSpacing: '0.1em',
          cursor: isReady ? 'pointer' : 'not-allowed',
          textTransform: 'uppercase',
          boxShadow: isReady ? '0 0 4px var(--faction-glow)' : 'none',
        }}
      >
        {isReady ? 'ADMINISTER MORPHINE' : `COOLDOWN: ${state.cooldownRemaining}s`}
      </button>

      {state.lastAdminTime && (
        <div className="hud-label mt-1" style={{ textAlign: 'center' }}>
          LAST ADMIN: {new Date(state.lastAdminTime).toLocaleTimeString('en-US', { hour12: false })}
        </div>
      )}
    </div>
  );
}
