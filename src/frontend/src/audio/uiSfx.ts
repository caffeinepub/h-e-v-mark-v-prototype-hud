// UI sound effects helpers for common interactions

import { audioBus } from './audioBus';
import { useInfoSettingsStore } from '../state/infoSettingsStore';

export const uiSfx = {
  tabSwitch: () => {
    const { voiceEnabled } = useInfoSettingsStore.getState();
    if (voiceEnabled) {
      audioBus.playSfx('/assets/audio/ui-tab-switch-01.mp3', 0.3);
    }
  },
  toggle: () => {
    const { voiceEnabled } = useInfoSettingsStore.getState();
    if (voiceEnabled) {
      audioBus.playSfx('/assets/audio/ui-toggle-01.mp3', 0.4);
    }
  },
  consoleSubmit: () => {
    const { voiceEnabled } = useInfoSettingsStore.getState();
    if (voiceEnabled) {
      audioBus.playSfx('/assets/audio/ui-console-submit-01.mp3', 0.4);
    }
  },
  buttonClick: () => {
    const { voiceEnabled } = useInfoSettingsStore.getState();
    if (voiceEnabled) {
      audioBus.playSfx('/assets/audio/ui-toggle-01.mp3', 0.3);
    }
  },
  confirmAccept: () => {
    const { voiceEnabled } = useInfoSettingsStore.getState();
    if (voiceEnabled) {
      audioBus.playSfx('/assets/audio/ui-toggle-01.mp3', 0.5);
    }
  },
  confirmCancel: () => {
    const { voiceEnabled } = useInfoSettingsStore.getState();
    if (voiceEnabled) {
      audioBus.playSfx('/assets/audio/ui-toggle-01.mp3', 0.3);
    }
  },
  settingsChange: () => {
    const { voiceEnabled } = useInfoSettingsStore.getState();
    if (voiceEnabled) {
      audioBus.playSfx('/assets/audio/ui-toggle-01.mp3', 0.35);
    }
  },
  confirm: () => {
    const { voiceEnabled } = useInfoSettingsStore.getState();
    if (voiceEnabled) {
      audioBus.playSfx('/assets/audio/ui-toggle-01.mp3', 0.5);
    }
  },
};
