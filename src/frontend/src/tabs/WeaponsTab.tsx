import { useState } from 'react';
import { useWeaponSystemsStore } from '../state/weaponSystemsState';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { uiSfx } from '../audio/uiSfx';
import { cn } from '@/lib/utils';

const WEAPONS = [
  { id: 'crowbar', name: 'CROWBAR', ammoTypes: ['NONE'], fireRates: ['MELEE'] },
  { id: 'pistol', name: 'PISTOL', ammoTypes: ['9MM', '.45 ACP'], fireRates: ['SEMI-AUTO'] },
  { id: 'magnum', name: 'MAGNUM', ammoTypes: ['.357', '.44'], fireRates: ['SEMI-AUTO'] },
  { id: 'smg', name: 'SMG', ammoTypes: ['9MM', '.45 ACP'], fireRates: ['AUTO', 'BURST'] },
  { id: 'shotgun', name: 'SHOTGUN', ammoTypes: ['12 GAUGE', 'SLUG'], fireRates: ['PUMP'] },
  { id: 'crossbow', name: 'CROSSBOW', ammoTypes: ['BOLT', 'TRANQ'], fireRates: ['SINGLE'] },
  { id: 'ar2', name: 'AR2', ammoTypes: ['PULSE', 'ENERGY'], fireRates: ['AUTO', 'BURST'] },
  { id: 'rpg', name: 'RPG', ammoTypes: ['ROCKET', 'GUIDED'], fireRates: ['SINGLE'] },
  { id: 'grenade', name: 'GRENADE', ammoTypes: ['FRAG', 'FLASH'], fireRates: ['THROW'] },
  { id: 'gravitygun', name: 'GRAVITY GUN', ammoTypes: ['NONE'], fireRates: ['SPECIAL'] },
];

export function WeaponsTab() {
  const { 
    selectedWeapon, 
    selectedAmmoType, 
    selectedFireRate, 
    setSelectedWeapon, 
    setSelectedAmmoType, 
    setSelectedFireRate 
  } = useWeaponSystemsStore();
  const [ammoCount, setAmmoCount] = useState({ primary: 150, secondary: 30, grenades: 5 });

  const handleWeaponSelect = (weaponId: string) => {
    setSelectedWeapon(weaponId);
    const weapon = WEAPONS.find(w => w.id === weaponId);
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

  const selectedWeaponData = WEAPONS.find(w => w.id === selectedWeapon);

  return (
    <div className="tab-content">
      <div className="weapons-grid">
        <div className="tactical-panel">
          <div className="hud-panel-title">WEAPON LOADOUT</div>
          <div className="hud-panel-content">
            <div className="weapon-loadout-grid">
              {WEAPONS.map((weapon, index) => (
                <div
                  key={weapon.id}
                  className={cn('weapon-slot', selectedWeapon === weapon.id && 'selected')}
                  onClick={() => handleWeaponSelect(weapon.id)}
                >
                  <span className="weapon-slot-label">SLOT {index + 1}</span>
                  <span className="weapon-slot-name">{weapon.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {selectedWeaponData && (
          <div className="tactical-panel">
            <div className="hud-panel-title">WEAPON DETAILS</div>
            <div className="hud-panel-content">
              <div className="tactical-readouts-container">
                <div className="tactical-readout-item">
                  <span className="tactical-readout-label">WEAPON:</span>
                  <span className="tactical-readout-value">{selectedWeaponData.name}</span>
                </div>
                
                <div className="tactical-control-row">
                  <div className="tactical-control-info">
                    <div className="tactical-control-label">AMMO TYPE</div>
                    <div className="tactical-control-desc">Select ammunition configuration</div>
                  </div>
                  <Select value={selectedAmmoType} onValueChange={handleAmmoTypeChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedWeaponData.ammoTypes.map((type) => (
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
                    <div className="tactical-control-desc">Select firing mode</div>
                  </div>
                  <Select value={selectedFireRate} onValueChange={handleFireRateChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedWeaponData.fireRates.map((rate) => (
                        <SelectItem key={rate} value={rate}>
                          {rate}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        )}

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
