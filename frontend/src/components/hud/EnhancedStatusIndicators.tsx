import { useSuitStore } from '@/state/suitState';
import { useHazardsStore } from '@/state/hazardsState';
import { useInfoSettingsStore } from '@/state/infoSettingsStore';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Shield, AlertTriangle, Zap, Activity, Radio, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatusIndicator {
  id: string;
  icon: LucideIcon;
  label: string;
  color: string;
  description: string;
}

export function EnhancedStatusIndicators() {
  const { stats, modules } = useSuitStore();
  const { getAggregateHazard } = useHazardsStore();
  const { radioLink } = useInfoSettingsStore();

  const indicators: StatusIndicator[] = [];

  // Shield boost active
  if (modules.shieldBoost) {
    indicators.push({
      id: 'shield',
      icon: Shield,
      label: 'SHIELD BOOST',
      color: 'text-primary',
      description: 'Shield boost system active'
    });
  }

  // Hazard detected
  const hazardLevel = getAggregateHazard();
  if (hazardLevel > 30) {
    indicators.push({
      id: 'hazard',
      icon: AlertTriangle,
      label: 'HAZARD',
      color: hazardLevel > 60 ? 'text-destructive' : 'text-yellow-500',
      description: `Environmental hazard detected: ${hazardLevel}%`
    });
  }

  // Low ammo
  if (stats.ammo < 20) {
    indicators.push({
      id: 'ammo',
      icon: Zap,
      label: 'LOW AMMO',
      color: 'text-yellow-500',
      description: 'Ammunition reserves low'
    });
  }

  // Critical health
  if (stats.health < 25) {
    indicators.push({
      id: 'health',
      icon: Activity,
      label: 'CRITICAL',
      color: 'text-destructive',
      description: 'Operator health critical'
    });
  }

  // Radio offline
  if (!radioLink) {
    indicators.push({
      id: 'radio',
      icon: Radio,
      label: 'NO SIGNAL',
      color: 'text-muted-foreground',
      description: 'Radio link offline'
    });
  }

  if (indicators.length === 0) return null;

  return (
    <TooltipProvider>
      <div className="enhanced-status-indicators">
        {indicators.map((indicator) => {
          const Icon = indicator.icon;
          return (
            <Tooltip key={indicator.id}>
              <TooltipTrigger asChild>
                <Badge 
                  variant="outline" 
                  className={cn(
                    'status-indicator-badge',
                    indicator.color
                  )}
                >
                  <Icon className="w-3 h-3 mr-1" />
                  {indicator.label}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">{indicator.description}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
