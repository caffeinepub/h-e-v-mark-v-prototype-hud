import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PanelProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export function HudPanel({ children, className, title }: PanelProps) {
  return (
    <div className={cn('hud-panel', className)}>
      {title && <div className="hud-panel-title">{title}</div>}
      <div className="hud-panel-content">{children}</div>
    </div>
  );
}

interface StatPanelProps {
  label: string;
  value: number | string;
  max?: number;
  unit?: string;
  status?: 'nominal' | 'warning' | 'critical';
  className?: string;
}

export function StatPanel({ label, value, max, unit, status = 'nominal', className }: StatPanelProps) {
  const percentage = max ? (Number(value) / max) * 100 : 100;
  
  return (
    <div className={cn('stat-panel', `status-${status}`, className)}>
      <div className="stat-label">{label}</div>
      <div className="stat-value">
        {value}{unit && <span className="stat-unit">{unit}</span>}
        {max && <span className="stat-max">/{max}</span>}
      </div>
      {max && (
        <div className="stat-bar">
          <div 
            className="stat-bar-fill" 
            style={{ width: `${Math.max(0, Math.min(100, percentage))}%` }}
          />
        </div>
      )}
    </div>
  );
}

interface MeterPanelProps {
  label: string;
  value: number;
  max: number;
  status?: 'nominal' | 'warning' | 'critical';
}

export function MeterPanel({ label, value, max, status = 'nominal' }: MeterPanelProps) {
  return <StatPanel label={label} value={value} max={max} status={status} />;
}

interface VitalsPanelProps {
  health: number;
  armor: number;
  aux: number;
}

export function VitalsPanel({ health, armor, aux }: VitalsPanelProps) {
  const getOverallStatus = () => {
    const avg = (health + armor + aux) / 3;
    if (avg >= 70) return 'nominal';
    if (avg >= 40) return 'warning';
    return 'critical';
  };

  const status = getOverallStatus();

  return (
    <HudPanel title="SUIT DAMAGE / VITALS" className="vitals-panel">
      <div className={cn('vitals-status', `status-${status}`)}>
        <div className="vitals-indicator">
          <span className="vitals-icon">●</span>
          <span className="vitals-text">
            {status === 'nominal' && 'ALL SYSTEMS NOMINAL'}
            {status === 'warning' && 'MINOR DAMAGE DETECTED'}
            {status === 'critical' && 'CRITICAL DAMAGE'}
          </span>
        </div>
        <div className="vitals-grid">
          <div className="vitals-item">
            <span className="vitals-item-label">INTEGRITY:</span>
            <span className="vitals-item-value">{Math.round((health + armor) / 2)}%</span>
          </div>
          <div className="vitals-item">
            <span className="vitals-item-label">POWER:</span>
            <span className="vitals-item-value">{aux}%</span>
          </div>
        </div>
      </div>
    </HudPanel>
  );
}
