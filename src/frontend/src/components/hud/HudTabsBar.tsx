import { useInfoSettingsStore } from '@/state/infoSettingsStore';
import { useSuitStore } from '@/state/suitState';
import { useHazardsStore } from '@/state/hazardsState';
import { useMarkFeatures } from '@/hooks/useMarkFeatures';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Activity, AlertTriangle, Crosshair, Heart, Info, Settings, Shield, Wrench, Car } from 'lucide-react';
import { HudTooltip } from '@/components/common/HudTooltip';

interface HudTabsBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function HudTabsBar({ activeTab, onTabChange }: HudTabsBarProps) {
  const { showTacticalTab, toggleEmergencyMode } = useInfoSettingsStore();
  const { stats } = useSuitStore();
  const { getAggregateHazard } = useHazardsStore();
  const markFeatures = useMarkFeatures();

  const aggregateHazard = getAggregateHazard();

  const tabs = [
    { id: 'basics', label: 'BASICS', icon: Heart, available: markFeatures.tabs.basics, shortcut: '1' },
    { id: 'medical', label: 'MEDICAL', icon: Activity, available: markFeatures.tabs.medical, shortcut: '2' },
    { id: 'info', label: 'INFO', icon: Info, available: markFeatures.tabs.info, shortcut: '3' },
    { id: 'utilities', label: 'UTILITIES', icon: Wrench, available: markFeatures.tabs.utilities, shortcut: '4' },
    { id: 'weapons', label: 'WEAPONS', icon: Crosshair, available: markFeatures.tabs.weapons, shortcut: '5' },
    { id: 'hazards', label: 'HAZARDS', icon: AlertTriangle, available: markFeatures.tabs.hazards, shortcut: '6' },
    { id: 'tactical', label: 'TACTICAL', icon: Shield, available: markFeatures.tabs.tactical && showTacticalTab, shortcut: '7' },
    { id: 'vehicles', label: 'VEHICLES', icon: Car, available: markFeatures.tabs.vehicles, shortcut: '8' },
    { id: 'settings', label: 'SETTINGS', icon: Settings, available: markFeatures.tabs.settings, shortcut: '9' },
  ].filter((tab) => tab.available);

  const getMicroIndicator = (tabId: string) => {
    switch (tabId) {
      case 'basics':
        if (stats.health < 30) return <Badge variant="destructive" className="micro-indicator">!</Badge>;
        if (stats.armor < 20) return <Badge variant="outline" className="micro-indicator warning">!</Badge>;
        return null;
      case 'hazards':
        if (aggregateHazard > 70) return <Badge variant="destructive" className="micro-indicator">!</Badge>;
        if (aggregateHazard > 40) return <Badge variant="outline" className="micro-indicator warning">!</Badge>;
        return null;
      case 'weapons':
        if (stats.ammo < 20) return <Badge variant="outline" className="micro-indicator warning">!</Badge>;
        return null;
      default:
        return null;
    }
  };

  return (
    <div className="hud-tabs-bar">
      <div className="hud-tabs-scroll">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <HudTooltip key={tab.id} content={`${tab.label} (${tab.shortcut})`}>
              <button
                onClick={() => onTabChange(tab.id)}
                className={`hud-tab ${activeTab === tab.id ? 'hud-tab-active' : ''}`}
              >
                <Icon className="hud-tab-icon" />
                <span className="hud-tab-label">{tab.label}</span>
                {getMicroIndicator(tab.id)}
              </button>
            </HudTooltip>
          );
        })}
      </div>

      <HudTooltip content="Emergency Mode (F4)">
        <Button
          onClick={toggleEmergencyMode}
          variant="outline"
          size="sm"
          className="emergency-quick-button"
        >
          <AlertTriangle className="w-4 h-4" />
        </Button>
      </HudTooltip>
    </div>
  );
}
