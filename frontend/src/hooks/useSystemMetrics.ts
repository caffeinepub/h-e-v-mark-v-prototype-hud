import { useMemo } from 'react';
import { useSuitStore } from '@/state/suitState';
import { useHazardsStore } from '@/state/hazardsState';
import { useInfoSettingsStore } from '@/state/infoSettingsStore';

export function useSystemMetrics() {
  const { stats, modules } = useSuitStore();
  const { levels, getAggregateHazard } = useHazardsStore();
  const { hudOnline, radioLink } = useInfoSettingsStore();

  const metrics = useMemo(() => {
    const activeModules = Object.values(modules).filter(Boolean).length;
    const totalModules = Object.keys(modules).length;
    
    const systemHealth = Math.floor(
      (stats.health * 0.4) + 
      (stats.armor * 0.3) + 
      (stats.aux * 0.2) + 
      ((100 - getAggregateHazard()) * 0.1)
    );

    const powerEfficiency = stats.aux > 70 ? 95 : stats.aux > 40 ? 75 : 50;

    return {
      systemHealth,
      powerEfficiency,
      activeModules,
      totalModules,
      moduleLoadPercentage: (activeModules / totalModules) * 100,
      networkConnectivity: radioLink ? 100 : 0,
      hudStatus: hudOnline ? 'ONLINE' : 'OFFLINE',
      hazardLevel: getAggregateHazard(),
      overallStatus: systemHealth > 70 ? 'NOMINAL' : systemHealth > 40 ? 'DEGRADED' : 'CRITICAL',
    };
  }, [stats, modules, levels, hudOnline, radioLink, getAggregateHazard]);

  return metrics;
}
