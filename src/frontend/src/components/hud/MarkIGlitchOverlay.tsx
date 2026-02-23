import { useMarkGlitchEffects } from '@/hooks/useMarkGlitchEffects';
import { useInfoSettingsStore } from '@/state/infoSettingsStore';

export function MarkIGlitchOverlay() {
  const { hevMark, separateMarkStyleFromFunction, functionalMark } = useInfoSettingsStore();
  const glitchEffects = useMarkGlitchEffects();
  
  const activeMark = separateMarkStyleFromFunction ? functionalMark : hevMark;
  
  // Only render for Mark I
  if (activeMark !== 'mark-i') {
    return null;
  }

  return (
    <>
      {/* Flickering overlay */}
      {glitchEffects.isFlickering && (
        <div className="mark-i-flicker-overlay" />
      )}
      
      {/* Scanline sweep */}
      {glitchEffects.isScanlineActive && (
        <div className="mark-i-scanline-sweep" />
      )}
      
      {/* Color shift filter */}
      {glitchEffects.isColorShifted && (
        <div className="mark-i-color-shift" />
      )}
    </>
  );
}
