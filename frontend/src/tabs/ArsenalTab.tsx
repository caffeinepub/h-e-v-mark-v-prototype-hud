import { useInfoSettingsStore } from '@/state/infoSettingsStore';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface Weapon {
  name: string;
  type: string;
  damage: number;
  accuracy: number;
  fireRate: number;
  magazine: number;
  reserve: number;
  range: string;
  reload: number;
  special: string[];
  ammoType: string;
  description: string;
  lore: string;
}

const FACTION_WEAPONS: Record<string, Weapon[]> = {
  hev: [
    {
      name: 'Crowbar',
      type: 'Melee',
      damage: 25,
      accuracy: 100,
      fireRate: 60,
      magazine: 0,
      reserve: 0,
      range: 'Close',
      reload: 0,
      special: ['Silent', 'No Ammo Required'],
      ammoType: 'None',
      description: 'Iconic melee weapon, effective for close combat and breaking obstacles.',
      lore: 'The crowbar has become synonymous with Gordon Freeman, serving as both tool and weapon throughout the Black Mesa incident.',
    },
    {
      name: 'Gravity Gun',
      type: 'Special',
      damage: 0,
      accuracy: 100,
      fireRate: 30,
      magazine: 0,
      reserve: 0,
      range: 'Medium',
      reload: 0,
      special: ['Object Manipulation', 'Supercharge Mode'],
      ammoType: 'None',
      description: 'Zero Point Energy Field Manipulator. Can grab and launch objects.',
      lore: 'Revolutionary physics manipulation device developed at Black Mesa. Can be supercharged by dark energy reactors.',
    },
  ],
  hecu: [
    {
      name: 'MP5',
      type: 'SMG',
      damage: 12,
      accuracy: 75,
      fireRate: 800,
      magazine: 30,
      reserve: 150,
      range: 'Medium',
      reload: 2.5,
      special: ['Grenade Launcher'],
      ammoType: '9mm',
      description: 'Standard HECU submachine gun with attached grenade launcher.',
      lore: 'Reliable weapon used by HECU forces during the Black Mesa incident.',
    },
  ],
  security: [
    {
      name: '9mm Pistol',
      type: 'Handgun',
      damage: 10,
      accuracy: 80,
      fireRate: 300,
      magazine: 17,
      reserve: 68,
      range: 'Short',
      reload: 1.5,
      special: ['Standard Issue'],
      ammoType: '9mm',
      description: 'Standard Black Mesa security sidearm.',
      lore: 'Reliable pistol issued to all Black Mesa security personnel.',
    },
  ],
  combine: [
    {
      name: 'Pulse Rifle',
      type: 'Rifle',
      damage: 15,
      accuracy: 85,
      fireRate: 600,
      magazine: 30,
      reserve: 90,
      range: 'Long',
      reload: 2.0,
      special: ['Energy Orb', 'Vaporize'],
      ammoType: 'Pulse',
      description: 'Combine standard issue energy weapon with secondary fire mode.',
      lore: 'Advanced Combine technology that fires dark energy pulses.',
    },
  ],
};

export function ArsenalTab() {
  const { systemStyle } = useInfoSettingsStore();
  const [selectedWeapon, setSelectedWeapon] = useState<Weapon | null>(null);

  const weapons = FACTION_WEAPONS[systemStyle] || FACTION_WEAPONS.hev;

  return (
    <div className="space-y-6 p-6">
      <div className="bg-black/40 border-2 border-primary/30 p-4">
        <h2 className="text-2xl font-bold text-primary mb-2">ARSENAL</h2>
        <p className="text-sm text-muted-foreground">
          {systemStyle.toUpperCase()} Faction Weapons
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weapon List */}
        <div className="lg:col-span-1 space-y-2">
          {weapons.map((weapon) => (
            <button
              key={weapon.name}
              onClick={() => setSelectedWeapon(weapon)}
              className={`w-full text-left p-4 border-2 transition-all ${
                selectedWeapon?.name === weapon.name
                  ? 'bg-primary/20 border-primary'
                  : 'bg-black/40 border-primary/30 hover:border-primary/50'
              }`}
            >
              <div className="font-bold text-primary">{weapon.name}</div>
              <div className="text-xs text-muted-foreground">{weapon.type}</div>
            </button>
          ))}
        </div>

        {/* Weapon Details */}
        <div className="lg:col-span-2">
          {selectedWeapon ? (
            <div className="bg-black/40 border-2 border-primary/30 p-6 space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-primary mb-2">{selectedWeapon.name}</h3>
                <Badge variant="outline" className="text-primary border-primary">
                  {selectedWeapon.type}
                </Badge>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Damage</span>
                    <span className="text-sm font-bold text-primary">{selectedWeapon.damage}</span>
                  </div>
                  <Progress value={selectedWeapon.damage} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Accuracy</span>
                    <span className="text-sm font-bold text-primary">{selectedWeapon.accuracy}%</span>
                  </div>
                  <Progress value={selectedWeapon.accuracy} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Fire Rate:</span>
                    <span className="ml-2 text-primary font-bold">{selectedWeapon.fireRate} RPM</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Range:</span>
                    <span className="ml-2 text-primary font-bold">{selectedWeapon.range}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Magazine:</span>
                    <span className="ml-2 text-primary font-bold">{selectedWeapon.magazine}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Reserve:</span>
                    <span className="ml-2 text-primary font-bold">{selectedWeapon.reserve}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Reload:</span>
                    <span className="ml-2 text-primary font-bold">{selectedWeapon.reload}s</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Ammo Type:</span>
                    <span className="ml-2 text-primary font-bold">{selectedWeapon.ammoType}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-primary mb-2">Special Attributes</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedWeapon.special.map((attr) => (
                      <Badge key={attr} variant="secondary">
                        {attr}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-primary mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">{selectedWeapon.description}</p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-primary mb-2">Lore</h4>
                  <p className="text-sm text-muted-foreground italic">{selectedWeapon.lore}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-black/40 border-2 border-primary/30 p-6 flex items-center justify-center h-full">
              <p className="text-muted-foreground">Select a weapon to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
