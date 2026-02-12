import { useEffect, useRef } from 'react';

/**
 * Hook to track pointer/touch presence and update CSS variables for reactive effects
 * Throttled using requestAnimationFrame for performance
 */
export function useHudPresence(containerRef: React.RefObject<HTMLElement | null>) {
  const rafRef = useRef<number | undefined>(undefined);
  const lastUpdateRef = useRef({ x: 0, y: 0, intensity: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isActive = false;
    let currentX = 0;
    let currentY = 0;
    let intensity = 0;

    const updateCSSVariables = () => {
      if (!container) return;

      // Normalize coordinates to 0-1 range
      const normalizedX = currentX / window.innerWidth;
      const normalizedY = currentY / window.innerHeight;

      // Only update if values changed significantly (throttle updates)
      const dx = Math.abs(normalizedX - lastUpdateRef.current.x);
      const dy = Math.abs(normalizedY - lastUpdateRef.current.y);
      const di = Math.abs(intensity - lastUpdateRef.current.intensity);

      if (dx > 0.01 || dy > 0.01 || di > 0.05) {
        container.style.setProperty('--pointer-x', normalizedX.toFixed(3));
        container.style.setProperty('--pointer-y', normalizedY.toFixed(3));
        container.style.setProperty('--pointer-intensity', intensity.toFixed(3));

        lastUpdateRef.current = { x: normalizedX, y: normalizedY, intensity };
      }

      if (isActive) {
        rafRef.current = requestAnimationFrame(updateCSSVariables);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      currentX = e.clientX;
      currentY = e.clientY;
      intensity = 1;

      if (!isActive) {
        isActive = true;
        rafRef.current = requestAnimationFrame(updateCSSVariables);
      }
    };

    const handlePointerLeave = () => {
      intensity = 0;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      isActive = false;
      
      // Fade out intensity
      if (container) {
        container.style.setProperty('--pointer-intensity', '0');
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        currentX = touch.clientX;
        currentY = touch.clientY;
        intensity = 1;

        if (!isActive) {
          isActive = true;
          rafRef.current = requestAnimationFrame(updateCSSVariables);
        }
      }
    };

    const handleTouchEnd = () => {
      intensity = 0;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      isActive = false;
      
      if (container) {
        container.style.setProperty('--pointer-intensity', '0');
      }
    };

    // Initialize CSS variables
    container.style.setProperty('--pointer-x', '0.5');
    container.style.setProperty('--pointer-y', '0.5');
    container.style.setProperty('--pointer-intensity', '0');

    // Add event listeners
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [containerRef]);
}
