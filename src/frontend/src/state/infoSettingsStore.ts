import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type SystemStyle = 'hev' | 'hecu' | 'guard' | 'resistance' | 'security';
type DisplayMode = 'STANDARD' | 'MINIMAL' | 'TACTICAL' | 'EMERGENCY';
type HudStyleMode = 'hl1' | 'hl2' | 'custom';
type HevMark = 'prototype' | 'mark-i' | 'mark-ii' | 'mark-iii' | 'mark-iv' | 'mark-v';

interface InfoSettingsState {
  voiceEnabled: boolean;
  aiEnabled: boolean;
  radioLink: boolean;
  hudOnline: boolean;
  colorScheme: string;
  uiScale: number;
  displayMode: DisplayMode;
  tacticalTabEnabled: boolean;
  systemStyle: SystemStyle;
  minimalLayoutEnabled: boolean;
  operatorName: string;
  useHl1Weapons: boolean;
  emergencyModeActive: boolean;
  radioFrequency: number;
  selectedChannel: string;
  hudOpacity: number;
  hudStyleMode: HudStyleMode;
  detailedMode: boolean;
  hevMark: HevMark;
  separateMarkStyleFromFunction: boolean;
  functionalMark: HevMark;

  // Computed properties
  halfLife2ThemeActive: boolean;
  resistanceThemeActive: boolean;
  hecuModeActive: boolean;
  securityModeActive: boolean;
  showTacticalTab: boolean;
  emergencyMode: boolean;

  // Actions
  toggleVoice: () => void;
  setVoiceEnabled: (enabled: boolean) => void;
  toggleAI: () => void;
  toggleRadioLink: () => void;
  setRadioLink: (enabled: boolean) => void;
  toggleHudOnline: () => void;
  setHudOnline: (enabled: boolean) => void;
  setColorScheme: (scheme: string) => void;
  setUiScale: (scale: number) => void;
  setDisplayMode: (mode: DisplayMode) => void;
  toggleTacticalTab: () => void;
  setSystemStyle: (style: SystemStyle) => void;
  toggleMinimalLayout: () => void;
  setOperatorName: (name: string) => void;
  toggleUseHl1Weapons: () => void;
  toggleEmergencyMode: () => void;
  setRadioFrequency: (freq: number) => void;
  setSelectedChannel: (channel: string) => void;
  setHudOpacity: (opacity: number) => void;
  setHudStyleMode: (mode: HudStyleMode) => void;
  toggleDetailedMode: () => void;
  setHevMark: (mark: HevMark) => void;
  setSeparateMarkStyleFromFunction: () => void;
  setFunctionalMark: (mark: HevMark) => void;
  resetSettings: () => void;
}

const defaultSettings = {
  voiceEnabled: true,
  aiEnabled: true,
  radioLink: true,
  hudOnline: true,
  colorScheme: 'orange',
  uiScale: 1.0,
  displayMode: 'STANDARD' as DisplayMode,
  tacticalTabEnabled: true,
  systemStyle: 'hev' as SystemStyle,
  minimalLayoutEnabled: false,
  operatorName: 'Gordon Freeman',
  useHl1Weapons: false,
  emergencyModeActive: false,
  radioFrequency: 98.5,
  selectedChannel: 'COMMAND',
  hudOpacity: 1.0,
  hudStyleMode: 'custom' as HudStyleMode,
  detailedMode: true,
  hevMark: 'mark-v' as HevMark,
  separateMarkStyleFromFunction: false,
  functionalMark: 'mark-v' as HevMark,
};

export const useInfoSettingsStore = create<InfoSettingsState>()(
  persist(
    (set, get) => ({
      ...defaultSettings,

      // Computed properties
      get halfLife2ThemeActive() {
        return get().systemStyle === 'resistance';
      },
      get resistanceThemeActive() {
        return get().systemStyle === 'resistance';
      },
      get hecuModeActive() {
        return get().systemStyle === 'hecu';
      },
      get securityModeActive() {
        return get().systemStyle === 'security';
      },
      get showTacticalTab() {
        return get().tacticalTabEnabled;
      },
      get emergencyMode() {
        return get().emergencyModeActive;
      },

      // Actions
      toggleVoice: () => set((state) => ({ voiceEnabled: !state.voiceEnabled })),
      setVoiceEnabled: (enabled) => set({ voiceEnabled: enabled }),
      toggleAI: () => set((state) => ({ aiEnabled: !state.aiEnabled })),
      toggleRadioLink: () => set((state) => ({ radioLink: !state.radioLink })),
      setRadioLink: (enabled) => set({ radioLink: enabled }),
      toggleHudOnline: () => set((state) => ({ hudOnline: !state.hudOnline })),
      setHudOnline: (enabled) => set({ hudOnline: enabled }),
      setColorScheme: (scheme) => set({ colorScheme: scheme }),
      setUiScale: (scale) => set({ uiScale: scale }),
      setDisplayMode: (mode) => set({ displayMode: mode }),
      toggleTacticalTab: () => set((state) => ({ tacticalTabEnabled: !state.tacticalTabEnabled })),
      setSystemStyle: (style) => set({ systemStyle: style }),
      toggleMinimalLayout: () => set((state) => ({ minimalLayoutEnabled: !state.minimalLayoutEnabled })),
      setOperatorName: (name) => set({ operatorName: name }),
      toggleUseHl1Weapons: () => set((state) => ({ useHl1Weapons: !state.useHl1Weapons })),
      toggleEmergencyMode: () => set((state) => ({ emergencyModeActive: !state.emergencyModeActive })),
      setRadioFrequency: (freq) => set({ radioFrequency: freq }),
      setSelectedChannel: (channel) => set({ selectedChannel: channel }),
      setHudOpacity: (opacity) => set({ hudOpacity: opacity }),
      setHudStyleMode: (mode) => set({ hudStyleMode: mode }),
      toggleDetailedMode: () => set((state) => ({ detailedMode: !state.detailedMode })),
      setHevMark: (mark) => set({ hevMark: mark }),
      setSeparateMarkStyleFromFunction: () =>
        set((state) => ({ separateMarkStyleFromFunction: !state.separateMarkStyleFromFunction })),
      setFunctionalMark: (mark) => set({ functionalMark: mark }),
      resetSettings: () => set(defaultSettings),
    }),
    {
      name: 'info-settings-storage',
    }
  )
);
