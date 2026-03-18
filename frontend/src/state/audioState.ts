import { create } from 'zustand';
import { useEffect } from 'react';

interface AudioTrack {
  name: string;
  url: string;
  isCustom: boolean;
}

interface AudioState {
  playlist: AudioTrack[];
  currentIndex: number;
  isPlaying: boolean;
  loop: boolean;
  volume: number;
  audioElement: HTMLAudioElement | null;
  play: () => void;
  pause: () => void;
  stop: () => void;
  next: () => void;
  previous: () => void;
  toggleLoop: () => void;
  setVolume: (volume: number) => void;
  addCustomTrack: (file: File) => void;
  initAudio: () => void;
}

const defaultTracks: AudioTrack[] = [
  { name: 'Ambience Track 01', url: '/assets/audio/ambience-track-01.mp3', isCustom: false },
  { name: 'Ambience Track 02', url: '/assets/audio/ambience-track-02.mp3', isCustom: false },
  { name: 'Ambience Track 03', url: '/assets/audio/ambience-track-03.mp3', isCustom: false },
];

export const useAudioStore = create<AudioState>((set, get) => ({
  playlist: defaultTracks,
  currentIndex: 0,
  isPlaying: false,
  loop: false,
  volume: 0.5,
  audioElement: null,

  initAudio: () => {
    const audio = new Audio();
    audio.volume = get().volume;
    audio.addEventListener('ended', () => {
      const state = get();
      if (state.loop) {
        audio.currentTime = 0;
        audio.play();
      } else {
        state.next();
      }
    });
    set({ audioElement: audio });
  },

  play: () => {
    const { audioElement, playlist, currentIndex } = get();
    if (!audioElement) {
      get().initAudio();
      return;
    }
    if (playlist.length === 0) return;
    
    const track = playlist[currentIndex];
    if (audioElement.src !== track.url) {
      audioElement.src = track.url;
    }
    audioElement.play().catch(() => {});
    set({ isPlaying: true });
  },

  pause: () => {
    const { audioElement } = get();
    if (audioElement) {
      audioElement.pause();
    }
    set({ isPlaying: false });
  },

  stop: () => {
    const { audioElement } = get();
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }
    set({ isPlaying: false });
  },

  next: () => {
    const { playlist, currentIndex, isPlaying } = get();
    if (playlist.length === 0) return;
    const nextIndex = (currentIndex + 1) % playlist.length;
    set({ currentIndex: nextIndex });
    if (isPlaying) {
      setTimeout(() => get().play(), 0);
    }
  },

  previous: () => {
    const { playlist, currentIndex, isPlaying } = get();
    if (playlist.length === 0) return;
    const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
    set({ currentIndex: prevIndex });
    if (isPlaying) {
      setTimeout(() => get().play(), 0);
    }
  },

  toggleLoop: () => set((state) => ({ loop: !state.loop })),

  setVolume: (volume) => {
    const { audioElement } = get();
    if (audioElement) {
      audioElement.volume = volume;
    }
    set({ volume });
  },

  addCustomTrack: (file) => {
    const url = URL.createObjectURL(file);
    const track: AudioTrack = {
      name: file.name,
      url,
      isCustom: true,
    };
    set((state) => ({
      playlist: [...state.playlist, track]
    }));
  },
}));

// Hook to initialize audio on mount
export function useAudioInit() {
  const initAudio = useAudioStore((state) => state.initAudio);
  useEffect(() => {
    initAudio();
  }, [initAudio]);
}
