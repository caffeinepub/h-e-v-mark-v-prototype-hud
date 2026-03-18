import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, Heart, Shield, Radio } from 'lucide-react';

interface SquadMember {
  id: string;
  callsign: string;
  role: string;
  health: number;
  armor: number;
  status: 'active' | 'wounded' | 'kia';
  position: string;
}

export function SquadStatusPanel() {
  const squad: SquadMember[] = [
    { id: '1', callsign: 'ALPHA-1', role: 'Squad Leader', health: 100, armor: 85, status: 'active', position: 'Point' },
    { id: '2', callsign: 'ALPHA-2', role: 'Rifleman', health: 75, armor: 60, status: 'wounded', position: 'Left Flank' },
    { id: '3', callsign: 'ALPHA-3', role: 'Medic', health: 90, armor: 70, status: 'active', position: 'Center' },
    { id: '4', callsign: 'ALPHA-4', role: 'Heavy Weapons', health: 100, armor: 95, status: 'active', position: 'Rear Guard' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'wounded':
        return 'destructive';
      case 'kia':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-3">
        <Users className="w-4 h-4 text-primary" />
        <span className="text-sm font-semibold">SQUAD STATUS</span>
        <Badge variant="outline" className="ml-auto">ALPHA TEAM</Badge>
      </div>

      {squad.map((member) => (
        <div key={member.id} className="p-3 border border-border">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="font-semibold">{member.callsign}</div>
              <div className="text-xs opacity-70">{member.role}</div>
            </div>
            <Badge variant={getStatusColor(member.status)}>
              {member.status.toUpperCase()}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-2">
            <div>
              <div className="flex items-center gap-1 text-xs mb-1">
                <Heart className="w-3 h-3 text-destructive" />
                <span>Health: {member.health}%</span>
              </div>
              <Progress value={member.health} className="h-1" />
            </div>
            <div>
              <div className="flex items-center gap-1 text-xs mb-1">
                <Shield className="w-3 h-3 text-primary" />
                <span>Armor: {member.armor}%</span>
              </div>
              <Progress value={member.armor} className="h-1" />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1">
              <Radio className="w-3 h-3" />
              <span>Position: {member.position}</span>
            </div>
            <Badge variant="outline" className="text-xs">COMMS OK</Badge>
          </div>
        </div>
      ))}
    </div>
  );
}
