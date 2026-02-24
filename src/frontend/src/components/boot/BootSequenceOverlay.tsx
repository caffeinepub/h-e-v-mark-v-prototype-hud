import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Check, Loader2, AlertTriangle } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useInfoSettingsStore } from '@/state/infoSettingsStore';
import { cn } from '@/lib/utils';

interface BootSequenceOverlayProps {
  onComplete: () => void;
}

interface BootStage {
  id: number;
  label: string;
  duration: number;
  factionSpecific?: {
    hev?: string;
    hecu?: string;
    security?: string;
    resistance?: string;
  };
}

const BOOT_STAGES: BootStage[] = [
  { id: 1, label: 'BIOS INITIALIZATION', duration: 400 },
  { id: 2, label: 'HARDWARE DIAGNOSTICS', duration: 500 },
  { id: 3, label: 'MEMORY CHECK', duration: 450 },
  { id: 4, label: 'DRIVER LOADING', duration: 600 },
  { id: 5, label: 'SYSTEM CORE BOOT', duration: 550 },
  { id: 6, label: 'NETWORK INTERFACE', duration: 500 },
  { id: 7, label: 'SECURITY PROTOCOLS', duration: 600 },
  { id: 8, label: 'MODULE SYNCHRONIZATION', duration: 550 },
  {
    id: 9,
    label: 'FACTION SUBSYSTEMS',
    duration: 700,
    factionSpecific: {
      hev: 'H.E.V. SUIT INTERFACE',
      hecu: 'HECU TACTICAL NETWORK',
      security: 'SECURITY GRID ONLINE',
      resistance: 'RESISTANCE COMMS LINK',
    },
  },
  { id: 10, label: 'AUDIO SYSTEMS', duration: 450 },
  { id: 11, label: 'DISPLAY CALIBRATION', duration: 500 },
  { id: 12, label: 'FINAL DIAGNOSTICS', duration: 600 },
];

export function BootSequenceOverlay({ onComplete }: BootSequenceOverlayProps) {
  const [currentStage, setCurrentStage] = useState(0);
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [showGlitch, setShowGlitch] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const reducedMotion = useReducedMotion();
  const { systemStyle } = useInfoSettingsStore();

  useEffect(() => {
    if (currentStage >= BOOT_STAGES.length) {
      setShowLogo(true);
      const timer = setTimeout(() => {
        onComplete();
      }, 1500);
      return () => clearTimeout(timer);
    }

    const stage = BOOT_STAGES[currentStage];
    const duration = reducedMotion ? 100 : stage.duration;

    // Random glitch effect during boot
    if (!reducedMotion && Math.random() > 0.7) {
      setShowGlitch(true);
      setTimeout(() => setShowGlitch(false), 100);
    }

    const timer = setTimeout(() => {
      setCompletedStages((prev) => [...prev, stage.id]);
      setCurrentStage((prev) => prev + 1);
      setProgress(((currentStage + 1) / BOOT_STAGES.length) * 100);
    }, duration);

    return () => clearTimeout(timer);
  }, [currentStage, onComplete, reducedMotion]);

  const getStageLabel = (stage: BootStage): string => {
    if (stage.factionSpecific && stage.factionSpecific[systemStyle]) {
      return stage.factionSpecific[systemStyle]!;
    }
    return stage.label;
  };

  const getFactionLogo = () => {
    switch (systemStyle) {
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

  if (showLogo) {
    return (
      <div className={cn('boot-sequence-overlay', 'boot-logo-reveal')}>
        <div className="boot-logo-container">
          <img
            src={getFactionLogo()}
            alt="Faction Logo"
            className="boot-logo"
          />
          <div className="boot-logo-glow" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn('boot-sequence-overlay', showGlitch && 'boot-glitch')}>
      <div className="boot-sequence-content">
        <div className="boot-header">
          <h1 className="boot-title">SYSTEM INITIALIZATION</h1>
          <div className="boot-subtitle">
            <span className="boot-version">v4.2.1</span>
            <span className="boot-separator">•</span>
            <span className="boot-faction">{systemStyle.toUpperCase()}</span>
          </div>
        </div>

        <div className="boot-stages">
          {BOOT_STAGES.map((stage, index) => {
            const isCompleted = completedStages.includes(stage.id);
            const isCurrent = index === currentStage;
            const isPending = index > currentStage;

            return (
              <div
                key={stage.id}
                className={cn(
                  'boot-stage',
                  isCompleted && 'boot-stage-completed',
                  isCurrent && 'boot-stage-current',
                  isPending && 'boot-stage-pending'
                )}
                style={{
                  animationDelay: reducedMotion ? '0ms' : `${index * 50}ms`,
                }}
              >
                <div className="boot-stage-icon">
                  {isCompleted && <Check className="w-4 h-4" />}
                  {isCurrent && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isPending && <div className="boot-stage-dot" />}
                </div>
                <span className="boot-stage-label">{getStageLabel(stage)}</span>
                {isCompleted && <span className="boot-stage-status">OK</span>}
                {isCurrent && <span className="boot-stage-status boot-stage-loading">LOADING</span>}
              </div>
            );
          })}
        </div>

        <div className="boot-progress-section">
          <div className="boot-progress-header">
            <span className="boot-progress-label">BOOT PROGRESS</span>
            <span className="boot-progress-percentage">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="boot-progress-bar" />
          <div className="boot-progress-footer">
            <span className="boot-stage-counter">
              STAGE {currentStage + 1} / {BOOT_STAGES.length}
            </span>
          </div>
        </div>

        {showGlitch && (
          <div className="boot-glitch-overlay">
            <AlertTriangle className="w-8 h-8 text-warning" />
            <span className="boot-glitch-text">SIGNAL INTERFERENCE</span>
          </div>
        )}
      </div>
    </div>
  );
}
