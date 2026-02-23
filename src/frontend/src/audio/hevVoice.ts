// HEV-style voice announcement helpers

import { audioBus } from './audioBus';
import { useInfoSettingsStore } from '../state/infoSettingsStore';

// Helper to check if voice is enabled
const isVoiceEnabled = () => {
  return useInfoSettingsStore.getState().voiceEnabled;
};

export const hevVoice = {
  moduleEnabled: (moduleName: string) => {
    if (!isVoiceEnabled()) return;
    audioBus.playVoice('/assets/audio/hev-module-enabled.mp3', 0.6);
  },
  
  moduleDisabled: (moduleName: string) => {
    if (!isVoiceEnabled()) return;
    audioBus.playVoice('/assets/audio/hev-module-disabled.mp3', 0.6);
  },
  
  healthCritical: () => {
    if (!isVoiceEnabled()) return;
    audioBus.playVoice('/assets/audio/hev-health-critical.mp3', 0.7);
  },
  
  armorLow: () => {
    if (!isVoiceEnabled()) return;
    audioBus.playVoice('/assets/audio/hev-armor-low.mp3', 0.7);
  },
  
  ammoLow: () => {
    if (!isVoiceEnabled()) return;
    audioBus.playVoice('/assets/audio/hev-hazard-detected.mp3', 0.7);
  },
  
  hazardDetected: (hazardType: string) => {
    if (!isVoiceEnabled()) return;
    audioBus.playVoice('/assets/audio/hev-hazard-detected.mp3', 0.7);
  },
  
  statIncreased: (statName: string) => {
    if (!isVoiceEnabled()) return;
    audioBus.playVoice('/assets/audio/hev-stat-increased.mp3', 0.5);
  },
  
  statDecreased: (statName: string) => {
    if (!isVoiceEnabled()) return;
    audioBus.playVoice('/assets/audio/hev-stat-decreased.mp3', 0.5);
  },

  hudToggled: (active: boolean) => {
    if (!isVoiceEnabled()) return;
    audioBus.playVoice('/assets/audio/hev-module-enabled.mp3', 0.6);
  },

  displayModeChanged: (mode: string) => {
    if (!isVoiceEnabled()) return;
    audioBus.playVoice('/assets/audio/hev-module-enabled.mp3', 0.6);
  },

  radioLinkToggled: (active: boolean) => {
    if (!isVoiceEnabled()) return;
    audioBus.playVoice('/assets/audio/hev-module-enabled.mp3', 0.6);
  },

  voiceSystemEnabled: () => {
    if (!isVoiceEnabled()) return;
    audioBus.playVoice('/assets/audio/hev-module-enabled.mp3', 0.6);
  },

  systemRestart: () => {
    if (!isVoiceEnabled()) return;
    audioBus.playVoice('/assets/audio/hev-module-enabled.mp3', 0.6);
  },

  voiceEnabled: () => {
    if (!isVoiceEnabled()) return;
    audioBus.playVoice('/assets/audio/hev-module-enabled.mp3', 0.6);
  },
};
