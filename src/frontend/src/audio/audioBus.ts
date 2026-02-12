// Central audio bus for managing UI SFX and HEV voice playback with safe fallbacks

class AudioBus {
  private audioContext: AudioContext | null = null;
  private isInitialized = false;

  initialize() {
    if (this.isInitialized) return;
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.isInitialized = true;
    } catch (e) {
      console.warn('AudioContext not available');
    }
  }

  async playSfx(path: string, volume: number = 0.5): Promise<void> {
    try {
      const audio = new Audio(path);
      audio.volume = volume;
      await audio.play();
    } catch (e) {
      // Silently fail - autoplay restrictions or missing file
    }
  }

  async playVoice(path: string, volume: number = 0.8): Promise<void> {
    try {
      const audio = new Audio(path);
      audio.volume = volume;
      await audio.play();
    } catch (e) {
      // Silently fail
    }
  }

  async playAlertSequence(alertSfxPath: string, voicePath: string): Promise<void> {
    try {
      // Play alert SFX first
      await this.playSfx(alertSfxPath, 0.6);
      // Small delay before voice
      await new Promise(resolve => setTimeout(resolve, 200));
      await this.playVoice(voicePath, 0.8);
    } catch (e) {
      // Silently fail
    }
  }

  async playLayered(sfxPath: string, voicePath: string, sfxVolume: number = 0.5, voiceVolume: number = 0.8): Promise<void> {
    try {
      // Play both simultaneously for boot sequence
      const sfxPromise = this.playSfx(sfxPath, sfxVolume);
      const voicePromise = this.playVoice(voicePath, voiceVolume);
      await Promise.all([sfxPromise, voicePromise]);
    } catch (e) {
      // Silently fail
    }
  }
}

export const audioBus = new AudioBus();
