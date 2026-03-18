import { create } from 'zustand';

interface Stats {
  health: number;
  armor: number;
  aux: number;
  ammo: number;
  hazard: number;
}

interface ModuleToggles {
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

interface DamageEvent {
  direction: 'top' | 'bottom' | 'left' | 'right';
  timestamp: number;
}

interface SuitState {
  stats: Stats;
  modules: ModuleToggles;
  damageEvents: DamageEvent[];
  previousStats: Stats;

  // Stats setters
  setHealth: (health: number) => void;
  setArmor: (armor: number) => void;
  setAux: (aux: number) => void;
  setAmmo: (ammo: number) => void;
  setHazard: (hazard: number) => void;

  // Module toggles
  toggleModule: (module: keyof ModuleToggles) => void;
  setModules: (modules: ModuleToggles) => void;

  // Damage tracking
  addDamageEvent: (direction: 'top' | 'bottom' | 'left' | 'right') => void;
  clearOldDamageEvents: () => void;

  // Threshold checks
  isHealthCritical: () => boolean;
  isArmorLow: () => boolean;
  isAmmoLow: () => boolean;

  // Reset
  reset: () => void;
  resetStats: () => void;
}

const defaultStats: Stats = {
  health: 100,
  armor: 100,
  aux: 100,
  ammo: 30,
  hazard: 0,
};

const defaultModules: ModuleToggles = {
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

export const useSuitStore = create<SuitState>((set, get) => ({
  stats: { ...defaultStats },
  modules: { ...defaultModules },
  damageEvents: [],
  previousStats: { ...defaultStats },

  setHealth: (health) =>
    set((state) => {
      const newHealth = Math.max(0, Math.min(100, health));
      const damageEvents = [...state.damageEvents];

      // Add damage event if health decreased
      if (newHealth < state.stats.health) {
        const directions: Array<'top' | 'bottom' | 'left' | 'right'> = ['top', 'bottom', 'left', 'right'];
        const randomDirection = directions[Math.floor(Math.random() * directions.length)];
        damageEvents.push({
          direction: randomDirection,
          timestamp: Date.now(),
        });
      }

      return {
        previousStats: state.stats,
        stats: { ...state.stats, health: newHealth },
        damageEvents,
      };
    }),

  setArmor: (armor) =>
    set((state) => ({
      previousStats: state.stats,
      stats: { ...state.stats, armor: Math.max(0, Math.min(100, armor)) },
    })),

  setAux: (aux) =>
    set((state) => ({
      previousStats: state.stats,
      stats: { ...state.stats, aux: Math.max(0, Math.min(100, aux)) },
    })),

  setAmmo: (ammo) =>
    set((state) => ({
      previousStats: state.stats,
      stats: { ...state.stats, ammo: Math.max(0, ammo) },
    })),

  setHazard: (hazard) =>
    set((state) => ({
      previousStats: state.stats,
      stats: { ...state.stats, hazard: Math.max(0, Math.min(100, hazard)) },
    })),

  toggleModule: (module) =>
    set((state) => ({
      modules: {
        ...state.modules,
        [module]: !state.modules[module],
      },
    })),

  setModules: (modules) => set({ modules }),

  addDamageEvent: (direction) =>
    set((state) => ({
      damageEvents: [
        ...state.damageEvents,
        {
          direction,
          timestamp: Date.now(),
        },
      ],
    })),

  clearOldDamageEvents: () =>
    set((state) => ({
      damageEvents: state.damageEvents.filter((event) => Date.now() - event.timestamp < 2000),
    })),

  isHealthCritical: () => get().stats.health < 25,
  isArmorLow: () => get().stats.armor < 15,
  isAmmoLow: () => get().stats.ammo < 20,

  reset: () =>
    set({
      stats: { ...defaultStats },
      modules: { ...defaultModules },
      damageEvents: [],
      previousStats: { ...defaultStats },
    }),

  resetStats: () =>
    set({
      stats: { ...defaultStats },
      damageEvents: [],
      previousStats: { ...defaultStats },
    }),
}));
