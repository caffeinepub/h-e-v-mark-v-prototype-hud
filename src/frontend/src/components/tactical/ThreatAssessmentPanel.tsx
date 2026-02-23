import { useMemo } from 'react';
import { useHazardsStore } from '@/state/hazardsState';
import { useSuitStore } from '@/state/suitState';
import { useInfoSettingsStore } from '@/state/infoSettingsStore';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Shield, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ThreatAssessmentPanel() {
  const { levels, getAggregateHazard } = useHazardsStore();
  const { stats } = useSuitStore();
  const { systemStyle } = useInfoSettingsStore();

  const threatLevel = useMemo(() => {
    const hazardScore = getAggregateHazard();
    const healthScore = 100 - stats.health;
    const armorScore = 100 - stats.armor;
    
    const totalThreat = (hazardScore * 0.5) + (healthScore * 0.3) + (armorScore * 0.2);
    
    if (totalThreat < 20) return { level: 'LOW', color: 'status-nominal', value: totalThreat };
    if (totalThreat < 50) return { level: 'MODERATE', color: 'status-warning', value: totalThreat };
    if (totalThreat < 75) return { level: 'HIGH', color: 'status-critical', value: totalThreat };
    return { level: 'CRITICAL', color: 'status-critical', value: totalThreat };
  }, [levels, stats, getAggregateHazard]);

  const getTitle = () => {
    switch (systemStyle) {
      case 'hecu': return 'COMBAT THREAT ASSESSMENT';
      case 'guard': return 'SECURITY THREAT LEVEL';
      default: return 'THREAT ASSESSMENT';
    }
  };

  return (
    <div className="hud-panel-compact threat-assessment-panel">
      <div className="hud-panel-title-compact flex items-center justify-between">
        <span className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          {getTitle()}
        </span>
        <Badge variant="outline" className={cn('text-xs font-bold', threatLevel.color)}>
          {threatLevel.level}
        </Badge>
      </div>
      <div className="hud-panel-content-compact space-y-3">
        <div className="threat-meter">
          <div className="threat-meter-bar">
            <div 
              className={cn('threat-meter-fill', threatLevel.color)}
              style={{ width: `${threatLevel.value}%` }}
            />
          </div>
          <div className="text-xs text-center mt-1 font-mono">
            THREAT INDEX: {Math.floor(threatLevel.value)}%
          </div>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <span className="opacity-70">Environmental:</span>
            <span className={cn('font-mono', getAggregateHazard() > 50 ? 'text-destructive' : 'text-primary')}>
              {getAggregateHazard()}%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="opacity-70">Suit Integrity:</span>
            <span className={cn('font-mono', stats.armor < 30 ? 'text-destructive' : 'text-primary')}>
              {stats.armor}%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="opacity-70">Operator Status:</span>
            <span className={cn('font-mono', stats.health < 30 ? 'text-destructive' : 'text-primary')}>
              {stats.health}%
            </span>
          </div>
        </div>

        <div className="threat-recommendation p-2 border border-border/30 rounded text-xs">
          <div className="font-semibold mb-1 flex items-center gap-1">
            <Shield className="w-3 h-3" />
            RECOMMENDATION:
          </div>
          <div className="opacity-80">
            {threatLevel.level === 'LOW' && 'Maintain current protocols. All systems nominal.'}
            {threatLevel.level === 'MODERATE' && 'Increase situational awareness. Monitor hazards.'}
            {threatLevel.level === 'HIGH' && 'Engage defensive protocols. Seek cover if available.'}
            {threatLevel.level === 'CRITICAL' && 'IMMEDIATE ACTION REQUIRED. Evacuate area or engage emergency systems.'}
          </div>
        </div>
      </div>
    </div>
  );
}
