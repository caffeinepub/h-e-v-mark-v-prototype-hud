import { useState } from 'react';
import { useInfoSettingsStore } from '@/state/infoSettingsStore';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, Circle, MapPin, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MissionBriefingDisplay() {
  const { systemStyle } = useInfoSettingsStore();
  const [expandedObjective, setExpandedObjective] = useState<number | null>(null);

  const objectives = [
    { id: 1, title: 'Reach Surface Level', status: 'complete', priority: 'HIGH' },
    { id: 2, title: 'Locate Emergency Exit', status: 'active', priority: 'HIGH' },
    { id: 3, title: 'Avoid Hostile Contacts', status: 'pending', priority: 'MEDIUM' },
    { id: 4, title: 'Maintain Suit Integrity', status: 'active', priority: 'CRITICAL' },
  ];

  const waypoints = [
    { name: 'SECTOR C', distance: '127m', bearing: '045°' },
    { name: 'EMERGENCY SHAFT', distance: '342m', bearing: '112°' },
  ];

  const getTitle = () => {
    switch (systemStyle) {
      case 'hecu': return 'MISSION BRIEFING';
      case 'guard': return 'SECURITY OBJECTIVES';
      default: return 'MISSION OBJECTIVES';
    }
  };

  return (
    <div className="hud-panel-compact mission-briefing-panel">
      <div className="hud-panel-title-compact flex items-center gap-2">
        <Target className="w-4 h-4" />
        {getTitle()}
      </div>
      <div className="hud-panel-content-compact space-y-3">
        <div className="space-y-2">
          {objectives.map((obj) => (
            <div 
              key={obj.id}
              className="objective-item border border-border/30 rounded p-2 hover:bg-primary/5 transition-colors cursor-pointer"
              onClick={() => setExpandedObjective(expandedObjective === obj.id ? null : obj.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {obj.status === 'complete' ? (
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  ) : (
                    <Circle className="w-4 h-4" />
                  )}
                  <span className="text-xs font-semibold">{obj.title}</span>
                </div>
                <Badge 
                  variant="outline" 
                  className={cn(
                    'text-xs',
                    obj.priority === 'CRITICAL' && 'status-critical',
                    obj.priority === 'HIGH' && 'status-warning',
                    obj.priority === 'MEDIUM' && 'status-nominal'
                  )}
                >
                  {obj.priority}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        <div className="waypoints-section">
          <div className="text-xs font-semibold mb-2 flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            WAYPOINTS
          </div>
          <div className="space-y-1">
            {waypoints.map((wp, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs p-1 hover:bg-primary/5 rounded">
                <span className="font-mono">{wp.name}</span>
                <span className="opacity-70">{wp.distance} @ {wp.bearing}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
