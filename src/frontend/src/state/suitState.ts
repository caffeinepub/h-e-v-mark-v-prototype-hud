import { create } from 'zustand';

interface Stats {
  health: number;
  armor: number;
  aux: number;
  ammo: number;
  hazard: number;
}

interface Modules {
  helmet: boolean;
  respirator: boolean;
  longJump: boolean;
  flashlight: boolean;
  advancedMedical: boolean;
  radiationShield: boolean;
  defibrillator: boolean;
  shieldBoost: boolean;
  hazardSystem: boolean;
  moduleSync: boolean;
}

interface SuitState {
  stats: Stats;
  modules: Modules;
  setHealth: (value: number) => void;
  setArmor: (value: number) => void;
  setAux: (value: number) => void;
  setAmmo: (value: number) => void;
  setHazard: (value: number) => void;
  toggleModule: (module: keyof Modules) => void;
  setModules: (modules: Modules) => void;
  setModuleState: (module: keyof Modules, value: boolean) => void;
  reset: () => void;
}

const initialStats: Stats = {
  health: 100,
  armor: 100,
  aux: 100,
  ammo: 30,
  hazard: 0,
};

const initialModules: Modules = {
  helmet: false,
  respirator: false,
  longJump: false,
  flashlight: false,
  advancedMedical: false,
  radiationShield: false,
  defibrillator: false,
  shieldBoost: false,
  hazardSystem: false,
  moduleSync: false,
};

export const useSuitStore = create<SuitState>((set) => ({
  stats: initialStats,
  modules: initialModules,
  setHealth: (value) => set((state) => ({ stats: { ...state.stats, health: Math.max(0, Math.min(100, value)) } })),
  setArmor: (value) => set((state) => ({ stats: { ...state.stats, armor: Math.max(0, Math.min(100, value)) } })),
  setAux: (value) => set((state) => ({ stats: { ...state.stats, aux: Math.max(0, Math.min(100, value)) } })),
  setAmmo: (value) => set((state) => ({ stats: { ...state.stats, ammo: Math.max(0, Math.min(999, value)) } })),
  setHazard: (value) => set((state) => ({ stats: { ...state.stats, hazard: Math.max(0, Math.min(100, value)) } })),
  toggleModule: (module) => set((state) => ({
    modules: { ...state.modules, [module]: !state.modules[module] }
  })),
  setModules: (modules) => set({ modules }),
  setModuleState: (module, value) => set((state) => ({
    modules: { ...state.modules, [module]: value }
  })),
  reset: () => set({ stats: initialStats, modules: initialModules }),
}));
