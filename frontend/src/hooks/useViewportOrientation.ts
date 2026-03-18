import { useState, useEffect } from 'react';

/**
 * Hook to detect device orientation (portrait vs landscape)
 * Returns true when device is in landscape orientation
 */
export function useViewportOrientation(): boolean {
  const [isLandscape, setIsLandscape] = useState(() => {
    if (typeof window === 'undefined') return false;
    
    // Try matchMedia first (more reliable for orientation)
    if (window.matchMedia) {
      return window.matchMedia('(orientation: landscape)').matches;
    }
    
    // Fallback to width/height comparison
    return window.innerWidth > window.innerHeight;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateOrientation = () => {
      if (window.matchMedia) {
        setIsLandscape(window.matchMedia('(orientation: landscape)').matches);
      } else {
        setIsLandscape(window.innerWidth > window.innerHeight);
      }
    };

    // Listen to both resize and orientationchange events
    window.addEventListener('resize', updateOrientation);
    window.addEventListener('orientationchange', updateOrientation);

    // Also listen to matchMedia changes if available
    let mediaQuery: MediaQueryList | null = null;
    if (window.matchMedia) {
      mediaQuery = window.matchMedia('(orientation: landscape)');
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', updateOrientation);
      } else if (mediaQuery.addListener) {
        // Fallback for older browsers
        mediaQuery.addListener(updateOrientation);
      }
    }

    return () => {
      window.removeEventListener('resize', updateOrientation);
      window.removeEventListener('orientationchange', updateOrientation);
      
      if (mediaQuery) {
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener('change', updateOrientation);
        } else if (mediaQuery.removeListener) {
          mediaQuery.removeListener(updateOrientation);
        }
      }
    };
  }, []);

  return isLandscape;
}
