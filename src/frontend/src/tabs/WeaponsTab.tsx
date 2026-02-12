import { useState } from 'react';
import { useWeaponSystemsStore } from '../state/weaponSystemsState';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { uiSfx } from '../audio/uiSfx';
import { cn } from '@/lib/utils';

interface WeaponData {
  id: string;
  name: string;
  ammoTypes: string[];
  fireRates: string[];
  basicInfo: string;
  lore: string;
  altFire: string;
  capabilities: string[];
  useCases: string[];
}

const WEAPONS: WeaponData[] = [
  {
    id: 'crowbar',
    name: 'CROWBAR',
    ammoTypes: ['NONE'],
    fireRates: ['MELEE'],
    basicInfo: 'Standard issue melee weapon. Effective for close-quarters combat and breaching operations.',
    lore: 'A trusted companion since Black Mesa. This reinforced titanium crowbar has saved countless lives in the field.',
    altFire: 'Heavy swing with increased damage and knockback.',
    capabilities: ['Silent operation', 'Unlimited use', 'Structural breaching', 'Close combat'],
    useCases: ['Stealth operations', 'Conserving ammunition', 'Breaking obstacles', 'Emergency defense'],
  },
  {
    id: 'pistol',
    name: 'PISTOL',
    ammoTypes: ['9MM', '.45 ACP'],
    fireRates: ['SEMI-AUTO'],
    basicInfo: 'Reliable sidearm with moderate stopping power. Accurate at medium range.',
    lore: 'Standard issue for all field operatives. Modified with enhanced barrel rifling for improved accuracy.',
    altFire: 'Precision aim mode with reduced recoil.',
    capabilities: ['High accuracy', 'Fast reload', 'Low recoil', 'Reliable performance'],
    useCases: ['Medium-range engagements', 'Backup weapon', 'Headshot precision', 'Ammo conservation'],
  },
  {
    id: 'magnum',
    name: 'MAGNUM',
    ammoTypes: ['.357', '.44'],
    fireRates: ['SEMI-AUTO'],
    basicInfo: 'High-caliber revolver with devastating stopping power. Limited capacity.',
    lore: 'Recovered from Combine armories. Each round carries enough force to penetrate light armor.',
    altFire: 'Fan the hammer for rapid successive shots.',
    capabilities: ['Extreme damage', 'Armor penetration', 'Long range accuracy', 'Intimidation factor'],
    useCases: ['Heavy targets', 'Armored enemies', 'Long-range precision', 'Critical situations'],
  },
  {
    id: 'smg',
    name: 'SMG',
    ammoTypes: ['9MM', '.45 ACP'],
    fireRates: ['AUTO', 'BURST'],
    basicInfo: 'Compact submachine gun with high rate of fire. Effective in close to medium range.',
    lore: 'Resistance-modified weapon system. Integrated grenade launcher adds tactical versatility.',
    altFire: 'Launch contact grenades for area denial.',
    capabilities: ['High fire rate', 'Grenade launcher', 'Mobility', 'Suppressive fire'],
    useCases: ['Close-quarters combat', 'Crowd control', 'Mobile engagements', 'Suppression'],
  },
  {
    id: 'shotgun',
    name: 'SHOTGUN',
    ammoTypes: ['12 GAUGE', 'SLUG'],
    fireRates: ['PUMP'],
    basicInfo: 'Pump-action shotgun delivering devastating close-range damage. Dual-barrel configuration.',
    lore: 'Modified SPAS-12 platform. Double-barrel mode can clear entire rooms in seconds.',
    altFire: 'Fire both barrels simultaneously for maximum damage.',
    capabilities: ['Extreme close damage', 'Wide spread', 'Double-barrel burst', 'Stopping power'],
    useCases: ['Room clearing', 'Close defense', 'Heavy targets', 'Breaching'],
  },
  {
    id: 'crossbow',
    name: 'CROSSBOW',
    ammoTypes: ['BOLT', 'TRANQ'],
    fireRates: ['SINGLE'],
    basicInfo: 'Silent precision weapon with scope. Bolts can pin targets to surfaces.',
    lore: 'Resistance engineering marvel. Heated bolts can penetrate Combine armor with surgical precision.',
    altFire: 'Zoom scope for long-range targeting.',
    capabilities: ['Silent operation', 'Pinning effect', 'Scope zoom', 'Armor penetration'],
    useCases: ['Stealth eliminations', 'Long-range sniping', 'Silent operations', 'Precision targeting'],
  },
  {
    id: 'ar2',
    name: 'AR2',
    ammoTypes: ['PULSE', 'ENERGY'],
    fireRates: ['AUTO', 'BURST'],
    basicInfo: 'Combine pulse rifle. Energy-based weapon system with integrated energy ball launcher.',
    lore: 'Captured Combine technology. The energy orb can disintegrate organic matter on contact.',
    altFire: 'Launch energy orb that vaporizes targets.',
    capabilities: ['Energy damage', 'No bullet drop', 'Orb launcher', 'High capacity'],
    useCases: ['All-purpose combat', 'Energy barriers', 'Group elimination', 'Combine forces'],
  },
  {
    id: 'rpg',
    name: 'RPG',
    ammoTypes: ['ROCKET', 'GUIDED'],
    fireRates: ['SINGLE'],
    basicInfo: 'Rocket-propelled grenade launcher. Laser-guided targeting system for precision strikes.',
    lore: 'Resistance-modified launcher with Combine targeting tech. Can lock onto aerial threats.',
    altFire: 'Laser guidance system for precision targeting.',
    capabilities: ['Massive damage', 'Laser guidance', 'Vehicle destruction', 'Area effect'],
    useCases: ['Vehicle elimination', 'Fortification destruction', 'Aerial targets', 'Heavy armor'],
  },
  {
    id: 'grenade',
    name: 'GRENADE',
    ammoTypes: ['FRAG', 'FLASH'],
    fireRates: ['THROW'],
    basicInfo: 'Throwable explosive devices. Multiple types available for tactical situations.',
    lore: 'Standard resistance ordnance. Modified fuses allow for precise detonation timing.',
    altFire: 'Roll grenade for silent deployment.',
    capabilities: ['Area damage', 'Timed detonation', 'Bounce physics', 'Multiple types'],
    useCases: ['Area denial', 'Flushing enemies', 'Distraction', 'Fortification assault'],
  },
  {
    id: 'gravitygun',
    name: 'GRAVITY GUN',
    ammoTypes: ['NONE'],
    fireRates: ['SPECIAL'],
    basicInfo: 'Zero Point Energy Field Manipulator. Can manipulate objects and organic matter.',
    lore: 'Black Mesa prototype. The dark energy core allows manipulation of matter at the quantum level.',
    altFire: 'Punt objects with explosive force.',
    capabilities: ['Object manipulation', 'Organic repulsion', 'Environmental interaction', 'Unlimited use'],
    useCases: ['Puzzle solving', 'Environmental combat', 'Object throwing', 'Crowd control'],
  },
];

export function WeaponsTab() {
  const {
    selectedWeapon,
    selectedAmmoType,
    selectedFireRate,
    setSelectedWeapon,
    setSelectedAmmoType,
    setSelectedFireRate,
  } = useWeaponSystemsStore();
  const [ammoCount] = useState({ primary: 150, secondary: 30, grenades: 5 });
  const [expandedWeapons, setExpandedWeapons] = useState<Set<string>>(new Set());

  const handleWeaponSelect = (weaponId: string) => {
    setSelectedWeapon(weaponId);
    const weapon = WEAPONS.find((w) => w.id === weaponId);
    if (weapon) {
      setSelectedAmmoType(weapon.ammoTypes[0]);
      setSelectedFireRate(weapon.fireRates[0]);
    }
    uiSfx.buttonClick();
  };

  const handleAmmoTypeChange = (value: string) => {
    setSelectedAmmoType(value);
    uiSfx.toggle();
  };

  const handleFireRateChange = (value: string) => {
    setSelectedFireRate(value);
    uiSfx.toggle();
  };

  const toggleWeaponPanel = (weaponId: string) => {
    setExpandedWeapons((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(weaponId)) {
        newSet.delete(weaponId);
      } else {
        newSet.add(weaponId);
      }
      return newSet;
    });
    uiSfx.toggle();
  };

  return (
    <div className="tab-content">
      <div className="space-y-4">
        {/* Weapon Panels */}
        <div className="space-y-3">
          {WEAPONS.map((weapon, index) => {
            const isExpanded = expandedWeapons.has(weapon.id);
            const isSelected = selectedWeapon === weapon.id;

            return (
              <Collapsible
                key={weapon.id}
                open={isExpanded}
                onOpenChange={() => toggleWeaponPanel(weapon.id)}
              >
                <div
                  className={cn(
                    'tactical-panel',
                    isSelected && 'ring-2 ring-primary/50'
                  )}
                >
                  <CollapsibleTrigger className="w-full">
                    <div className="hud-panel-title flex items-center justify-between cursor-pointer hover:text-primary transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="text-muted-foreground">SLOT {index + 1}</span>
                        <span>{weapon.name}</span>
                        {isSelected && (
                          <span className="text-xs text-primary">[EQUIPPED]</span>
                        )}
                      </div>
                      <ChevronDown
                        className={cn(
                          'h-5 w-5 transition-transform duration-200',
                          isExpanded && 'rotate-180'
                        )}
                      />
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <div className="hud-panel-content space-y-4">
                      {/* Equip Button */}
                      {!isSelected && (
                        <button
                          onClick={() => handleWeaponSelect(weapon.id)}
                          className="w-full px-4 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary font-mono text-sm transition-colors"
                        >
                          EQUIP WEAPON
                        </button>
                      )}

                      {/* Ammo Type and Fire Rate Controls */}
                      <div className="space-y-3">
                        <div className="tactical-control-row">
                          <div className="tactical-control-info">
                            <div className="tactical-control-label">AMMO TYPE</div>
                            <div className="tactical-control-desc">
                              Select ammunition configuration
                            </div>
                          </div>
                          <Select
                            value={isSelected ? selectedAmmoType : weapon.ammoTypes[0]}
                            onValueChange={handleAmmoTypeChange}
                            disabled={!isSelected}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {weapon.ammoTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="tactical-control-row">
                          <div className="tactical-control-info">
                            <div className="tactical-control-label">FIRE RATE</div>
                            <div className="tactical-control-desc">
                              Select firing mode
                            </div>
                          </div>
                          <Select
                            value={isSelected ? selectedFireRate : weapon.fireRates[0]}
                            onValueChange={handleFireRateChange}
                            disabled={!isSelected}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {weapon.fireRates.map((rate) => (
                                <SelectItem key={rate} value={rate}>
                                  {rate}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Basic Info */}
                      <div className="space-y-2">
                        <div className="text-xs font-mono text-primary tracking-wider">
                          BASIC INFO
                        </div>
                        <div className="text-sm text-muted-foreground leading-relaxed">
                          {weapon.basicInfo}
                        </div>
                      </div>

                      {/* Lore */}
                      <div className="space-y-2">
                        <div className="text-xs font-mono text-primary tracking-wider">
                          FIELD NOTES
                        </div>
                        <div className="text-sm text-muted-foreground leading-relaxed italic">
                          {weapon.lore}
                        </div>
                      </div>

                      {/* Alt Fire */}
                      <div className="space-y-2">
                        <div className="text-xs font-mono text-primary tracking-wider">
                          ALT FIRE
                        </div>
                        <div className="text-sm text-muted-foreground leading-relaxed">
                          {weapon.altFire}
                        </div>
                      </div>

                      {/* Capabilities */}
                      <div className="space-y-2">
                        <div className="text-xs font-mono text-primary tracking-wider">
                          CAPABILITIES
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {weapon.capabilities.map((capability, idx) => (
                            <div
                              key={idx}
                              className="text-xs text-muted-foreground bg-background/50 px-2 py-1 border border-border/30"
                            >
                              • {capability}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Use Cases */}
                      <div className="space-y-2">
                        <div className="text-xs font-mono text-primary tracking-wider">
                          USE CASES
                        </div>
                        <div className="space-y-1">
                          {weapon.useCases.map((useCase, idx) => (
                            <div
                              key={idx}
                              className="text-sm text-muted-foreground flex items-start gap-2"
                            >
                              <span className="text-primary">›</span>
                              <span>{useCase}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            );
          })}
        </div>

        {/* Ammunition Status */}
        <div className="tactical-panel">
          <div className="hud-panel-title">AMMUNITION STATUS</div>
          <div className="hud-panel-content">
            <div className="tactical-readouts-container">
              <div className="tactical-readout-item">
                <span className="tactical-readout-label">PRIMARY AMMO:</span>
                <span className="tactical-readout-value">{ammoCount.primary}</span>
              </div>
              <div className="tactical-readout-item">
                <span className="tactical-readout-label">SECONDARY AMMO:</span>
                <span className="tactical-readout-value">{ammoCount.secondary}</span>
              </div>
              <div className="tactical-readout-item">
                <span className="tactical-readout-label">GRENADES:</span>
                <span className="tactical-readout-value">{ammoCount.grenades}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
