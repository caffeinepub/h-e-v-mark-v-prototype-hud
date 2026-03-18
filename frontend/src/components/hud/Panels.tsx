import React from 'react';
import { useCountingAnimation } from '../../hooks/useCountingAnimation';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface StatPanelProps {
  label: string;
  value: number;
  max?: number;
  unit?: string;
  critical?: boolean;
  warning?: boolean;
  icon?: string;
  compact?: boolean;
}

export function StatPanel({ label, value, max = 100, unit = '', critical = false, warning = false, icon, compact = false }: StatPanelProps) {
  const prefersReduced = useReducedMotion();
  const animatedValue = useCountingAnimation(value);

  const barPercent = Math.min(100, Math.max(0, (value / max) * 100));

  const barColor = critical
    ? 'oklch(55% 0.22 25)'
    : warning
    ? 'oklch(75% 0.18 80)'
    : 'var(--faction-primary)';

  return (
    <div
      className="hud-panel"
      style={{
        borderColor: critical ? 'oklch(55% 0.22 25 / 0.8)' : warning ? 'oklch(75% 0.18 80 / 0.6)' : 'var(--faction-border)',
        animation: critical && !prefersReduced ? 'criticalPulse 1s ease-in-out infinite' : undefined,
        padding: compact ? '8px' : '12px',
      }}
    >
      <div className="hud-panel-header flex items-center gap-1">
        {icon && <span>{icon}</span>}
        <span>{label}</span>
      </div>

      <div className="flex items-end justify-between mb-1">
        <div
          className="hud-value"
          style={{
            fontSize: compact ? '1.6rem' : '2rem',
            color: barColor,
            animation: !prefersReduced ? 'numberTick 0.2s ease forwards' : undefined,
          }}
          key={animatedValue}
        >
          {animatedValue}
          {unit && <span style={{ fontSize: '0.7rem', marginLeft: '2px', color: 'var(--faction-dim)' }}>{unit}</span>}
        </div>
        <div className="hud-label">/ {max}</div>
      </div>

      <div className="hud-bar-track">
        <div
          className="hud-bar-fill"
          style={{
            width: `${barPercent}%`,
            background: `linear-gradient(90deg, var(--faction-secondary), ${barColor})`,
            animation: critical && !prefersReduced ? 'statPulse 2s ease-in-out infinite' : undefined,
          }}
        />
      </div>
    </div>
  );
}

interface MeterPanelProps {
  label: string;
  value: number;
  max?: number;
  unit?: string;
  critical?: boolean;
  warning?: boolean;
  showBar?: boolean;
  compact?: boolean;
}

export function MeterPanel({ label, value, max = 100, unit = '', critical = false, warning = false, showBar = true, compact = false }: MeterPanelProps) {
  const prefersReduced = useReducedMotion();
  const animatedValue = useCountingAnimation(value);
  const barPercent = Math.min(100, Math.max(0, (value / max) * 100));

  const barColor = critical
    ? 'oklch(55% 0.22 25)'
    : warning
    ? 'oklch(75% 0.18 80)'
    : 'var(--faction-primary)';

  return (
    <div
      className="hud-panel"
      style={{
        borderColor: critical ? 'oklch(55% 0.22 25 / 0.8)' : 'var(--faction-border)',
        animation: critical && !prefersReduced ? 'criticalPulse 1s ease-in-out infinite' : undefined,
        padding: compact ? '6px 8px' : '10px 12px',
      }}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="hud-label">{label}</span>
        <span
          className="hud-value"
          style={{ fontSize: '0.9rem', color: barColor }}
          key={animatedValue}
        >
          {animatedValue}{unit}
        </span>
      </div>
      {showBar && (
        <div className="hud-bar-track">
          <div
            className="hud-bar-fill"
            style={{
              width: `${barPercent}%`,
              background: `linear-gradient(90deg, var(--faction-secondary), ${barColor})`,
            }}
          />
        </div>
      )}
    </div>
  );
}

interface VitalsPanelProps {
  vitals: Array<{ label: string; value: string | number; unit?: string; critical?: boolean }>;
  title?: string;
}

export function VitalsPanel({ vitals, title }: VitalsPanelProps) {
  return (
    <div className="hud-panel">
      {title && <div className="hud-panel-header">{title}</div>}
      <div className="space-y-1">
        {vitals.map((v, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className="hud-label">{v.label}</span>
            <span
              style={{
                fontSize: '0.75rem',
                fontFamily: 'Orbitron, monospace',
                color: v.critical ? 'oklch(65% 0.25 25)' : 'var(--faction-accent)',
                textShadow: '0 0 4px var(--faction-glow)',
              }}
            >
              {v.value}{v.unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface HudPanelProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  critical?: boolean;
}

export function HudPanel({ title, children, className = '', critical = false }: HudPanelProps) {
  const prefersReduced = useReducedMotion();
  return (
    <div
      className={`hud-panel ${className}`}
      style={{
        borderColor: critical ? 'oklch(55% 0.22 25 / 0.8)' : 'var(--faction-border)',
        animation: critical && !prefersReduced ? 'criticalPulse 1s ease-in-out infinite' : undefined,
      }}
    >
      {title && <div className="hud-panel-header">{title}</div>}
      {children}
    </div>
  );
}
