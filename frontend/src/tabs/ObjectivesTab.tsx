import { useState } from 'react';
import { useInfoSettingsStore } from '@/state/infoSettingsStore';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Target, MapPin, Clock, AlertCircle } from 'lucide-react';

interface Objective {
  id: string;
  title: string;
  description: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'active' | 'completed' | 'failed';
  optional: boolean;
  location: string;
  distance: number;
  bearing: number;
  estimatedTime: number;
  rewards: string[];
}

const FACTION_OBJECTIVES: Record<string, Objective[]> = {
  hev: [
    {
      id: 'hev-1',
      title: 'Reach Lambda Complex',
      description: 'Navigate through the facility to reach the Lambda Complex teleportation labs.',
      priority: 'CRITICAL',
      status: 'active',
      optional: false,
      location: 'Sector C',
      distance: 450,
      bearing: 270,
      estimatedTime: 15,
      rewards: ['Access to teleportation technology', 'Xen portal activation'],
    },
    {
      id: 'hev-2',
      title: 'Collect Xen Samples',
      description: 'Gather biological samples from Xen creatures for research purposes.',
      priority: 'MEDIUM',
      status: 'active',
      optional: true,
      location: 'Anomalous Materials',
      distance: 200,
      bearing: 180,
      estimatedTime: 10,
      rewards: ['Research data', 'Scientific achievement'],
    },
  ],
  hecu: [
    {
      id: 'hecu-1',
      title: 'Secure Sector D',
      description: 'Eliminate all hostile targets and secure the sector perimeter.',
      priority: 'CRITICAL',
      status: 'active',
      optional: false,
      location: 'Sector D',
      distance: 300,
      bearing: 90,
      estimatedTime: 20,
      rewards: ['Sector control', 'Tactical advantage'],
    },
    {
      id: 'hecu-2',
      title: 'Eliminate Witnesses',
      description: 'Neutralize all civilian personnel with knowledge of the incident.',
      priority: 'HIGH',
      status: 'active',
      optional: false,
      location: 'Various',
      distance: 0,
      bearing: 0,
      estimatedTime: 30,
      rewards: ['Mission success', 'Information containment'],
    },
  ],
  security: [
    {
      id: 'sec-1',
      title: 'Restore Facility Power',
      description: 'Reactivate the main power grid to restore facility operations.',
      priority: 'CRITICAL',
      status: 'active',
      optional: false,
      location: 'Power Plant',
      distance: 500,
      bearing: 45,
      estimatedTime: 25,
      rewards: ['Facility power restored', 'Systems online'],
    },
    {
      id: 'sec-2',
      title: 'Evacuate Personnel',
      description: 'Guide remaining staff to designated evacuation points.',
      priority: 'HIGH',
      status: 'active',
      optional: false,
      location: 'Multiple Sectors',
      distance: 0,
      bearing: 0,
      estimatedTime: 40,
      rewards: ['Lives saved', 'Evacuation complete'],
    },
  ],
};

export function ObjectivesTab() {
  const { systemStyle } = useInfoSettingsStore();
  const [objectives, setObjectives] = useState<Objective[]>(
    FACTION_OBJECTIVES[systemStyle] || FACTION_OBJECTIVES.hev
  );

  const toggleObjectiveStatus = (id: string) => {
    setObjectives((prev) =>
      prev.map((obj) =>
        obj.id === id
          ? { ...obj, status: obj.status === 'completed' ? 'active' : 'completed' }
          : obj
      )
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'CRITICAL':
        return 'bg-red-500/20 text-red-500 border-red-500';
      case 'HIGH':
        return 'bg-orange-500/20 text-orange-500 border-orange-500';
      case 'MEDIUM':
        return 'bg-yellow-500/20 text-yellow-500 border-yellow-500';
      case 'LOW':
        return 'bg-green-500/20 text-green-500 border-green-500';
      default:
        return 'bg-primary/20 text-primary border-primary';
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="bg-black/40 border-2 border-primary/30 p-4">
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-primary">MISSION OBJECTIVES</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          {systemStyle.toUpperCase()} Faction Missions
        </p>
      </div>

      <div className="space-y-4">
        {objectives.map((objective) => (
          <div
            key={objective.id}
            className={`bg-black/40 border-2 p-6 transition-all ${
              objective.status === 'completed'
                ? 'border-green-500/50 opacity-75'
                : 'border-primary/30'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4 flex-1">
                <Checkbox
                  checked={objective.status === 'completed'}
                  onCheckedChange={() => toggleObjectiveStatus(objective.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-primary">{objective.title}</h3>
                    {objective.optional && (
                      <Badge variant="outline" className="text-xs">
                        OPTIONAL
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{objective.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground">Location</div>
                        <div className="text-primary font-bold">{objective.location}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground">Distance</div>
                        <div className="text-primary font-bold">{objective.distance}m</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground">Bearing</div>
                        <div className="text-primary font-bold">{objective.bearing}°</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground">Est. Time</div>
                        <div className="text-primary font-bold">{objective.estimatedTime}m</div>
                      </div>
                    </div>
                  </div>

                  {objective.rewards.length > 0 && (
                    <div className="mt-4">
                      <div className="text-xs text-muted-foreground mb-2">Rewards:</div>
                      <div className="flex flex-wrap gap-2">
                        {objective.rewards.map((reward, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {reward}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Badge className={getPriorityColor(objective.priority)}>{objective.priority}</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
