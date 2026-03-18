import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function OxygenLevelModule() {
  const prefersReduced = useReducedMotion();
  const [oxygenLevel, setOxygenLevel] = useState(100);
  const [depleting, setDepleting] = useState(false);
  const [displayValue, setDisplayValue] = useState(100);
  const animRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Animate value changes
  useEffect(() => {
    if (prefersReduced) {
      setDisplayValue(oxygenLevel);
      return;
    }
    const start = displayValue;
    const end = oxygenLevel;
    const duration = 400;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setDisplayValue(Math.round(start + (end - start) * progress));
      if (progress < 1) animRef.current = setTimeout(animate, 16);
    };
    animate();
    return () => { if (animRef.current) clearTimeout(animRef.current); };
  }, [oxygenLevel]);

  // Simulate depletion when depleting is active
  useEffect(() => {
    if (!depleting) return;
    const timer = setInterval(() => {
      setOxygenLevel(prev => {
        if (prev <= 0) { setDepleting(false); return 0; }
        return Math.max(0, prev - 2);
      });
    }, 500);
    return () => clearInterval(timer);
  }, [depleting]);

  // Refill when not depleting
  useEffect(() => {
    if (depleting) return;
    if (oxygenLevel >= 100) return;
    const timer = setInterval(() => {
      setOxygenLevel(prev => Math.min(100, prev + 3));
    }, 300);
    return () => clearInterval(timer);
  }, [depleting, oxygenLevel]);

  const isCritical = displayValue < 20;
  const isWarning = displayValue < 40;

  const barColor = isCritical
    ? 'oklch(55% 0.22 25)'
    : isWarning
    ? 'oklch(75% 0.18 80)'
    : 'var(--faction-primary)';

  return (
    <div
      className="hud-panel"
      style={{
        borderColor: isCritical ? 'oklch(55% 0.22 25 / 0.8)' : 'var(--faction-border)',
        animation: isCritical && !prefersReduced ? 'criticalPulse 1s ease-in-out infinite' : undefined,
      }}
    >
      <div className="hud-panel-header">OXYGEN / REBREATHER</div>

      <div className="flex items-end justify-between mb-2">
        <div>
          <div className="hud-value" style={{ fontSize: '1.4rem', color: barColor }}>
            {displayValue}
            <span style={{ fontSize: '0.6rem', marginLeft: '4px', color: 'var(--faction-dim)' }}>%</span>
          </div>
          <div className="hud-label">O₂ SATURATION</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div
            style={{
              fontSize: '0.6rem',
              color: isCritical ? 'oklch(55% 0.22 25)' : isWarning ? 'oklch(75% 0.18 80)' : 'var(--faction-dim)',
              letterSpacing: '0.1em',
              animation: isCritical && !prefersReduced ? 'warningFlash 1s ease-in-out infinite' : undefined,
            }}
          >
            {isCritical ? '⚠ CRITICAL' : isWarning ? '⚠ LOW' : 'NOMINAL'}
          </div>
          <div className="hud-label">STATUS</div>
        </div>
      </div>

      <div className="hud-bar-track mb-2">
        <div
          className="hud-bar-fill"
          style={{
            width: `${displayValue}%`,
            background: `linear-gradient(90deg, var(--faction-secondary), ${barColor})`,
          }}
        />
      </div>

      <button
        onClick={() => setDepleting(d => !d)}
        style={{
          width: '100%',
          padding: '5px',
          background: depleting ? 'oklch(4% 0 0)' : 'var(--faction-muted)',
          border: `1px solid ${depleting ? 'oklch(55% 0.22 25 / 0.6)' : 'var(--faction-primary)'}`,
          color: depleting ? 'oklch(65% 0.22 25)' : 'var(--faction-accent)',
          fontFamily: 'Share Tech Mono, monospace',
          fontSize: '0.6rem',
          letterSpacing: '0.1em',
          cursor: 'pointer',
          textTransform: 'uppercase',
        }}
      >
        {depleting ? 'DEACTIVATE REBREATHER' : 'ACTIVATE REBREATHER'}
      </button>
    </div>
  );
}
