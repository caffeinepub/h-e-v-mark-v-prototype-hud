import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Crosshair, Zap, Shield } from 'lucide-react';

interface WeaponSpec {
  name: string;
  type: string;
  damage: number;
  range: number;
  penetration: number;
  ammoType: string;
  readiness: number;
}

export function ExpandedWeaponsPanel() {
  const weapons: WeaponSpec[] = [
    {
      name: 'MP5 Submachine Gun',
      type: 'SMG',
      damage: 25,
      range: 150,
      penetration: 40,
      ammoType: '9mm Parabellum',
      readiness: 100,
    },
    {
      name: 'M249 SAW',
      type: 'LMG',
      damage: 30,
      range: 800,
      penetration: 55,
      ammoType: '5.56x45mm NATO',
      readiness: 95,
    },
    {
      name: 'M40A1 Sniper Rifle',
      type: 'Sniper',
      damage: 120,
      range: 1200,
      penetration: 90,
      ammoType: '7.62x51mm NATO',
      readiness: 100,
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-3">
        <Crosshair className="w-4 h-4 text-primary" />
        <span className="text-sm font-semibold">WEAPONS SPECIFICATIONS</span>
      </div>

      {weapons.map((weapon, index) => (
        <div key={index} className="p-3 border border-border hover:border-primary transition-colors">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="font-semibold">{weapon.name}</div>
              <Badge variant="outline" className="text-xs mt-1">
                {weapon.type}
              </Badge>
            </div>
            <Badge variant={weapon.readiness === 100 ? 'default' : 'outline'}>
              {weapon.readiness}% READY
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs mb-2">
            <div>
              <div className="text-primary font-semibold">Damage</div>
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3" />
                <span>{weapon.damage} HP</span>
              </div>
            </div>
            <div>
              <div className="text-primary font-semibold">Effective Range</div>
              <div>{weapon.range}m</div>
            </div>
            <div>
              <div className="text-primary font-semibold">Penetration</div>
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                <span>{weapon.penetration}%</span>
              </div>
            </div>
            <div>
              <div className="text-primary font-semibold">Ammunition</div>
              <div>{weapon.ammoType}</div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span>Operational Readiness</span>
              <span>{weapon.readiness}%</span>
            </div>
            <Progress value={weapon.readiness} className="h-1" />
          </div>
        </div>
      ))}
    </div>
  );
}
