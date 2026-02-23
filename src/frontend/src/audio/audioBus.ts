// Central audio bus for managing UI SFX and HEV voice playback with safe fallbacks

class AudioBus {
  private audioContext: AudioContext | null = null;
  private isInitialized = false;
  private unlocked = false;

  initialize() {
    if (this.isInitialized) return;
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.isInitialized = true;
    } catch (e) {
      console.warn('AudioContext not available');
    }
  }

  /**
   * Attempt to unlock audio on first user gesture
   * This helps with autoplay restrictions
   */
  private async unlockAudio(): Promise<void> {
    if (this.unlocked || !this.audioContext) return;
    
    try {
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
      this.unlocked = true;
    } catch (e) {
      // Silently fail
    }
  }

  async playSfx(path: string, volume: number = 0.5): Promise<void> {
    try {
      await this.unlockAudio();
      const audio = new Audio(path);
      audio.volume = volume;
      await audio.play();
    } catch (e) {
      // Silently fail - autoplay restrictions or missing file
    }
  }

  async playVoice(path: string, volume: number = 0.8): Promise<void> {
    try {
      await this.unlockAudio();
      const audio = new Audio(path);
      audio.volume = volume;
      await audio.play();
    } catch (e) {
      // Silently fail
    }
  }

  async playAlertSequence(alertSfxPath: string, voicePath: string): Promise<void> {
    try {
      await this.unlockAudio();
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
      await this.unlockAudio();
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
