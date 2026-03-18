import { create } from 'zustand';

interface UIState {
  landscapeModeEnabled: boolean;
  toggleLandscapeMode: () => void;
  reset: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  landscapeModeEnabled: false,
  toggleLandscapeMode: () => set((state) => ({ landscapeModeEnabled: !state.landscapeModeEnabled })),
  reset: () => set({ landscapeModeEnabled: false }),
}));
