import { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

export function useCountingAnimation(targetValue: number, duration = 400): number {
  const prefersReduced = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(targetValue);
  const prevValueRef = useRef(targetValue);
  const animRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (prefersReduced) {
      setDisplayValue(targetValue);
      prevValueRef.current = targetValue;
      return;
    }

    const start = prevValueRef.current;
    const end = targetValue;
    prevValueRef.current = targetValue;

    if (start === end) return;

    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * eased);
      setDisplayValue(current);

      if (progress < 1) {
        animRef.current = setTimeout(animate, 16);
      }
    };

    if (animRef.current) clearTimeout(animRef.current);
    animate();

    return () => {
      if (animRef.current) clearTimeout(animRef.current);
    };
  }, [targetValue, duration, prefersReduced]);

  return displayValue;
}
