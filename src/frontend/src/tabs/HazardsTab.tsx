import { useHazardsStore } from '../state/hazardsState';
import { useInfoSettingsStore } from '../state/infoSettingsStore';
import { useMarkFeatures } from '../hooks/useMarkFeatures';
import { EnvironmentalHazardsPanel } from '../components/hazards/EnvironmentalHazardsPanel';
import { Badge } from '@/components/ui/badge';
import { HudSwitch } from '@/components/common/HudSwitch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Flame, Droplet, Radiation, Zap, Wind, Shield, Activity } from 'lucide-react';
import { useState } from 'react';

export function HazardsTab() {
  const { levels, getAggregateHazard } = useHazardsStore();
  const { systemStyle } = useInfoSettingsStore();
  const markFeatures = useMarkFeatures();
  const [expandedHazards, setExpandedHazards] = useState<string[]>([]);

  const toggleHazard = (hazard: string) => {
    setExpandedHazards((prev) =>
      prev.includes(hazard) ? prev.filter((h) => h !== hazard) : [...prev, hazard]
    );
  };

  const getHazardTitle = () => {
    switch (systemStyle) {
      case 'hecu':
        return 'COMBAT ENVIRONMENT ANALYSIS';
      case 'security':
      case 'guard':
        return 'FACILITY HAZARD MONITORING';
      default:
        return 'ENVIRONMENTAL HAZARDS';
    }
  };

  const getProtectionTitle = () => {
    switch (systemStyle) {
      case 'hecu':
        return 'COMBAT PROTECTION SYSTEMS';
      case 'security':
      case 'guard':
        return 'SAFETY SYSTEMS';
      default:
        return 'PROTECTION SYSTEMS';
    }
  };

  const aggregateHazard = getAggregateHazard();

  const hazardDetails = [
    {
      id: 'fire',
      name: 'Fire / Thermal',
      icon: Flame,
      level: levels.fire,
      color: 'text-orange-500',
      description: 'High temperature exposure and thermal radiation',
      trend: markFeatures.advanced.trendAnalysis ? '+2% over 5min' : null,
      protection: 'Thermal shielding active',
    },
    {
      id: 'bio',
      name: 'Biological',
      icon: Droplet,
      level: levels.bio,
      color: 'text-green-500',
      description: 'Biological contaminants and toxins',
      trend: markFeatures.advanced.trendAnalysis ? 'Stable' : null,
      protection: 'Bio-filter engaged',
    },
    {
      id: 'radiation',
      name: 'Radiation',
      icon: Radiation,
      level: levels.radiation,
      color: 'text-yellow-500',
      description: 'Ionizing radiation exposure',
      trend: markFeatures.advanced.trendAnalysis ? '-1% over 5min' : null,
      protection: 'Rad shielding nominal',
    },
    {
      id: 'electrical',
      name: 'Electrical',
      icon: Zap,
      level: levels.electrical,
      color: 'text-blue-500',
      description: 'Electrical hazards and EMP exposure',
      trend: markFeatures.advanced.trendAnalysis ? 'Stable' : null,
      protection: 'Insulation active',
    },
    {
      id: 'gas',
      name: 'Gas / Chemical',
      icon: Wind,
      level: levels.gas,
      color: 'text-purple-500',
      description: 'Toxic gases and chemical agents',
      trend: markFeatures.advanced.trendAnalysis ? '+3% over 5min' : null,
      protection: 'Respirator online',
    },
  ];

  // Mark I has no hazard tab access
  if (!markFeatures.tabs.hazards) {
    return (
      <div className="tab-content-compact">
        <div className="hud-panel-compact">
          <div className="text-center py-8 opacity-70">
            <Shield className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <div className="font-semibold">HAZARD MONITORING UNAVAILABLE</div>
            <div className="text-xs mt-2">This feature requires Mark II or higher</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tab-content-compact">
      {/* Overview Panel */}
      <div className="hud-panel-compact mb-3">
        <div className="hud-panel-title-compact">{getHazardTitle()}</div>
        <div className="hud-panel-content-compact">
          <EnvironmentalHazardsPanel />
          
          <div className="mt-3 pt-3 border-t border-border/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold">AGGREGATE HAZARD LEVEL</span>
              <Badge variant={aggregateHazard > 70 ? 'destructive' : aggregateHazard > 40 ? 'outline' : 'outline'}>
                {aggregateHazard}%
              </Badge>
            </div>
            <Progress value={aggregateHazard} className="h-2" />
          </div>
        </div>
      </div>

      {/* Detailed Hazard Breakdown - Mark III+ with trend analysis */}
      {markFeatures.advanced.environmentalAnalysis && (
        <div className="space-y-2 mb-3">
          {hazardDetails.map((hazard) => (
            <Collapsible
              key={hazard.id}
              open={expandedHazards.includes(hazard.id)}
              onOpenChange={() => toggleHazard(hazard.id)}
            >
              <div className="hud-panel-compact">
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between p-2 hover:bg-primary/5 transition-colors">
                    <div className="flex items-center gap-2">
                      <hazard.icon className={`w-4 h-4 ${hazard.color}`} />
                      <span className="text-sm font-semibold">{hazard.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={hazard.level > 70 ? 'destructive' : 'outline'} className="text-xs">
                        {hazard.level}%
                      </Badge>
                      <ChevronDown className={`w-4 h-4 transition-transform ${expandedHazards.includes(hazard.id) ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-3 pt-0 space-y-2 text-xs">
                    <div className="opacity-80">{hazard.description}</div>
                    {hazard.trend && (
                      <div className="flex items-center gap-2">
                        <Activity className="w-3 h-3" />
                        <span className="opacity-70">Trend: {hazard.trend}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Shield className="w-3 h-3" />
                      <span className="opacity-70">{hazard.protection}</span>
                    </div>
                    <Progress value={hazard.level} className="h-1.5" />
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
        </div>
      )}

      {/* Protection Systems - Mark III+ */}
      {markFeatures.advanced.environmentalAnalysis && (
        <div className="hud-panel-compact">
          <div className="hud-panel-title-compact">{getProtectionTitle()}</div>
          <div className="hud-panel-content-compact space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="thermal-shield" className="text-xs flex items-center gap-1">
                <Flame className="w-3 h-3" />
                Thermal Shielding
              </Label>
              <HudSwitch id="thermal-shield" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="bio-filter" className="text-xs flex items-center gap-1">
                <Droplet className="w-3 h-3" />
                Bio-Filter
              </Label>
              <HudSwitch id="bio-filter" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="rad-shield" className="text-xs flex items-center gap-1">
                <Radiation className="w-3 h-3" />
                Radiation Shielding
              </Label>
              <HudSwitch id="rad-shield" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="insulation" className="text-xs flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Electrical Insulation
              </Label>
              <HudSwitch id="insulation" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="respirator" className="text-xs flex items-center gap-1">
                <Wind className="w-3 h-3" />
                Respirator System
              </Label>
              <HudSwitch id="respirator" defaultChecked />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
