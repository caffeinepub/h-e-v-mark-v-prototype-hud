// Zustand store for per-hazard environmental tracking

import { create } from 'zustand';

export interface HazardLevels {
  fire: number;
  bio: number;
  radiation: number;
  electrical: number;
  gas: number;
}

interface HazardsState {
  levels: HazardLevels;
  setHazardLevel: (hazardType: keyof HazardLevels, level: number) => void;
  getAggregateHazard: () => number;
  getHazardStatus: (level: number) => string;
  reset: () => void;
}

const initialLevels: HazardLevels = {
  fire: 0,
  bio: 0,
  radiation: 0,
  electrical: 0,
  gas: 0,
};

export const useHazardsStore = create<HazardsState>((set, get) => ({
  levels: initialLevels,
  
  setHazardLevel: (hazardType, level) => {
    set((state) => ({
      levels: {
        ...state.levels,
        [hazardType]: Math.max(0, Math.min(100, level)),
      },
    }));
  },
  
  getAggregateHazard: () => {
    const { levels } = get();
    const values = Object.values(levels);
    return Math.round(values.reduce((sum, val) => sum + val, 0) / values.length);
  },
  
  getHazardStatus: (level) => {
    if (level === 0) return 'SAFE';
    if (level < 30) return 'MINIMAL';
    if (level < 60) return 'CAUTION';
    if (level < 80) return 'DANGER';
    return 'CRITICAL';
  },
  
  reset: () => set({ levels: initialLevels }),
}));
