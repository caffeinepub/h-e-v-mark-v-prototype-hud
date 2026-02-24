import { useEffect, useState } from 'react';
import { useInfoSettingsStore } from '@/state/infoSettingsStore';
import { Progress } from '@/components/ui/progress';
import { Loader2 } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

export function FactionSwitchOverlay() {
  const { targetFaction, completeFactionSwitch } = useInfoSettingsStore();
  const [progress, setProgress] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const duration = reducedMotion ? 500 : 1500;
    const interval = 50;
    const increment = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            completeFactionSwitch();
          }, 200);
          return 100;
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [completeFactionSwitch, reducedMotion]);

  const getFactionName = () => {
    switch (targetFaction) {
      case 'hev':
        return 'H.E.V. SUIT';
      case 'hecu':
        return 'HECU MILITARY';
      case 'security':
        return 'BLACK MESA SECURITY';
      case 'resistance':
        return 'RESISTANCE';
      default:
        return 'SYSTEM';
    }
  };

  const getFactionLogo = () => {
    switch (targetFaction) {
      case 'hev':
        return '/assets/generated/hev-logo.dim_512x512.png';
      case 'hecu':
        return '/assets/generated/hecu-logo.dim_512x512.png';
      case 'security':
        return '/assets/generated/security-logo.dim_512x512.png';
      default:
        return '/assets/generated/hev-logo.dim_512x512.png';
    }
  };

  return (
    <div className={cn('faction-switch-overlay', `faction-switch-${targetFaction}`)}>
      <div className="faction-switch-content">
        <div className="faction-switch-logo-container">
          <img
            src={getFactionLogo()}
            alt={`${getFactionName()} Logo`}
            className="faction-switch-logo"
          />
        </div>
        
        <div className="faction-switch-text">
          <Loader2 className="w-6 h-6 animate-spin mb-2" />
          <h2 className="faction-switch-title">RECONFIGURING INTERFACE</h2>
          <p className="faction-switch-subtitle">SWITCHING TO {getFactionName()} MODE</p>
        </div>

        <div className="faction-switch-progress">
          <Progress value={progress} className="faction-switch-progress-bar" />
          <span className="faction-switch-percentage">{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
}
