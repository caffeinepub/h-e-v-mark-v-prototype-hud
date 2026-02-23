import { useState, useEffect } from 'react';
import { useInfoSettingsStore } from '@/state/infoSettingsStore';
import { useReducedMotion } from './useReducedMotion';

export interface GlitchEffects {
  isFlickering: boolean;
  isTextCorrupted: boolean;
  isColorShifted: boolean;
  isScanlineActive: boolean;
  isElementHidden: boolean;
  delayMs: number;
}

export function useMarkGlitchEffects(): GlitchEffects {
  const { hevMark, separateMarkStyleFromFunction, functionalMark } = useInfoSettingsStore();
  const prefersReducedMotion = useReducedMotion();
  
  const [glitchState, setGlitchState] = useState<GlitchEffects>({
    isFlickering: false,
    isTextCorrupted: false,
    isColorShifted: false,
    isScanlineActive: false,
    isElementHidden: false,
    delayMs: 0,
  });

  useEffect(() => {
    // Only apply glitches to Mark I
    const activeMark = separateMarkStyleFromFunction ? functionalMark : hevMark;
    if (activeMark !== 'mark-i' || prefersReducedMotion) {
      setGlitchState({
        isFlickering: false,
        isTextCorrupted: false,
        isColorShifted: false,
        isScanlineActive: false,
        isElementHidden: false,
        delayMs: 0,
      });
      return;
    }

    // Random glitch effects
    const glitchInterval = setInterval(() => {
      const random = Math.random();
      
      setGlitchState({
        isFlickering: random > 0.7,
        isTextCorrupted: random > 0.85,
        isColorShifted: random > 0.8,
        isScanlineActive: random > 0.6,
        isElementHidden: random > 0.95,
        delayMs: Math.floor(Math.random() * 400) + 100, // 100-500ms
      });
    }, 150);

    return () => clearInterval(glitchInterval);
  }, [hevMark, functionalMark, separateMarkStyleFromFunction, prefersReducedMotion]);

  return glitchState;
}
