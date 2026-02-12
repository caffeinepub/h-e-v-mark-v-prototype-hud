// Zustand store for per-hazard environmental tracking with trend history

import { create } from 'zustand';

export interface HazardLevels {
  fire: number;
  bio: number;
  radiation: number;
  electrical: number;
  gas: number;
}

type HazardTrend = 'rising' | 'falling' | 'steady';

interface HazardHistory {
  fire: number[];
  bio: number[];
  radiation: number[];
  electrical: number[];
  gas: number[];
}

interface HazardsState {
  levels: HazardLevels;
  history: HazardHistory;
  setHazardLevel: (hazardType: keyof HazardLevels, level: number) => void;
  getAggregateHazard: () => number;
  getHazardStatus: (level: number) => string;
  getTrend: (hazardType: keyof HazardLevels) => HazardTrend;
  reset: () => void;
}

const initialLevels: HazardLevels = {
  fire: 0,
  bio: 0,
  radiation: 0,
  electrical: 0,
  gas: 0,
};

const initialHistory: HazardHistory = {
  fire: [],
  bio: [],
  radiation: [],
  electrical: [],
  gas: [],
};

const HISTORY_LENGTH = 5;

export const useHazardsStore = create<HazardsState>((set, get) => ({
  levels: initialLevels,
  history: initialHistory,
  
  setHazardLevel: (hazardType, level) => {
    set((state) => {
      const clampedLevel = Math.max(0, Math.min(100, level));
      const newHistory = [...state.history[hazardType], clampedLevel].slice(-HISTORY_LENGTH);
      
      return {
        levels: {
          ...state.levels,
          [hazardType]: clampedLevel,
        },
        history: {
          ...state.history,
          [hazardType]: newHistory,
        },
      };
    });
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
  
  getTrend: (hazardType) => {
    const { history } = get();
    const hazardHistory = history[hazardType];
    
    if (hazardHistory.length < 2) return 'steady';
    
    const recent = hazardHistory.slice(-3);
    const avg = recent.reduce((sum, val) => sum + val, 0) / recent.length;
    const current = recent[recent.length - 1];
    
    const diff = current - avg;
    
    if (diff > 2) return 'rising';
    if (diff < -2) return 'falling';
    return 'steady';
  },
  
  reset: () => set({ levels: initialLevels, history: initialHistory }),
}));
