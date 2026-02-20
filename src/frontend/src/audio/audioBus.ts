// Central audio bus for managing UI SFX and HEV voice playback with safe fallbacks

class AudioBus {
  private audioContext: AudioContext | null = null;
  private isInitialized = false;
  private unlocked = false;
  private speechSynthesis: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  initialize() {
    if (this.isInitialized) return;
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.speechSynthesis = window.speechSynthesis;
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

  /**
   * Get a female voice from available voices
   */
  private getFemaleVoice(): SpeechSynthesisVoice | null {
    if (!this.speechSynthesis) return null;
    
    const voices = this.speechSynthesis.getVoices();
    
    // Try to find a female voice (prefer English)
    const femaleVoice = voices.find(voice => 
      voice.lang.startsWith('en') && 
      (voice.name.toLowerCase().includes('female') || 
       voice.name.toLowerCase().includes('samantha') ||
       voice.name.toLowerCase().includes('victoria') ||
       voice.name.toLowerCase().includes('karen') ||
       voice.name.toLowerCase().includes('zira'))
    );
    
    if (femaleVoice) return femaleVoice;
    
    // Fallback: any English voice
    return voices.find(voice => voice.lang.startsWith('en')) || voices[0] || null;
  }

  /**
   * Speak the boot sequence script with female voice
   */
  async speakBootSequence(): Promise<void> {
    if (!this.speechSynthesis) {
      this.initialize();
      if (!this.speechSynthesis) return;
    }

    try {
      await this.unlockAudio();
      
      // Cancel any ongoing speech
      this.speechSynthesis.cancel();
      
      const script = "Hello welcome to the H.E.V mark prototype protective systems. " +
                    "Initialization procedures active. " +
                    "Comms. Active. " +
                    "Advanced medical systems. Active. " +
                    "Advanced weaponry systems engaged. " +
                    "Vital signs Activated. " +
                    "Tactical engagement systems Activated. " +
                    "Environmental hazard and informational tabs Activated. " +
                    "Power and health monitoring systems Activated. " +
                    "Boot up sequence finished. " +
                    "Have a very safe day.";
      
      const utterance = new SpeechSynthesisUtterance(script);
      
      // Set voice to female if available
      const femaleVoice = this.getFemaleVoice();
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }
      
      // Configure speech parameters
      utterance.rate = 0.95;  // Slightly slower for clarity
      utterance.pitch = 1.1;  // Slightly higher pitch
      utterance.volume = 0.9;
      
      this.currentUtterance = utterance;
      this.speechSynthesis.speak(utterance);
    } catch (e) {
      // Silently fail
    }
  }

  /**
   * Stop any ongoing speech
   */
  stopSpeech(): void {
    if (this.speechSynthesis) {
      this.speechSynthesis.cancel();
    }
    this.currentUtterance = null;
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
