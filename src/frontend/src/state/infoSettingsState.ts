import { create } from 'zustand';

export type HudColorScheme = 'AMBER' | 'BLUE' | 'GREEN' | 'PINK';

interface InfoSettingsState {
  voiceEnabled: boolean;
  displayMode: 'TACTICAL' | 'STANDARD' | 'MINIMAL';
  radioLinkActive: boolean;
  hudActive: boolean;
  hudColorScheme: HudColorScheme;
  uiScale: number;
  tacticalModeEnabled: boolean;
  
  setVoiceEnabled: (enabled: boolean) => void;
  setDisplayMode: (mode: 'TACTICAL' | 'STANDARD' | 'MINIMAL') => void;
  setRadioLinkActive: (active: boolean) => void;
  setHudActive: (active: boolean) => void;
  setHudColorScheme: (scheme: HudColorScheme) => void;
  setUiScale: (scale: number) => void;
  setTacticalModeEnabled: (enabled: boolean) => void;
  
  reset: () => void;
}

const initialState = {
  voiceEnabled: true,
  displayMode: 'TACTICAL' as const,
  radioLinkActive: true,
  hudActive: true,
  hudColorScheme: 'AMBER' as HudColorScheme,
  uiScale: 1.0,
  tacticalModeEnabled: true,
};

export const useInfoSettingsStore = create<InfoSettingsState>((set) => ({
  ...initialState,
  
  setVoiceEnabled: (enabled) => set({ voiceEnabled: enabled }),
  setDisplayMode: (mode) => set({ displayMode: mode }),
  setRadioLinkActive: (active) => set({ radioLinkActive: active }),
  setHudActive: (active) => set({ hudActive: active }),
  setHudColorScheme: (scheme) => set({ hudColorScheme: scheme }),
  setUiScale: (scale) => set({ uiScale: Math.max(0.7, Math.min(1.3, scale)) }),
  setTacticalModeEnabled: (enabled) => set({ tacticalModeEnabled: enabled }),
  
  reset: () => set(initialState),
}));
