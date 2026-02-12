import { create } from 'zustand';

interface WeaponSystemsState {
  selectedWeapon: string;
  selectedAmmoType: string;
  selectedFireRate: string;
  setSelectedWeapon: (weapon: string) => void;
  setSelectedAmmoType: (ammo: string) => void;
  setSelectedFireRate: (rate: string) => void;
  reset: () => void;
}

const defaultState = {
  selectedWeapon: 'crowbar',
  selectedAmmoType: 'NONE',
  selectedFireRate: 'MELEE',
};

export const useWeaponSystemsStore = create<WeaponSystemsState>((set) => ({
  ...defaultState,
  setSelectedWeapon: (weapon) => set({ selectedWeapon: weapon }),
  setSelectedAmmoType: (ammo) => set({ selectedAmmoType: ammo }),
  setSelectedFireRate: (rate) => set({ selectedFireRate: rate }),
  reset: () => set(defaultState),
}));
