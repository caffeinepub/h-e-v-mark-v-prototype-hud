import { useReducedMotion } from '@/hooks/useReducedMotion';
import { AlertTriangle } from 'lucide-react';

interface LowAmmoWarningProps {
  isLow: boolean;
}

/**
 * Low ammo warning indicator that displays a pulsing yellow alert
 * when ammunition falls below 20%
 */
export function LowAmmoWarning({ isLow }: LowAmmoWarningProps) {
  const prefersReducedMotion = useReducedMotion();

  if (!isLow) return null;

  return (
    <div className="flex items-center gap-1 text-yellow-500">
      <AlertTriangle 
        className={`w-4 h-4 ${prefersReducedMotion ? '' : 'animate-pulse'}`}
      />
      <span className="text-xs font-bold tracking-wider">LOW</span>
    </div>
  );
}
