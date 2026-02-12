import { useState } from 'react';
import { useHazardsStore } from '../state/hazardsState';
import { useSuitStore } from '../state/suitState';
import { GLYPHS } from '../lib/glyphs';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
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
    <div className="tab-content">
      <div className="hazards-tab-grid">
        {/* Section 1: Detailed Hazard Breakdown */}
        <div className="hazards-section">
          <div className="tactical-panel">
            <div className="hud-panel-title">
              <div className="flex items-center justify-between">
                <span>DETAILED HAZARD BREAKDOWN</span>
                <div className="flex items-center gap-2">
                  <Label htmlFor="critical-filter" className="text-xs">CRITICAL ONLY</Label>
                  <Switch 
                    id="critical-filter"
                    checked={showCriticalOnly}
                    onCheckedChange={setShowCriticalOnly}
                  />
                </div>
              </div>
            </div>
            <div className="hud-panel-content">
              <div className="hazards-detailed-list">
                {filteredHazards.map(({ key, label, icon, trend, peakLevel, avgLevel, description }) => {
                  const level = levels[key];
                  const status = getHazardStatus(level);
                  const statusClass = getStatusClass(level);
                  const isExpanded = expandedHazard === key;
                  
                  return (
                    <div key={key} className="hazard-detailed-item">
                      <div 
                        className={cn('hazard-detailed-header', statusClass)}
                        onClick={() => setExpandedHazard(isExpanded ? null : key)}
                      >
                        <div className="hazard-detailed-main">
                          <span className="hazard-icon glyph-icon">{icon}</span>
                          <div className="hazard-detailed-info">
                            <div className="hazard-label">{label}</div>
                            <div className="hazard-status-row">
                              <Badge variant={level >= 60 ? 'destructive' : level > 0 ? 'default' : 'outline'} className="hazard-status-badge">
                                {status}
                              </Badge>
                              <span className={cn('hazard-trend', getTrendColor(trend))}>
                                {getTrendIcon(trend)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="hazard-detailed-values">
                          <div className="hazard-level-display">
                            <span className="hazard-level-value">{level}%</span>
                            <span className="hazard-level-label">CURRENT</span>
                          </div>
                          <Button variant="ghost" size="icon" className="hazard-expand-btn">
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                      
                      {isExpanded && (
                        <div className="hazard-detailed-expanded">
                          <Separator className="my-2" />
                          <p className="hazard-description">{description}</p>
                          <div className="hazard-metrics-grid">
                            <div className="hazard-metric">
                              <span className="hazard-metric-label">PEAK ({timeWindow})</span>
                              <span className="hazard-metric-value">{peakLevel}%</span>
                            </div>
                            <div className="hazard-metric">
                              <span className="hazard-metric-label">AVERAGE ({timeWindow})</span>
                              <span className="hazard-metric-value">{avgLevel}%</span>
                            </div>
                            <div className="hazard-metric">
                              <span className="hazard-metric-label">TREND</span>
                              <span className={cn('hazard-metric-value', getTrendColor(trend))}>
                                {trend.toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div className="hazard-level-bar">
                            <div 
                              className={cn('hazard-level-fill', statusClass)}
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
        <div className="hazards-section">
          <div className="tactical-panel">
            <div className="hud-panel-title">
              <div className="flex items-center justify-between">
                <span>ENVIRONMENTAL STATUS</span>
                <Badge variant="outline" className="text-xs">
                  <Activity className="w-3 h-3 mr-1" />
                  LIVE READOUT
                </Badge>
              </div>
            </div>
            <div className="hud-panel-content">
              <div className="env-status-grid">
                {/* Atmosphere Panel */}
                <div className="env-status-panel">
                  <div className="env-status-header">
                    <Shield className="w-4 h-4" />
                    <span>ATMOSPHERE COMPOSITION</span>
                  </div>
                  <div className="env-readouts">
                    <div className="env-readout-row">
                      <span className="env-readout-label">O₂</span>
                      <span className="env-readout-value">{environmentalStatus.atmosphere.oxygen}%</span>
                      <div className="env-readout-bar">
                        <div className="env-readout-fill status-nominal" style={{ width: `${(environmentalStatus.atmosphere.oxygen / 21) * 100}%` }} />
                      </div>
                    </div>
                    <div className="env-readout-row">
                      <span className="env-readout-label">N₂</span>
                      <span className="env-readout-value">{environmentalStatus.atmosphere.nitrogen}%</span>
                      <div className="env-readout-bar">
                        <div className="env-readout-fill status-nominal" style={{ width: `${(environmentalStatus.atmosphere.nitrogen / 78.1) * 100}%` }} />
                      </div>
                    </div>
                    <div className="env-readout-row">
                      <span className="env-readout-label">CO₂</span>
                      <span className="env-readout-value">{environmentalStatus.atmosphere.co2}%</span>
                      <div className="env-readout-bar">
                        <div className="env-readout-fill status-nominal" style={{ width: `${(environmentalStatus.atmosphere.co2 / 0.1) * 100}%` }} />
                      </div>
                    </div>
                    <div className="env-readout-row">
                      <span className="env-readout-label">PRESSURE</span>
                      <span className="env-readout-value">{environmentalStatus.atmosphere.pressure} kPa</span>
                      <div className="env-readout-bar">
                        <div className="env-readout-fill status-nominal" style={{ width: `${(environmentalStatus.atmosphere.pressure / 101.3) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Temperature Panel */}
                <div className="env-status-panel">
                  <div className="env-status-header">
                    <Activity className="w-4 h-4" />
                    <span>TEMPERATURE MONITORING</span>
                  </div>
                  <div className="env-readouts">
                    <div className="env-readout-row">
                      <span className="env-readout-label">AMBIENT</span>
                      <span className="env-readout-value">{environmentalStatus.temperature.ambient}°C</span>
                    </div>
                    <div className="env-readout-row">
                      <span className="env-readout-label">SUIT INTERNAL</span>
                      <span className="env-readout-value">{environmentalStatus.temperature.suit}°C</span>
                    </div>
                    <div className="env-readout-row">
                      <span className="env-readout-label">CORE BODY</span>
                      <span className="env-readout-value">{environmentalStatus.temperature.core}°C</span>
                    </div>
                  </div>
                </div>

                {/* Exposure Panel */}
                <div className="env-status-panel">
                  <div className="env-status-header">
                    <AlertTriangle className="w-4 h-4" />
                    <span>CUMULATIVE EXPOSURE</span>
                  </div>
                  <div className="env-readouts">
                    <div className="env-readout-row">
                      <span className="env-readout-label">TOTAL</span>
                      <span className="env-readout-value">{environmentalStatus.exposure.cumulative} mSv</span>
                    </div>
                    <div className="env-readout-row">
                      <span className="env-readout-label">THRESHOLD</span>
                      <span className="env-readout-value">{environmentalStatus.exposure.threshold} mSv</span>
                    </div>
                    <div className="env-readout-row">
                      <span className="env-readout-label">TIME TO LIMIT</span>
                      <span className="env-readout-value">{environmentalStatus.exposure.timeToLimit}</span>
                    </div>
                    <div className="env-exposure-bar">
                      <div 
                        className="env-exposure-fill"
                        style={{ width: `${(environmentalStatus.exposure.cumulative / environmentalStatus.exposure.threshold) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Protection Systems */}
                <div className="env-status-panel">
                  <div className="env-status-header">
                    <Shield className="w-4 h-4" />
                    <span>PROTECTION SYSTEMS</span>
                  </div>
                  <div className="env-toggles">
                    <div className="env-toggle-row">
                      <Label htmlFor="rad-shield" className="env-toggle-label">RADIATION SHIELD</Label>
                      <Badge variant={modules.radiationShield ? 'default' : 'outline'} className="env-toggle-status">
                        {modules.radiationShield ? 'ACTIVE' : 'OFFLINE'}
                      </Badge>
                    </div>
                    <div className="env-toggle-row">
                      <Label htmlFor="hazard-sys" className="env-toggle-label">HAZARD SYSTEM</Label>
                      <Badge variant={modules.hazardSystem ? 'default' : 'outline'} className="env-toggle-status">
                        {modules.hazardSystem ? 'ACTIVE' : 'OFFLINE'}
                      </Badge>
                    </div>
                    <div className="env-toggle-row">
                      <Label htmlFor="respirator" className="env-toggle-label">RESPIRATOR</Label>
                      <Badge variant={modules.respirator ? 'default' : 'outline'} className="env-toggle-status">
                        {modules.respirator ? 'ACTIVE' : 'OFFLINE'}
                      </Badge>
                    </div>
                    <div className="env-toggle-row">
                      <Label htmlFor="auto-monitor" className="env-toggle-label">AUTO MONITORING</Label>
                      <Switch 
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
        <div className="hazards-section">
          <div className="tactical-panel">
            <div className="hud-panel-title">
              <div className="flex items-center justify-between">
                <span>STATISTICS & ANALYTICS</span>
                <div className="time-window-selector">
                  <Button 
                    variant={timeWindow === '1h' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setTimeWindow('1h')}
                  >
                    1H
                  </Button>
                  <Button 
                    variant={timeWindow === '6h' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setTimeWindow('6h')}
                  >
                    6H
                  </Button>
                  <Button 
                    variant={timeWindow === '24h' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setTimeWindow('24h')}
                  >
                    24H
                  </Button>
                </div>
              </div>
            </div>
            <div className="hud-panel-content">
              <div className="stats-grid">
                {/* Summary Stats */}
                <div className="stats-summary">
                  <div className="stat-card">
                    <div className="stat-card-value">{statistics.totalIncidents}</div>
                    <div className="stat-card-label">TOTAL INCIDENTS</div>
                  </div>
                  <div className="stat-card stat-card-critical">
                    <div className="stat-card-value">{statistics.criticalEvents}</div>
                    <div className="stat-card-label">CRITICAL EVENTS</div>
                  </div>
                  <div className="stat-card stat-card-warning">
                    <div className="stat-card-value">{statistics.warningEvents}</div>
                    <div className="stat-card-label">WARNING EVENTS</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-card-value">{statistics.avgResponseTime}</div>
                    <div className="stat-card-label">AVG RESPONSE</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-card-value">{statistics.systemUptime}</div>
                    <div className="stat-card-label">SYSTEM UPTIME</div>
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Distribution Chart (Text-based) */}
                <div className="stats-distribution">
                  <div className="stats-section-title">HAZARD DISTRIBUTION ({timeWindow})</div>
                  <div className="distribution-bars">
                    {hazards.map(({ key, label }) => {
                      const level = levels[key];
                      return (
                        <div key={key} className="distribution-bar-row">
                          <span className="distribution-label">{label}</span>
                          <div className="distribution-bar">
                            <div 
                              className={cn('distribution-fill', getStatusClass(level))}
                              style={{ width: `${level}%` }}
                            />
                          </div>
                          <span className="distribution-value">{level}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Event Timeline (Sample) */}
                <div className="stats-timeline">
                  <div className="stats-section-title">RECENT EVENTS</div>
                  <div className="timeline-events">
                    <div className="timeline-event">
                      <Badge variant="destructive" className="timeline-badge">CRITICAL</Badge>
                      <span className="timeline-time">-2h 14m</span>
                      <span className="timeline-desc">Radiation spike detected in sector 7</span>
                    </div>
                    <div className="timeline-event">
                      <Badge variant="default" className="timeline-badge">WARNING</Badge>
                      <span className="timeline-time">-4h 32m</span>
                      <span className="timeline-desc">Biohazard levels elevated</span>
                    </div>
                    <div className="timeline-event">
                      <Badge variant="default" className="timeline-badge">WARNING</Badge>
                      <span className="timeline-time">-6h 08m</span>
                      <span className="timeline-desc">Temperature threshold exceeded</span>
                    </div>
                    <div className="timeline-event">
                      <Badge variant="outline" className="timeline-badge">INFO</Badge>
                      <span className="timeline-time">-8h 45m</span>
                      <span className="timeline-desc">Hazard system calibration complete</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
