import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface DamageIndicatorProps {
  direction: 'top' | 'bottom' | 'left' | 'right';
  onComplete: () => void;
}

/**
 * Damage indicator component that displays a directional red flash
 * when the player takes damage
 */
export function DamageIndicator({ direction, onComplete }: DamageIndicatorProps) {
  const [isVisible, setIsVisible] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const duration = prefersReducedMotion ? 300 : 800;
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, duration);

    return () => clearTimeout(timer);
  }, [onComplete, prefersReducedMotion]);

  if (!isVisible) return null;

  const positionClasses = {
    top: 'top-0 left-0 right-0 h-32',
    bottom: 'bottom-0 left-0 right-0 h-32',
    left: 'left-0 top-0 bottom-0 w-32',
    right: 'right-0 top-0 bottom-0 w-32',
  };

  const gradientClasses = {
    top: 'bg-gradient-to-b from-red-600/60 to-transparent',
    bottom: 'bg-gradient-to-t from-red-600/60 to-transparent',
    left: 'bg-gradient-to-r from-red-600/60 to-transparent',
    right: 'bg-gradient-to-l from-red-600/60 to-transparent',
  };

  return (
    <div
      className={`
        fixed pointer-events-none z-50
        ${positionClasses[direction]}
        ${gradientClasses[direction]}
        ${prefersReducedMotion ? 'opacity-50' : 'animate-[fadeOut_0.8s_ease-out_forwards]'}
      `}
      style={{
        animation: prefersReducedMotion ? 'none' : undefined,
      }}
    />
  );
}
