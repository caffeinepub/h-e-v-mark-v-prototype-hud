import { useState } from 'react';
import { useHazardsStore } from '../state/hazardsState';
import { useSuitStore } from '../state/suitState';
import { GLYPHS } from '../lib/glyphs';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HudSwitch } from '@/components/common/HudSwitch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ChevronDown, ChevronUp, Activity, AlertTriangle, Shield, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export function HazardsTab() {
  const { levels, getHazardStatus } = useHazardsStore();
  const { modules } = useSuitStore();
  
  const [expandedHazard, setExpandedHazard] = useState<string | null>(null);
  const [timeWindow, setTimeWindow] = useState<'1h' | '6h' | '24h'>('6h');
  const [showCriticalOnly, setShowCriticalOnly] = useState(false);
  const [autoMonitor, setAutoMonitor] = useState(true);

  const hazards = [
    { 
      key: 'fire' as const, 
      label: 'FIRE/TEMPERATURE', 
      icon: GLYPHS.fire,
      trend: 'stable' as const,
      peakLevel: 45,
      avgLevel: 12,
      description: 'Thermal hazard monitoring including ambient temperature, heat sources, and fire detection systems.'
    },
    { 
      key: 'bio' as const, 
      label: 'BIOHAZARD', 
      icon: GLYPHS.bio,
      trend: 'rising' as const,
      peakLevel: 28,
      avgLevel: 8,
      description: 'Biological contamination detection including pathogens, toxins, and infectious materials.'
    },
    { 
      key: 'radiation' as const, 
      label: 'RADIATION', 
      icon: GLYPHS.radiation,
      trend: 'falling' as const,
      peakLevel: 67,
      avgLevel: 22,
      description: 'Ionizing radiation monitoring across alpha, beta, gamma, and neutron spectrums.'
    },
    { 
      key: 'electrical' as const, 
      label: 'ELECTRICAL', 
      icon: GLYPHS.electrical,
      trend: 'stable' as const,
      peakLevel: 15,
      avgLevel: 5,
      description: 'Electrical hazard detection including voltage spikes, arc flash, and electromagnetic interference.'
    },
    { 
      key: 'gas' as const, 
      label: 'TOXIC GAS', 
      icon: GLYPHS.gas,
      trend: 'rising' as const,
      peakLevel: 38,
      avgLevel: 14,
      description: 'Atmospheric contamination monitoring for toxic, corrosive, and asphyxiant gases.'
    },
  ];

  const getStatusClass = (level: number) => {
    if (level === 0) return 'status-nominal';
    if (level < 60) return 'status-warning';
    return 'status-critical';
  };

  const getTrendIcon = (trend: 'rising' | 'falling' | 'stable') => {
    if (trend === 'rising') return <TrendingUp className="w-4 h-4" />;
    if (trend === 'falling') return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getTrendColor = (trend: 'rising' | 'falling' | 'stable') => {
    if (trend === 'rising') return 'text-warning';
    if (trend === 'falling') return 'text-primary';
    return 'text-muted-foreground';
  };

  // Environmental status readouts (UI-only sample values)
  const environmentalStatus = {
    atmosphere: {
      oxygen: 20.9,
      nitrogen: 78.1,
      co2: 0.04,
      pressure: 101.3,
    },
    temperature: {
      ambient: 22,
      suit: 21,
      core: 37.2,
    },
    exposure: {
      cumulative: 12.4,
      threshold: 100,
      timeToLimit: '47h 23m',
    },
  };

  // Statistics (UI-only sample values)
  const statistics = {
    totalIncidents: 47,
    criticalEvents: 3,
    warningEvents: 18,
    avgResponseTime: '2.3s',
    systemUptime: '99.7%',
  };

  const filteredHazards = showCriticalOnly 
    ? hazards.filter(h => levels[h.key] >= 60)
    : hazards;

  return (
    <div className="tab-content-compact">
      <div className="hazards-tab-grid-compact">
        {/* Section 1: Detailed Hazard Breakdown */}
        <div className="hazards-section-compact">
          <div className="hud-panel-compact">
            <div className="hud-panel-title-compact">
              <div className="flex items-center justify-between">
                <span>DETAILED HAZARD BREAKDOWN</span>
                <div className="flex items-center gap-2">
                  <Label htmlFor="critical-filter" className="text-xs">CRITICAL ONLY</Label>
                  <HudSwitch 
                    id="critical-filter"
                    checked={showCriticalOnly}
                    onCheckedChange={setShowCriticalOnly}
                  />
                </div>
              </div>
            </div>
            <div className="hud-panel-content-compact">
              <div className="hazards-detailed-list-compact">
                {filteredHazards.map(({ key, label, icon, trend, peakLevel, avgLevel, description }) => {
                  const level = levels[key];
                  const status = getHazardStatus(level);
                  const statusClass = getStatusClass(level);
                  const isExpanded = expandedHazard === key;
                  
                  return (
                    <div key={key} className="hazard-detailed-item-compact">
                      <div 
                        className={cn('hazard-detailed-header-compact', statusClass)}
                        onClick={() => setExpandedHazard(isExpanded ? null : key)}
                      >
                        <div className="hazard-detailed-main-compact">
                          <span className="hazard-icon-compact glyph-icon">{icon}</span>
                          <div className="hazard-detailed-info-compact">
                            <div className="hazard-label-compact">{label}</div>
                            <div className="hazard-status-row-compact">
                              <Badge variant={level >= 60 ? 'destructive' : level > 0 ? 'default' : 'outline'} className="hazard-status-badge-compact">
                                {status}
                              </Badge>
                              <span className={cn('hazard-trend-compact', getTrendColor(trend))}>
                                {getTrendIcon(trend)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="hazard-detailed-values-compact">
                          <div className="hazard-level-display-compact">
                            <span className="hazard-level-value-compact">{level}%</span>
                            <span className="hazard-level-label-compact">CURRENT</span>
                          </div>
                          <Button variant="ghost" size="icon" className="hazard-expand-btn-compact">
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                      
                      {isExpanded && (
                        <div className="hazard-detailed-expanded-compact">
                          <Separator className="my-2" />
                          <p className="hazard-description-compact">{description}</p>
                          <div className="hazard-metrics-grid-compact">
                            <div className="hazard-metric-compact">
                              <span className="hazard-metric-label-compact">PEAK ({timeWindow})</span>
                              <span className="hazard-metric-value-compact">{peakLevel}%</span>
                            </div>
                            <div className="hazard-metric-compact">
                              <span className="hazard-metric-label-compact">AVERAGE ({timeWindow})</span>
                              <span className="hazard-metric-value-compact">{avgLevel}%</span>
                            </div>
                            <div className="hazard-metric-compact">
                              <span className="hazard-metric-label-compact">TREND</span>
                              <span className={cn('hazard-metric-value-compact', getTrendColor(trend))}>
                                {trend.toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div className="hazard-level-bar-compact">
                            <div 
                              className={cn('hazard-level-fill-compact', statusClass)}
                              style={{ width: `${level}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Environmental Status */}
        <div className="hazards-section-compact">
          <div className="hud-panel-compact">
            <div className="hud-panel-title-compact">
              <div className="flex items-center justify-between">
                <span>ENVIRONMENTAL STATUS</span>
                <Badge variant="outline" className="text-xs">
                  <Activity className="w-3 h-3 mr-1" />
                  LIVE READOUT
                </Badge>
              </div>
            </div>
            <div className="hud-panel-content-compact">
              <div className="env-status-grid-compact">
                {/* Atmosphere Panel */}
                <div className="env-status-panel-compact">
                  <div className="env-status-header-compact">
                    <Shield className="w-4 h-4" />
                    <span>ATMOSPHERE COMPOSITION</span>
                  </div>
                  <div className="env-readouts-compact">
                    <div className="env-readout-row-compact">
                      <span className="env-readout-label-compact">O₂</span>
                      <span className="env-readout-value-compact">{environmentalStatus.atmosphere.oxygen}%</span>
                      <div className="env-readout-bar-compact">
                        <div className="env-readout-fill-compact status-nominal" style={{ width: `${(environmentalStatus.atmosphere.oxygen / 21) * 100}%` }} />
                      </div>
                    </div>
                    <div className="env-readout-row-compact">
                      <span className="env-readout-label-compact">N₂</span>
                      <span className="env-readout-value-compact">{environmentalStatus.atmosphere.nitrogen}%</span>
                      <div className="env-readout-bar-compact">
                        <div className="env-readout-fill-compact status-nominal" style={{ width: `${(environmentalStatus.atmosphere.nitrogen / 78.1) * 100}%` }} />
                      </div>
                    </div>
                    <div className="env-readout-row-compact">
                      <span className="env-readout-label-compact">CO₂</span>
                      <span className="env-readout-value-compact">{environmentalStatus.atmosphere.co2}%</span>
                      <div className="env-readout-bar-compact">
                        <div className="env-readout-fill-compact status-nominal" style={{ width: `${(environmentalStatus.atmosphere.co2 / 0.1) * 100}%` }} />
                      </div>
                    </div>
                    <div className="env-readout-row-compact">
                      <span className="env-readout-label-compact">PRESSURE</span>
                      <span className="env-readout-value-compact">{environmentalStatus.atmosphere.pressure} kPa</span>
                      <div className="env-readout-bar-compact">
                        <div className="env-readout-fill-compact status-nominal" style={{ width: `${(environmentalStatus.atmosphere.pressure / 101.3) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Temperature Panel */}
                <div className="env-status-panel-compact">
                  <div className="env-status-header-compact">
                    <Activity className="w-4 h-4" />
                    <span>TEMPERATURE MONITORING</span>
                  </div>
                  <div className="env-readouts-compact">
                    <div className="env-readout-row-compact">
                      <span className="env-readout-label-compact">AMBIENT</span>
                      <span className="env-readout-value-compact">{environmentalStatus.temperature.ambient}°C</span>
                    </div>
                    <div className="env-readout-row-compact">
                      <span className="env-readout-label-compact">SUIT INTERNAL</span>
                      <span className="env-readout-value-compact">{environmentalStatus.temperature.suit}°C</span>
                    </div>
                    <div className="env-readout-row-compact">
                      <span className="env-readout-label-compact">CORE BODY</span>
                      <span className="env-readout-value-compact">{environmentalStatus.temperature.core}°C</span>
                    </div>
                  </div>
                </div>

                {/* Exposure Panel */}
                <div className="env-status-panel-compact">
                  <div className="env-status-header-compact">
                    <AlertTriangle className="w-4 h-4" />
                    <span>CUMULATIVE EXPOSURE</span>
                  </div>
                  <div className="env-readouts-compact">
                    <div className="env-readout-row-compact">
                      <span className="env-readout-label-compact">TOTAL</span>
                      <span className="env-readout-value-compact">{environmentalStatus.exposure.cumulative} mSv</span>
                    </div>
                    <div className="env-readout-row-compact">
                      <span className="env-readout-label-compact">THRESHOLD</span>
                      <span className="env-readout-value-compact">{environmentalStatus.exposure.threshold} mSv</span>
                    </div>
                    <div className="env-readout-row-compact">
                      <span className="env-readout-label-compact">TIME TO LIMIT</span>
                      <span className="env-readout-value-compact">{environmentalStatus.exposure.timeToLimit}</span>
                    </div>
                    <div className="env-exposure-bar-compact">
                      <div 
                        className="env-exposure-fill-compact"
                        style={{ width: `${(environmentalStatus.exposure.cumulative / environmentalStatus.exposure.threshold) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Protection Systems */}
                <div className="env-status-panel-compact">
                  <div className="env-status-header-compact">
                    <Shield className="w-4 h-4" />
                    <span>PROTECTION SYSTEMS</span>
                  </div>
                  <div className="env-toggles-compact">
                    <div className="env-toggle-row-compact">
                      <Label htmlFor="rad-shield" className="env-toggle-label-compact">RADIATION SHIELD</Label>
                      <Badge variant={modules.radiationShield ? 'default' : 'outline'} className="env-toggle-status-compact">
                        {modules.radiationShield ? 'ACTIVE' : 'OFFLINE'}
                      </Badge>
                    </div>
                    <div className="env-toggle-row-compact">
                      <Label htmlFor="hazard-sys" className="env-toggle-label-compact">HAZARD SYSTEM</Label>
                      <Badge variant={modules.hazardSystem ? 'default' : 'outline'} className="env-toggle-status-compact">
                        {modules.hazardSystem ? 'ACTIVE' : 'OFFLINE'}
                      </Badge>
                    </div>
                    <div className="env-toggle-row-compact">
                      <Label htmlFor="respirator" className="env-toggle-label-compact">RESPIRATOR</Label>
                      <Badge variant={modules.respirator ? 'default' : 'outline'} className="env-toggle-status-compact">
                        {modules.respirator ? 'ACTIVE' : 'OFFLINE'}
                      </Badge>
                    </div>
                    <div className="env-toggle-row-compact">
                      <Label htmlFor="auto-monitor" className="env-toggle-label-compact">AUTO MONITORING</Label>
                      <HudSwitch 
                        id="auto-monitor"
                        checked={autoMonitor}
                        onCheckedChange={setAutoMonitor}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Statistics & Analytics */}
        <div className="hazards-section-compact">
          <div className="hud-panel-compact">
            <div className="hud-panel-title-compact">
              <div className="flex items-center justify-between">
                <span>STATISTICS & ANALYTICS</span>
                <div className="flex gap-1">
                  <Button 
                    variant={timeWindow === '1h' ? 'default' : 'outline'} 
                    size="sm" 
                    className="time-window-btn-compact"
                    onClick={() => setTimeWindow('1h')}
                  >
                    1H
                  </Button>
                  <Button 
                    variant={timeWindow === '6h' ? 'default' : 'outline'} 
                    size="sm" 
                    className="time-window-btn-compact"
                    onClick={() => setTimeWindow('6h')}
                  >
                    6H
                  </Button>
                  <Button 
                    variant={timeWindow === '24h' ? 'default' : 'outline'} 
                    size="sm" 
                    className="time-window-btn-compact"
                    onClick={() => setTimeWindow('24h')}
                  >
                    24H
                  </Button>
                </div>
              </div>
            </div>
            <div className="hud-panel-content-compact">
              <div className="stats-grid-compact">
                <div className="stat-card-compact">
                  <div className="stat-card-label-compact">TOTAL INCIDENTS</div>
                  <div className="stat-card-value-compact">{statistics.totalIncidents}</div>
                </div>
                <div className="stat-card-compact critical">
                  <div className="stat-card-label-compact">CRITICAL EVENTS</div>
                  <div className="stat-card-value-compact">{statistics.criticalEvents}</div>
                </div>
                <div className="stat-card-compact warning">
                  <div className="stat-card-label-compact">WARNING EVENTS</div>
                  <div className="stat-card-value-compact">{statistics.warningEvents}</div>
                </div>
                <div className="stat-card-compact">
                  <div className="stat-card-label-compact">AVG RESPONSE</div>
                  <div className="stat-card-value-compact">{statistics.avgResponseTime}</div>
                </div>
                <div className="stat-card-compact">
                  <div className="stat-card-label-compact">SYSTEM UPTIME</div>
                  <div className="stat-card-value-compact">{statistics.systemUptime}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
