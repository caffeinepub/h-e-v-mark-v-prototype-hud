import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSuitStore } from '@/state/suitState';
import { useHazardsStore } from '@/state/hazardsState';
import { useWeaponSystemsStore } from '@/state/weaponSystemsState';
import { useInfoSettingsStore } from '@/state/infoSettingsState';
import { cn } from '@/lib/utils';
import { Activity, AlertTriangle, Info, Wrench, Crosshair, Shield, Settings } from 'lucide-react';

interface HudTabsBarProps {
  showTactical?: boolean;
}

export function HudTabsBar({ showTactical = false }: HudTabsBarProps) {
  const { stats, modules } = useSuitStore();
  const { levels, getAggregateHazard } = useHazardsStore();
  const { selectedWeapon } = useWeaponSystemsStore();
  const { displayMode } = useInfoSettingsStore();

  // Calculate active modules count
  const activeModulesCount = Object.values(modules).filter(Boolean).length;

  // Get critical hazard count
  const criticalHazards = Object.values(levels).filter(level => level >= 60).length;
  const aggregateHazard = getAggregateHazard();

  // Health status indicator
  const healthStatus = stats.health >= 70 ? 'nominal' : stats.health >= 40 ? 'warning' : 'critical';

  return (
    <TabsList className="hud-tabs-list-enhanced">
      <TabsTrigger value="basics" className="hud-tab-trigger-enhanced">
        <div className="tab-trigger-content">
          <Activity className="tab-trigger-icon" />
          <div className="tab-trigger-text">
            <span className="tab-trigger-label">BASICS</span>
            <span className={cn('tab-trigger-micro', `status-${healthStatus}`)}>
              {stats.health}% HP
            </span>
          </div>
        </div>
      </TabsTrigger>

      <TabsTrigger value="medical" className="hud-tab-trigger-enhanced">
        <div className="tab-trigger-content">
          <Activity className="tab-trigger-icon" />
          <div className="tab-trigger-text">
            <span className="tab-trigger-label">MEDICAL</span>
            <span className="tab-trigger-micro">
              {stats.armor}% ARM
            </span>
          </div>
        </div>
      </TabsTrigger>

      <TabsTrigger value="info" className="hud-tab-trigger-enhanced">
        <div className="tab-trigger-content">
          <Info className="tab-trigger-icon" />
          <div className="tab-trigger-text">
            <span className="tab-trigger-label">INFO</span>
            <span className="tab-trigger-micro">
              {displayMode}
            </span>
          </div>
        </div>
      </TabsTrigger>

      <TabsTrigger value="utilities" className="hud-tab-trigger-enhanced">
        <div className="tab-trigger-content">
          <Wrench className="tab-trigger-icon" />
          <div className="tab-trigger-text">
            <span className="tab-trigger-label">UTILITIES</span>
            <span className="tab-trigger-micro">
              {activeModulesCount}/10 ON
            </span>
          </div>
        </div>
      </TabsTrigger>

      <TabsTrigger value="weapons" className="hud-tab-trigger-enhanced">
        <div className="tab-trigger-content">
          <Crosshair className="tab-trigger-icon" />
          <div className="tab-trigger-text">
            <span className="tab-trigger-label">WEAPONS</span>
            <span className="tab-trigger-micro">
              {selectedWeapon.toUpperCase().slice(0, 6)}
            </span>
          </div>
        </div>
      </TabsTrigger>

      <TabsTrigger value="hazards" className="hud-tab-trigger-enhanced">
        <div className="tab-trigger-content">
          <AlertTriangle className="tab-trigger-icon" />
          <div className="tab-trigger-text">
            <span className="tab-trigger-label">HAZARDS</span>
            <span className={cn('tab-trigger-micro', aggregateHazard >= 60 ? 'status-critical' : aggregateHazard > 0 ? 'status-warning' : 'status-nominal')}>
              {criticalHazards > 0 ? `${criticalHazards} CRIT` : `${aggregateHazard}%`}
            </span>
          </div>
        </div>
      </TabsTrigger>

      {showTactical && (
        <TabsTrigger value="tactical" className="hud-tab-trigger-enhanced">
          <div className="tab-trigger-content">
            <Shield className="tab-trigger-icon" />
            <div className="tab-trigger-text">
              <span className="tab-trigger-label">TACTICAL</span>
              <span className="tab-trigger-micro">
                ACTIVE
              </span>
            </div>
          </div>
        </TabsTrigger>
      )}

      <TabsTrigger value="settings" className="hud-tab-trigger-enhanced">
        <div className="tab-trigger-content">
          <Settings className="tab-trigger-icon" />
          <div className="tab-trigger-text">
            <span className="tab-trigger-label">SETTINGS</span>
            <span className="tab-trigger-micro">
              SYS
            </span>
          </div>
        </div>
      </TabsTrigger>
    </TabsList>
  );
}
