import { useMemo } from 'react';
import { useSuitStore } from '@/state/suitState';
import { useHazardsStore } from '@/state/hazardsState';
import { useInfoSettingsStore } from '@/state/infoSettingsStore';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Activity, Cpu, Zap, Radio } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SystemDiagnosticsPanel() {
  const { stats, modules } = useSuitStore();
  const { getAggregateHazard } = useHazardsStore();
  const { hudOnline, radioLink, systemStyle } = useInfoSettingsStore();

  const diagnostics = useMemo(() => {
    const activeModules = Object.values(modules).filter(Boolean).length;
    const totalModules = Object.keys(modules).length;
    const moduleLoad = (activeModules / totalModules) * 100;

    const powerUsage = stats.aux > 50 ? 'NOMINAL' : stats.aux > 20 ? 'ELEVATED' : 'CRITICAL';
    const systemHealth = stats.health > 70 ? 100 : stats.health > 40 ? 70 : 40;
    const networkStatus = radioLink ? 'CONNECTED' : 'OFFLINE';

    return {
      moduleLoad,
      activeModules,
      totalModules,
      powerUsage,
      systemHealth,
      networkStatus,
      hazardLevel: getAggregateHazard(),
    };
  }, [stats, modules, radioLink, getAggregateHazard]);

  const getTitle = () => {
    switch (systemStyle) {
      case 'hecu': return 'COMBAT SYSTEM DIAGNOSTICS';
      case 'guard': return 'SECURITY SYSTEM STATUS';
      default: return 'SYSTEM DIAGNOSTICS';
    }
  };

  return (
    <div className="hud-panel-compact diagnostics-panel">
      <div className="hud-panel-title-compact flex items-center gap-2">
        <Activity className="w-4 h-4" />
        {getTitle()}
      </div>
      <div className="hud-panel-content-compact space-y-3">
        <div className="diagnostic-item">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs flex items-center gap-1">
              <Cpu className="w-3 h-3" />
              MODULE LOAD
            </span>
            <span className="text-xs font-mono">{diagnostics.activeModules}/{diagnostics.totalModules}</span>
          </div>
          <Progress value={diagnostics.moduleLoad} className="h-2" />
        </div>

        <div className="diagnostic-item">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs flex items-center gap-1">
              <Zap className="w-3 h-3" />
              POWER CONSUMPTION
            </span>
            <Badge 
              variant="outline" 
              className={cn(
                'text-xs',
                diagnostics.powerUsage === 'NOMINAL' && 'status-nominal',
                diagnostics.powerUsage === 'ELEVATED' && 'status-warning',
                diagnostics.powerUsage === 'CRITICAL' && 'status-critical'
              )}
            >
              {diagnostics.powerUsage}
            </Badge>
          </div>
          <Progress value={stats.aux} className="h-2" />
        </div>

        <div className="diagnostic-item">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs flex items-center gap-1">
              <Activity className="w-3 h-3" />
              SYSTEM HEALTH
            </span>
            <span className="text-xs font-mono">{diagnostics.systemHealth}%</span>
          </div>
          <Progress value={diagnostics.systemHealth} className="h-2" />
        </div>

        <div className="diagnostic-item">
          <div className="flex items-center justify-between">
            <span className="text-xs flex items-center gap-1">
              <Radio className="w-3 h-3" />
              NETWORK STATUS
            </span>
            <Badge 
              variant="outline" 
              className={cn(
                'text-xs',
                diagnostics.networkStatus === 'CONNECTED' ? 'status-nominal' : 'status-warning'
              )}
            >
              {diagnostics.networkStatus}
            </Badge>
          </div>
        </div>

        <div className="diagnostic-item">
          <div className="flex items-center justify-between">
            <span className="text-xs">HUD STATUS</span>
            <Badge 
              variant="outline" 
              className={cn('text-xs', hudOnline ? 'status-nominal' : 'status-critical')}
            >
              {hudOnline ? 'ONLINE' : 'OFFLINE'}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
