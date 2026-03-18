import { useMemo } from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface SparklineProps {
  data: number[];
  height?: number;
  color?: string;
}

export function Sparkline({ data, height = 30, color = 'oklch(var(--primary))' }: SparklineProps) {
  const points = useMemo(() => {
    if (data.length < 2) return '';
    
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    
    const width = 100;
    const step = width / (data.length - 1);
    
    return data.map((value, index) => {
      const x = index * step;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');
  }, [data, height]);

  return (
    <svg width="100%" height={height} className="sparkline">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface RadialGaugeProps {
  value: number;
  max?: number;
  size?: number;
  label?: string;
}

export function RadialGauge({ value, max = 100, size = 80, label }: RadialGaugeProps) {
  const percentage = (value / max) * 100;
  const circumference = 2 * Math.PI * 30;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="radial-gauge" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 80 80">
        <circle
          cx="40"
          cy="40"
          r="30"
          fill="none"
          stroke="oklch(var(--border))"
          strokeWidth="8"
        />
        <circle
          cx="40"
          cy="40"
          r="30"
          fill="none"
          stroke="oklch(var(--primary))"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 40 40)"
          className="transition-all duration-300"
        />
        <text
          x="40"
          y="40"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-xs font-bold"
          fill="oklch(var(--foreground))"
        >
          {value}
        </text>
        {label && (
          <text
            x="40"
            y="52"
            textAnchor="middle"
            className="text-xs opacity-70"
            fill="oklch(var(--foreground))"
          >
            {label}
          </text>
        )}
      </svg>
    </div>
  );
}

interface BarChartProps {
  data: Array<{ label: string; value: number }>;
  max?: number;
}

export function BarChart({ data, max }: BarChartProps) {
  const maxValue = max || Math.max(...data.map(d => d.value));

  return (
    <div className="bar-chart space-y-2">
      {data.map((item, index) => (
        <div key={index} className="bar-chart-item">
          <div className="flex justify-between text-xs mb-1">
            <span className="opacity-70">{item.label}</span>
            <span className="font-mono">{item.value}</span>
          </div>
          <Progress value={(item.value / maxValue) * 100} className="h-2" />
        </div>
      ))}
    </div>
  );
}
