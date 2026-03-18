import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lock, Unlock, AlertTriangle, Shield } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface DoorStatus {
  id: string;
  name: string;
  status: 'locked' | 'unlocked' | 'override';
  clearanceLevel: number;
}

export function AccessControlPanel() {
  const [lockdownActive, setLockdownActive] = useState(false);
  const [doors] = useState<DoorStatus[]>([
    { id: 'door-01', name: 'Sector C Main', status: 'locked', clearanceLevel: 3 },
    { id: 'door-02', name: 'Anomalous Materials', status: 'locked', clearanceLevel: 4 },
    { id: 'door-03', name: 'Security Office', status: 'unlocked', clearanceLevel: 2 },
    { id: 'door-04', name: 'Emergency Exit', status: 'unlocked', clearanceLevel: 1 },
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'locked':
        return <Lock className="w-4 h-4 text-primary" />;
      case 'unlocked':
        return <Unlock className="w-4 h-4 text-accent" />;
      case 'override':
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default:
        return <Lock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4" />
          <span className="text-sm font-semibold">ACCESS CONTROL</span>
        </div>
        <Button
          variant={lockdownActive ? 'destructive' : 'outline'}
          size="sm"
          onClick={() => setLockdownActive(!lockdownActive)}
        >
          {lockdownActive ? 'RELEASE LOCKDOWN' : 'INITIATE LOCKDOWN'}
        </Button>
      </div>

      {lockdownActive && (
        <div className="p-3 border-2 border-destructive bg-destructive/10">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            <span className="font-semibold text-destructive">FACILITY LOCKDOWN ACTIVE</span>
          </div>
          <div className="text-xs opacity-90">All non-essential access points secured. Emergency protocols in effect.</div>
        </div>
      )}

      <div className="space-y-2">
        <div className="text-xs font-semibold text-primary mb-2">DOOR STATUS</div>
        {doors.map((door) => (
          <div key={door.id} className="flex items-center justify-between p-2 border border-border">
            <div className="flex items-center gap-3">
              {getStatusIcon(door.status)}
              <div>
                <div className="text-sm font-semibold">{door.name}</div>
                <div className="text-xs opacity-70">Clearance Level {door.clearanceLevel}</div>
              </div>
            </div>
            <Badge variant={door.status === 'locked' ? 'outline' : 'default'}>
              {door.status.toUpperCase()}
            </Badge>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <div className="text-xs font-semibold text-primary">SECURITY CLEARANCE VERIFICATION</div>
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span>Current Clearance</span>
            <Badge>LEVEL 3</Badge>
          </div>
          <Progress value={75} className="h-2" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2 border border-border">
          <div className="font-semibold text-primary">Emergency Protocol</div>
          <div className="opacity-70">STANDBY</div>
        </div>
        <div className="p-2 border border-border">
          <div className="font-semibold text-primary">Override Status</div>
          <div className="opacity-70">DISABLED</div>
        </div>
      </div>
    </div>
  );
}
