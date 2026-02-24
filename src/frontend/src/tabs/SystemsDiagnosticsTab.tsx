import { useSuitStore } from '@/state/suitState';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Activity, Battery, Cpu, HardDrive, Wifi, AlertTriangle } from 'lucide-react';

export function SystemsDiagnosticsTab() {
  const { stats, modules } = useSuitStore();

  const calculatePowerConsumption = () => {
    let consumption = 10; // Base consumption
    if (modules.flashlight) consumption += 5;
    if (modules.longJump) consumption += 8;
    if (modules.shieldBoost) consumption += 12;
    if (modules.hazardSystem) consumption += 7;
    return consumption;
  };

  const calculateSystemHealth = () => {
    const healthScore = (stats.health + stats.armor + stats.aux) / 3;
    return Math.round(healthScore);
  };

  const powerConsumption = calculatePowerConsumption();
  const systemHealth = calculateSystemHealth();
  const timeRemaining = stats.aux > 0 ? Math.round((stats.aux / powerConsumption) * 60) : 0;

  const getModuleStatus = (enabled: boolean) => {
    return enabled ? 'ACTIVE' : 'STANDBY';
  };

  const getModuleStatusColor = (enabled: boolean) => {
    return enabled ? 'text-green-500' : 'text-yellow-500';
  };

  return (
    <div className="space-y-6 p-6">
      <div className="bg-black/40 border-2 border-primary/30 p-4">
        <div className="flex items-center gap-2 mb-2">
          <Cpu className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-primary">SYSTEMS DIAGNOSTICS</h2>
        </div>
        <p className="text-sm text-muted-foreground">Real-time system monitoring and analysis</p>
      </div>

      {/* Power Management */}
      <div className="bg-black/40 border-2 border-primary/30 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Battery className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-primary">POWER MANAGEMENT</h3>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Power Cell Charge</span>
              <span className="text-sm font-bold text-primary">{stats.aux}%</span>
            </div>
            <Progress value={stats.aux} className="h-3" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Consumption Rate:</span>
              <span className="ml-2 text-primary font-bold">{powerConsumption}W</span>
            </div>
            <div>
              <span className="text-muted-foreground">Time Remaining:</span>
              <span className="ml-2 text-primary font-bold">{timeRemaining}min</span>
            </div>
            <div>
              <span className="text-muted-foreground">Efficiency:</span>
              <span className="ml-2 text-primary font-bold">
                {stats.aux > 50 ? 'OPTIMAL' : stats.aux > 25 ? 'MODERATE' : 'LOW'}
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-primary mb-2">Power Breakdown by Module</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Base Systems</span>
                <span className="text-primary">10W</span>
              </div>
              {modules.flashlight && (
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Flashlight</span>
                  <span className="text-primary">5W</span>
                </div>
              )}
              {modules.longJump && (
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Long Jump Module</span>
                  <span className="text-primary">8W</span>
                </div>
              )}
              {modules.shieldBoost && (
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Shield Boost</span>
                  <span className="text-primary">12W</span>
                </div>
              )}
              {modules.hazardSystem && (
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Hazard System</span>
                  <span className="text-primary">7W</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* System Integrity */}
      <div className="bg-black/40 border-2 border-primary/30 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-primary">SYSTEM INTEGRITY</h3>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Overall System Health</span>
              <span className="text-sm font-bold text-primary">{systemHealth}%</span>
            </div>
            <Progress value={systemHealth} className="h-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(modules).map(([key, enabled]) => (
              <div key={key} className="flex items-center justify-between p-3 bg-black/20 border border-primary/20">
                <span className="text-sm text-muted-foreground capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <Badge variant={enabled ? 'default' : 'secondary'} className="text-xs">
                  {getModuleStatus(enabled)}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Diagnostic Codes */}
      <div className="bg-black/40 border-2 border-primary/30 p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-primary">DIAGNOSTIC CODES</h3>
        </div>

        <div className="space-y-2">
          {stats.health < 50 && (
            <div className="flex items-center gap-3 p-3 bg-red-500/10 border border-red-500/30">
              <Badge variant="destructive">ERR-101</Badge>
              <div className="flex-1">
                <div className="text-sm font-bold text-red-500">Low Health Warning</div>
                <div className="text-xs text-muted-foreground">
                  Recommended: Apply medical kit immediately
                </div>
              </div>
            </div>
          )}
          {stats.armor < 50 && (
            <div className="flex items-center gap-3 p-3 bg-orange-500/10 border border-orange-500/30">
              <Badge className="bg-orange-500/20 text-orange-500 border-orange-500">WARN-205</Badge>
              <div className="flex-1">
                <div className="text-sm font-bold text-orange-500">Armor Integrity Low</div>
                <div className="text-xs text-muted-foreground">
                  Recommended: Seek armor recharge station
                </div>
              </div>
            </div>
          )}
          {stats.aux < 25 && (
            <div className="flex items-center gap-3 p-3 bg-yellow-500/10 border border-yellow-500/30">
              <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500">WARN-310</Badge>
              <div className="flex-1">
                <div className="text-sm font-bold text-yellow-500">Auxiliary Power Critical</div>
                <div className="text-xs text-muted-foreground">
                  Recommended: Disable non-essential modules
                </div>
              </div>
            </div>
          )}
          {stats.health >= 50 && stats.armor >= 50 && stats.aux >= 25 && (
            <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/30">
              <Badge className="bg-green-500/20 text-green-500 border-green-500">INFO</Badge>
              <div className="flex-1">
                <div className="text-sm font-bold text-green-500">All Systems Operational</div>
                <div className="text-xs text-muted-foreground">No errors detected</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* System Actions */}
      <div className="bg-black/40 border-2 border-primary/30 p-6">
        <div className="flex items-center gap-2 mb-4">
          <HardDrive className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-primary">SYSTEM ACTIONS</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button variant="outline" className="w-full">
            <Activity className="w-4 h-4 mr-2" />
            Run Full Diagnostic
          </Button>
          <Button variant="outline" className="w-full">
            <Wifi className="w-4 h-4 mr-2" />
            Network Test
          </Button>
          <Button variant="outline" className="w-full">
            <Battery className="w-4 h-4 mr-2" />
            Optimize Power
          </Button>
          <Button variant="destructive" className="w-full">
            <AlertTriangle className="w-4 h-4 mr-2" />
            System Reboot
          </Button>
        </div>
      </div>
    </div>
  );
}
