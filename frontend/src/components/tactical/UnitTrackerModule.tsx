import React, { useState, useEffect } from 'react';
import { useTacticalStore } from '../../state/tacticalState';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function UnitTrackerModule() {
  const { threatLevel } = useTacticalStore();
  const prefersReduced = useReducedMotion();

  // Simulate hostile/friendly counts based on threat level
  const [hostileCount, setHostileCount] = useState(0);
  const [friendlyCount, setFriendlyCount] = useState(3);

  useEffect(() => {
    const baseHostile =
      threatLevel > 75 ? 8 :
      threatLevel > 50 ? 5 :
      threatLevel > 25 ? 2 :
      0;
    setHostileCount(baseHostile + Math.floor(Math.random() * 2));
    setFriendlyCount(3 + Math.floor(Math.random() * 3));
  }, [threatLevel]);

  const hasHostiles = hostileCount > 0;

  return (
    <div className="hud-panel">
      <div className="hud-panel-header">UNIT TRACKER</div>

      <div className="grid grid-cols-2 gap-3">
        {/* Hostile contacts */}
        <div
          style={{
            padding: '8px',
            background: hasHostiles ? 'oklch(4% 0.02 25)' : 'oklch(3% 0 0)',
            border: `1px solid ${hasHostiles ? 'oklch(55% 0.22 25 / 0.6)' : 'var(--faction-border)'}`,
          }}
        >
          <div
            style={{
              fontSize: '1.6rem',
              fontFamily: 'Orbitron, monospace',
              fontWeight: 700,
              color: hasHostiles ? 'oklch(65% 0.25 25)' : 'var(--faction-dim)',
              textAlign: 'center',
              animation: hasHostiles && !prefersReduced ? 'warningFlash 1s ease-in-out infinite' : undefined,
              textShadow: hasHostiles ? '0 0 8px oklch(55% 0.22 25 / 0.8)' : 'none',
            }}
          >
            {hostileCount}
          </div>
          <div
            style={{
              fontSize: '0.5rem',
              color: hasHostiles ? 'oklch(55% 0.22 25)' : 'var(--faction-dim)',
              letterSpacing: '0.1em',
              textAlign: 'center',
              textTransform: 'uppercase',
            }}
          >
            HOSTILE CONTACTS
          </div>
        </div>

        {/* Friendly units */}
        <div
          style={{
            padding: '8px',
            background: 'oklch(3% 0 0)',
            border: '1px solid var(--faction-border)',
          }}
        >
          <div
            style={{
              fontSize: '1.6rem',
              fontFamily: 'Orbitron, monospace',
              fontWeight: 700,
              color: 'var(--faction-accent)',
              textAlign: 'center',
              textShadow: '0 0 6px var(--faction-glow)',
            }}
          >
            {friendlyCount}
          </div>
          <div
            style={{
              fontSize: '0.5rem',
              color: 'var(--faction-dim)',
              letterSpacing: '0.1em',
              textAlign: 'center',
              textTransform: 'uppercase',
            }}
          >
            FRIENDLY UNITS
          </div>
        </div>
      </div>

      {hasHostiles && (
        <div
          style={{
            marginTop: '6px',
            padding: '4px 8px',
            background: 'oklch(4% 0.02 25)',
            border: '1px solid oklch(55% 0.22 25 / 0.4)',
            fontSize: '0.55rem',
            color: 'oklch(65% 0.22 25)',
            letterSpacing: '0.1em',
            textAlign: 'center',
            animation: !prefersReduced ? 'warningFlash 1.5s ease-in-out infinite' : undefined,
          }}
        >
          ⚠ HOSTILE CONTACTS DETECTED
        </div>
      )}
    </div>
  );
}
