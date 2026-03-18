import React, { useEffect, useRef, useState } from 'react';
import { useHazardsStore } from '../../state/hazardsState';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function GeigerCounterModule() {
  const { levels } = useHazardsStore();
  const radiation = levels.radiation;
  const prefersReduced = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(radiation);
  const [ticking, setTicking] = useState(false);
  const animRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Animate value changes
  useEffect(() => {
    if (prefersReduced) {
      setDisplayValue(radiation);
      return;
    }
    const start = displayValue;
    const end = radiation;
    const duration = 500;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.round(start + (end - start) * progress);
      setDisplayValue(current);
      if (progress < 1) {
        animRef.current = setTimeout(animate, 16);
      }
    };
    animate();
    return () => { if (animRef.current) clearTimeout(animRef.current); };
  }, [radiation]);

  // Geiger ticking effect
  useEffect(() => {
    if (prefersReduced || radiation < 10) return;
    const interval = Math.max(200, 2000 - radiation * 18);
    const timer = setInterval(() => {
      setTicking(true);
      setTimeout(() => setTicking(false), 80);
    }, interval);
    return () => clearInterval(timer);
  }, [radiation, prefersReduced]);

  const isCritical = radiation > 75;
  const isWarning = radiation > 50;

  const barColor = isCritical
    ? 'oklch(55% 0.22 25)'
    : isWarning
    ? 'oklch(75% 0.18 80)'
    : 'var(--faction-primary)';

  const uSvH = (radiation * 0.5).toFixed(2);

  return (
    <div
      className="hud-panel"
      style={{
        borderColor: isCritical ? 'oklch(55% 0.22 25 / 0.8)' : 'var(--faction-border)',
        animation: isCritical && !prefersReduced ? 'criticalPulse 1s ease-in-out infinite' : undefined,
      }}
    >
      <div className="hud-panel-header flex items-center justify-between">
        <span>GEIGER COUNTER</span>
        {ticking && (
          <span style={{ color: 'var(--faction-accent)', fontSize: '0.55rem' }}>◆ TICK</span>
        )}
      </div>

      <div className="flex items-end justify-between mb-2">
        <div>
          <div
            className="hud-value"
            style={{ fontSize: '1.4rem', color: barColor }}
          >
            {displayValue}
            <span style={{ fontSize: '0.6rem', marginLeft: '4px', color: 'var(--faction-dim)' }}>%</span>
          </div>
          <div className="hud-label">{uSvH} μSv/h</div>
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
            {isCritical ? '⚠ CRITICAL' : isWarning ? '⚠ ELEVATED' : 'BACKGROUND'}
          </div>
          <div className="hud-label">RADIATION</div>
        </div>
      </div>

      <div className="hud-bar-track">
        <div
          className="hud-bar-fill"
          style={{
            width: `${displayValue}%`,
            background: `linear-gradient(90deg, var(--faction-secondary), ${barColor})`,
          }}
        />
      </div>

      <div className="flex justify-between mt-1">
        <span style={{ fontSize: '0.5rem', color: 'var(--faction-dim)' }}>0</span>
        <span style={{ fontSize: '0.5rem', color: 'var(--faction-dim)' }}>SAFE &lt;50</span>
        <span style={{ fontSize: '0.5rem', color: 'var(--faction-dim)' }}>100</span>
      </div>
    </div>
  );
}
