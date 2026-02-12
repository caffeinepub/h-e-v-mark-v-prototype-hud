import { useState } from 'react';
import { useWeaponSystemsStore } from '../state/weaponSystemsState';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { uiSfx } from '../audio/uiSfx';
import { cn } from '@/lib/utils';
import { WEAPONS_DATA, WEAPONS_BY_CATEGORY, type Weapon } from '../lib/weaponsData';

export function WeaponsTab() {
  const { 
    selectedWeapon, 
    selectedAmmoType, 
    selectedFireRate, 
    setSelectedWeapon, 
    setSelectedAmmoType, 
    setSelectedFireRate 
  } = useWeaponSystemsStore();
  const [ammoCount] = useState({ primary: 150, secondary: 30, grenades: 5 });

  const handleWeaponSelect = (weaponId: string) => {
    setSelectedWeapon(weaponId);
    const weapon = WEAPONS_DATA.find(w => w.id === weaponId);
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

  const selectedWeaponData = WEAPONS_DATA.find(w => w.id === selectedWeapon);

  const renderWeaponCategory = (title: string, weapons: Weapon[]) => (
    <div className="weapon-category-section">
      <div className="weapon-category-title">{title}</div>
      <div className="weapon-category-grid">
        {weapons.map((weapon) => (
          <div
            key={weapon.id}
            className={cn('weapon-card', selectedWeapon === weapon.id && 'selected')}
            onClick={() => handleWeaponSelect(weapon.id)}
          >
            <div className="weapon-card-image">
              <img src={weapon.imagePath} alt={weapon.name} />
            </div>
            <div className="weapon-card-name">{weapon.name}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="tab-content">
      <div className="weapons-grid">
        <div className="tactical-panel">
          <div className="hud-panel-title">WEAPON LOADOUT</div>
          <div className="hud-panel-content">
            {renderWeaponCategory('MELEE', WEAPONS_BY_CATEGORY.melee)}
            {renderWeaponCategory('RANGED', WEAPONS_BY_CATEGORY.ranged)}
            {renderWeaponCategory('MAGIC', WEAPONS_BY_CATEGORY.magic)}
          </div>
        </div>

        {selectedWeaponData && (
          <div className="tactical-panel">
            <div className="hud-panel-title">WEAPON DETAILS</div>
            <div className="hud-panel-content">
              <div className="weapon-details-container">
                <div className="weapon-details-image">
                  <img src={selectedWeaponData.imagePath} alt={selectedWeaponData.name} />
                </div>
                
                <div className="tactical-readouts-container">
                  <div className="tactical-readout-item">
                    <span className="tactical-readout-label">WEAPON:</span>
                    <span className="tactical-readout-value">{selectedWeaponData.name}</span>
                  </div>
                  
                  <div className="tactical-readout-item">
                    <span className="tactical-readout-label">DAMAGE:</span>
                    <span className="tactical-readout-value">{selectedWeaponData.damage}</span>
                  </div>

                  <div className="weapon-description">
                    {selectedWeaponData.description}
                  </div>

                  <div className="weapon-stats-grid">
                    {Object.entries(selectedWeaponData.stats).map(([key, value]) => (
                      <div key={key} className="weapon-stat-item">
                        <div className="weapon-stat-label">{key.toUpperCase()}</div>
                        <div className="weapon-stat-bar">
                          <div 
                            className="weapon-stat-fill" 
                            style={{ width: `${value}%` }}
                          />
                        </div>
                        <div className="weapon-stat-value">{value}</div>
                      </div>
                    ))}
                  </div>
                  
                  {selectedWeaponData.supportsAmmo && (
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
                  )}

                  {selectedWeaponData.supportsFireRate && (
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
                  )}

                  {!selectedWeaponData.supportsAmmo && (
                    <div className="tactical-readout-item">
                      <span className="tactical-readout-label">AMMO TYPE:</span>
                      <span className="tactical-readout-value">N/A</span>
                    </div>
                  )}

                  {!selectedWeaponData.supportsFireRate && (
                    <div className="tactical-readout-item">
                      <span className="tactical-readout-label">FIRE RATE:</span>
                      <span className="tactical-readout-value">{selectedWeaponData.fireRates[0]}</span>
                    </div>
                  )}
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
