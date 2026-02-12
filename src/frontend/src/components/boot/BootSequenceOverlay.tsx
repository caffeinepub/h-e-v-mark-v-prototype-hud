import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { audioBus } from '@/audio/audioBus';

interface BootSequenceOverlayProps {
  onComplete: () => void;
}

export function BootSequenceOverlay({ onComplete }: BootSequenceOverlayProps) {
  const [stage, setStage] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [progress, setProgress] = useState(0);
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const mountedRef = useRef(true);

  const bootLines = [
    'INITIALIZING H.E.V MARK V SYSTEMS...',
    'LOADING BIOMETRIC SCANNER...',
    'BIOMETRIC SCAN: COMPLETE',
    'OPERATOR: LEON KRYWIAK',
    'CLEARANCE: LEVEL 3 - AUTHORIZED',
    'FACILITY: BLACK MESA RESEARCH',
    'LOADING TACTICAL SUBSYSTEMS...',
    'LOADING WEAPON SYSTEMS...',
    'LOADING MEDICAL DIAGNOSTICS...',
    'LOADING ENVIRONMENTAL SENSORS...',
    'SYSTEM CHECK: ALL NOMINAL',
  ];

  useEffect(() => {
    mountedRef.current = true;
    
    const sequence = async () => {
      try {
        // Stage 0: CRT power on with flicker (0-400ms)
        await new Promise(resolve => setTimeout(resolve, 100));
        if (!mountedRef.current) return;
        audioBus.playSfx('/assets/audio/boot-crt-noise.mp3', 0.15);
        
        // Stage 1: Initial flicker and noise (400-800ms)
        setStage(1);
        await new Promise(resolve => setTimeout(resolve, 400));
        if (!mountedRef.current) return;
        
        // Stage 2: System text starts appearing with typing effect (800-3500ms)
        setStage(2);
        
        // Type out lines progressively
        for (let i = 0; i < bootLines.length; i++) {
          if (!mountedRef.current) return;
          setTypedLines(prev => [...prev, bootLines[i]]);
          setProgress(((i + 1) / bootLines.length) * 100);
          await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 100));
        }
        
        if (!mountedRef.current) return;
        
        // Stage 3: Voice line and completion (3500-4000ms)
        setStage(3);
        audioBus.playVoice('/assets/audio/boot-voice-welcome.mp3', 0.8);
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        if (!mountedRef.current) return;
        
        // Stage 4: Fade out (4000-5000ms)
        setStage(4);
        setOpacity(0);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (!mountedRef.current) return;
        onComplete();
      } catch (e) {
        // Silently handle any errors
        if (mountedRef.current) {
          onComplete();
        }
      }
    };

    sequence();

    return () => {
      mountedRef.current = false;
    };
  }, [onComplete]);

  return (
    <div 
      className={cn('boot-overlay', stage >= 4 && 'boot-fade-out')}
      style={{ opacity }}
    >
      <div className="boot-crt-effect" />
      <div className="boot-crt-overlay" />
      <div className="boot-scanlines" />
      <div className="boot-noise" />
      <div className="boot-content">
        {stage >= 1 && (
          <div className={cn('boot-text', stage >= 2 && 'boot-text-visible')}>
            <div className="boot-logo">H.E.V</div>
            <div className="boot-subtitle">MARK V PROTECTIVE SYSTEMS</div>
            <div className="boot-status">
              {stage >= 2 && (
                <>
                  {typedLines.map((line, idx) => (
                    <div key={idx} className="boot-line boot-line-typed">
                      {line}
                    </div>
                  ))}
                  {stage >= 2 && progress < 100 && (
                    <div className="boot-progress">
                      <div className="boot-progress-bar" style={{ width: `${progress}%` }} />
                    </div>
                  )}
                </>
              )}
              {stage >= 3 && (
                <div className="boot-line boot-ready">ALL SYSTEMS OPERATIONAL</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
