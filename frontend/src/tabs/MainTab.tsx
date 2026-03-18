import { useSuitStore } from '@/state/suitState';
import { useHazardsStore } from '@/state/hazardsState';
import { useInfoSettingsStore } from '@/state/infoSettingsStore';
import { Progress } from '@/components/ui/progress';
import { Activity, Shield, Zap, Crosshair, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MainTab() {
  const { stats } = useSuitStore();
  const { levels, getAggregateHazard } = useHazardsStore();
  const { systemStyle } = useInfoSettingsStore();

  const aggregateHazard = getAggregateHazard();

  const getStatusColor = (value: number, type: 'health' | 'armor' | 'hazard') => {
    if (type === 'hazard') {
      if (value > 75) return 'text-red-500';
      if (value > 50) return 'text-orange-500';
      if (value > 25) return 'text-yellow-500';
      return 'text-green-500';
    }
    
    if (value < 25) return 'text-red-500';
    if (value < 50) return 'text-orange-500';
    if (value < 75) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="space-y-6 p-6">
      {/* Critical Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Health */}
        <div className="bg-black/40 border-2 border-primary/30 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              <span className="text-sm font-bold text-primary">HEALTH</span>
            </div>
            <span className={cn('text-2xl font-bold', getStatusColor(stats.health, 'health'))}>
              {stats.health}
            </span>
          </div>
          <Progress value={stats.health} className="h-2" />
        </div>

        {/* Armor */}
        <div className="bg-black/40 border-2 border-primary/30 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm font-bold text-primary">ARMOR</span>
            </div>
            <span className={cn('text-2xl font-bold', getStatusColor(stats.armor, 'armor'))}>
              {stats.armor}
            </span>
          </div>
          <Progress value={stats.armor} className="h-2" />
        </div>

        {/* Auxiliary Power */}
        <div className="bg-black/40 border-2 border-primary/30 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              <span className="text-sm font-bold text-primary">AUX POWER</span>
            </div>
            <span className={cn('text-2xl font-bold', getStatusColor(stats.aux, 'armor'))}>
              {stats.aux}
            </span>
          </div>
          <Progress value={stats.aux} className="h-2" />
        </div>

        {/* Ammo */}
        <div className="bg-black/40 border-2 border-primary/30 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Crosshair className="w-5 h-5 text-primary" />
              <span className="text-sm font-bold text-primary">AMMO</span>
            </div>
            <span className={cn('text-2xl font-bold', getStatusColor(stats.ammo, 'armor'))}>
              {stats.ammo}
            </span>
          </div>
          <div className="text-xs text-muted-foreground">CURRENT / RESERVE</div>
        </div>
      </div>

      {/* Environmental Hazards */}
      <div className="bg-black/40 border-2 border-primary/30 p-4">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-primary">ENVIRONMENTAL HAZARDS</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(levels).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-primary uppercase">{key}</span>
                <span className={cn('text-sm font-bold', getStatusColor(value, 'hazard'))}>
                  {value}%
                </span>
              </div>
              <Progress value={value} className="h-1" />
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-primary/20">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-primary">AGGREGATE HAZARD LEVEL</span>
            <span className={cn('text-xl font-bold', getStatusColor(aggregateHazard, 'hazard'))}>
              {aggregateHazard}%
            </span>
          </div>
          <Progress value={aggregateHazard} className="h-2 mt-2" />
        </div>
      </div>

      {/* System Status */}
      <div className="bg-black/40 border-2 border-primary/30 p-4">
        <h3 className="text-lg font-bold text-primary mb-4">SYSTEM STATUS</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Faction:</span>
            <span className="ml-2 text-primary font-bold">{systemStyle.toUpperCase()}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Status:</span>
            <span className="ml-2 text-green-500 font-bold">OPERATIONAL</span>
          </div>
          <div>
            <span className="text-muted-foreground">Power:</span>
            <span className="ml-2 text-primary font-bold">{stats.aux}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
