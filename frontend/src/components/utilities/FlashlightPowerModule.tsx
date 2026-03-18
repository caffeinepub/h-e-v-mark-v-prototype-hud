import React, { useEffect, useRef, useState } from 'react';
import { useSuitStore } from '../../state/suitState';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function FlashlightPowerModule() {
  const { modules } = useSuitStore();
  const prefersReduced = useReducedMotion();
  const [power, setPower] = useState(100);
  const [displayPower, setDisplayPower] = useState(100);
  const animRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const flashlightOn = modules?.flashlight ?? false;

  // Deplete/recharge
  useEffect(() => {
    if (flashlightOn) {
      const timer = setInterval(() => {
        setPower(prev => Math.max(0, prev - 1));
      }, 300);
      return () => clearInterval(timer);
    } else {
      const timer = setInterval(() => {
        setPower(prev => Math.min(100, prev + 2));
      }, 200);
      return () => clearInterval(timer);
    }
  }, [flashlightOn]);

  // Animate display
  useEffect(() => {
    if (prefersReduced) { setDisplayPower(power); return; }
    const start = displayPower;
    const end = power;
    const duration = 300;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setDisplayPower(Math.round(start + (end - start) * progress));
      if (progress < 1) animRef.current = setTimeout(animate, 16);
    };
    animate();
    return () => { if (animRef.current) clearTimeout(animRef.current); };
  }, [power]);

  const isCritical = displayPower < 20;
  const isWarning = displayPower < 40;

  const barColor = isCritical
    ? 'oklch(55% 0.22 25)'
    : isWarning
    ? 'oklch(75% 0.18 80)'
    : 'var(--faction-primary)';

  return (
    <div
      className="hud-panel"
      style={{
        borderColor: flashlightOn ? 'var(--faction-primary)' : 'var(--faction-border)',
        boxShadow: flashlightOn ? '0 0 8px var(--faction-glow)' : undefined,
      }}
    >
      <div className="hud-panel-header flex items-center justify-between">
        <span>FLASHLIGHT POWER</span>
        <span
          style={{
            fontSize: '0.55rem',
            color: flashlightOn ? 'var(--faction-accent)' : 'var(--faction-dim)',
            animation: flashlightOn && !prefersReduced ? 'warningFlash 2s ease-in-out infinite' : undefined,
          }}
        >
          {flashlightOn ? '● ACTIVE' : '○ STANDBY'}
        </span>
      </div>

      <div className="flex items-end justify-between mb-2">
        <div>
          <div className="hud-value" style={{ fontSize: '1.4rem', color: barColor }}>
            {displayPower}
            <span style={{ fontSize: '0.6rem', marginLeft: '4px', color: 'var(--faction-dim)' }}>%</span>
          </div>
          <div className="hud-label">CHARGE LEVEL</div>
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
            {isCritical ? '⚠ LOW BATTERY' : isWarning ? '⚠ DRAINING' : flashlightOn ? 'DISCHARGING' : 'CHARGING'}
          </div>
          <div className="hud-label">POWER STATUS</div>
        </div>
      </div>

      <div className="hud-bar-track">
        <div
          className="hud-bar-fill"
          style={{
            width: `${displayPower}%`,
            background: `linear-gradient(90deg, var(--faction-secondary), ${barColor})`,
          }}
        />
      </div>
    </div>
  );
}
