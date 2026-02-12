// UI sound effects helpers for common interactions

import { audioBus } from './audioBus';

export const uiSfx = {
  tabSwitch: () => audioBus.playSfx('/assets/audio/ui-tab-switch-01.mp3', 0.3),
  toggle: () => audioBus.playSfx('/assets/audio/ui-toggle-01.mp3', 0.4),
  consoleSubmit: () => audioBus.playSfx('/assets/audio/ui-console-submit-01.mp3', 0.4),
  buttonClick: () => audioBus.playSfx('/assets/audio/ui-toggle-01.mp3', 0.3),
};
