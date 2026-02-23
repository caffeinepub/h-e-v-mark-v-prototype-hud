import { useInfoSettingsStore } from '@/state/infoSettingsStore';
import { cn } from '@/lib/utils';

interface StatPanelProps {
  label: string;
  value: number;
  max?: number;
  unit?: string;
  status?: 'nominal' | 'warning' | 'critical';
  className?: string;
}

export function StatPanel({ label, value, max = 100, unit = '', status = 'nominal', className }: StatPanelProps) {
  const { hudStyleMode } = useInfoSettingsStore();
  const percentage = (value / max) * 100;

  const statusColors = {
    nominal: 'bg-primary',
    warning: 'bg-yellow-500',
    critical: 'bg-destructive',
  };

  // HL1 mode: segmented bars
  if (hudStyleMode === 'hl1') {
    const segments = 10;
    const filledSegments = Math.ceil((value / max) * segments);

    return (
      <div className={cn('hud-stat-panel stat-panel-enhanced', className)}>
        <div className="hud-stat-label">{label}</div>
        <div className="flex gap-1 my-2">
          {Array.from({ length: segments }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'flex-1 h-4 border-2 transition-all duration-200',
                i < filledSegments ? statusColors[status] : 'bg-background/20'
              )}
              style={{ borderColor: 'currentColor' }}
            />
          ))}
        </div>
        <div className="hud-stat-value text-lg font-bold">
          {value}
          {unit}
        </div>
      </div>
    );
  }

  // HL2 mode: numerical readout with refined styling
  if (hudStyleMode === 'hl2') {
    return (
      <div className={cn('hud-stat-panel stat-panel-enhanced', className)}>
        <div className="hud-stat-label text-xs opacity-70">{label}</div>
        <div className="text-4xl font-bold my-2 tracking-tight stat-value-glow" style={{ color: 'oklch(0.7 0.25 220)' }}>
          {value}
          <span className="text-xl opacity-70">{unit}</span>
        </div>
        <div className="h-1 bg-background/20 rounded-full overflow-hidden">
          <div
            className={cn('h-full transition-all duration-300', statusColors[status])}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }

  // Custom mode: original design with enhancements
  return (
    <div className={cn('hud-stat-panel stat-panel-enhanced', className)}>
      <div className="hud-stat-label">{label}</div>
      <div className="hud-stat-value stat-value-transition">
        {value}
        {unit}
      </div>
      <div className="hud-stat-bar">
        <div className={cn('hud-stat-bar-fill', statusColors[status])} style={{ width: `${percentage}%` }} />
        <div className="hud-stat-bar-glow" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

interface MeterPanelProps {
  label: string;
  value: number;
  max?: number;
  unit?: string;
}

export function MeterPanel({ label, value, max = 100, unit = '%' }: MeterPanelProps) {
  const { hudStyleMode } = useInfoSettingsStore();
  const percentage = (value / max) * 100;

  // HL1 mode: segmented display
  if (hudStyleMode === 'hl1') {
    const segments = 8;
    const filledSegments = Math.ceil((value / max) * segments);

    return (
      <div className="hud-meter-panel meter-panel-enhanced">
        <div className="hud-meter-label">{label}</div>
        <div className="flex gap-1">
          {Array.from({ length: segments }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'flex-1 h-3 border-2 transition-all duration-200',
                i < filledSegments ? 'bg-primary' : 'bg-background/20'
              )}
              style={{ borderColor: 'currentColor' }}
            />
          ))}
        </div>
        <div className="hud-meter-value text-sm">
          {value}
          {unit}
        </div>
      </div>
    );
  }

  // HL2 mode: numerical with refined bar
  if (hudStyleMode === 'hl2') {
    return (
      <div className="hud-meter-panel meter-panel-enhanced">
        <div className="flex items-baseline justify-between mb-1">
          <div className="hud-meter-label text-xs opacity-70">{label}</div>
          <div className="text-2xl font-bold stat-value-glow" style={{ color: 'oklch(0.7 0.25 220)' }}>
            {value}
            <span className="text-sm opacity-70">{unit}</span>
          </div>
        </div>
        <div className="h-1 bg-background/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }

  // Custom mode: original design with enhancements
  return (
    <div className="hud-meter-panel meter-panel-enhanced">
      <div className="hud-meter-label">{label}</div>
      <div className="hud-meter-bar">
        <div className="hud-meter-bar-fill" style={{ width: `${percentage}%` }} />
        <div className="hud-meter-bar-glow" style={{ width: `${percentage}%` }} />
      </div>
      <div className="hud-meter-value">
        {value}
        {unit}
      </div>
    </div>
  );
}

interface VitalsPanelProps {
  health: number;
  armor: number;
  aux: number;
}

export function VitalsPanel({ health, armor, aux }: VitalsPanelProps) {
  return (
    <div className="hud-panel-compact">
      <div className="hud-panel-title-compact">SUIT VITALS</div>
      <div className="hud-panel-content-compact">
        <MeterPanel label="HEALTH" value={health} />
        <MeterPanel label="ARMOR" value={armor} />
        <MeterPanel label="AUX POWER" value={aux} />
      </div>
    </div>
  );
}

interface HudPanelProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function HudPanel({ title, children, className }: HudPanelProps) {
  return (
    <div className={cn('hud-panel-compact', className)}>
      {title && <div className="hud-panel-title">{title}</div>}
      <div className="hud-panel-content">
        {children}
      </div>
    </div>
  );
}
