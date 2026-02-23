import { useReducedMotion } from '@/hooks/useReducedMotion';

interface CriticalStatAlertProps {
  isActive: boolean;
  color: 'red' | 'orange';
  children: React.ReactNode;
}

/**
 * Critical stat alert wrapper that adds a pulsing colored border
 * around stat displays when they fall below critical thresholds
 */
export function CriticalStatAlert({ isActive, color, children }: CriticalStatAlertProps) {
  const prefersReducedMotion = useReducedMotion();

  const colorClasses = {
    red: 'border-red-500 shadow-red-500/50',
    orange: 'border-orange-500 shadow-orange-500/50',
  };

  return (
    <div
      className={`
        relative
        ${isActive ? `border-2 ${colorClasses[color]} ${prefersReducedMotion ? '' : 'animate-pulse shadow-lg'}` : ''}
      `}
    >
      {children}
    </div>
  );
}
