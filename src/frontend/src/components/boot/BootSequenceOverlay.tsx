import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { audioBus } from '@/audio/audioBus';
import { useInfoSettingsStore } from '@/state/infoSettingsState';
import { Check, Loader2 } from 'lucide-react';

interface BootSequenceOverlayProps {
  onComplete: () => void;
}

interface SystemStage {
  id: string;
  label: string;
  status: 'pending' | 'active' | 'complete';
}

export function BootSequenceOverlay({ onComplete }: BootSequenceOverlayProps) {
  const [stage, setStage] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [progress, setProgress] = useState(0);
  const [currentSystemIndex, setCurrentSystemIndex] = useState(-1);
  const [systemStages, setSystemStages] = useState<SystemStage[]>([
    { id: 'init', label: 'Initialization procedures', status: 'pending' },
    { id: 'comms', label: 'Communications', status: 'pending' },
    { id: 'medical', label: 'Advanced medical systems', status: 'pending' },
    { id: 'weapons', label: 'Advanced weaponry systems', status: 'pending' },
    { id: 'vitals', label: 'Vital signs monitoring', status: 'pending' },
    { id: 'tactical', label: 'Tactical engagement systems', status: 'pending' },
    { id: 'environmental', label: 'Environmental hazard & informational tabs', status: 'pending' },
    { id: 'power', label: 'Power and health monitoring systems', status: 'pending' },
  ]);
  
  const mountedRef = useRef(true);
  const voiceEnabled = useInfoSettingsStore((state) => state.voiceEnabled);

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
        
        // Stage 2: System initialization begins
        setStage(2);
        await new Promise(resolve => setTimeout(resolve, 300));
        if (!mountedRef.current) return;
        
        // Start voice narration if enabled
        if (voiceEnabled) {
          audioBus.speakBootSequence();
        }
        
        // Stage 3: Progressive system initialization with synchronized visuals
        setStage(3);
        
        const systemTimings = [
          1200,  // Initialization procedures
          800,   // Comms
          900,   // Advanced medical
          1000,  // Weaponry
          800,   // Vital signs
          1100,  // Tactical engagement
          1200,  // Environmental/informational
          1000,  // Power/health monitoring
        ];
        
        for (let i = 0; i < systemStages.length; i++) {
          if (!mountedRef.current) return;
          
          // Set current system to active
          setCurrentSystemIndex(i);
          setSystemStages(prev => prev.map((sys, idx) => 
            idx === i ? { ...sys, status: 'active' } : sys
          ));
          
          // Update progress
          setProgress(((i + 1) / systemStages.length) * 100);
          
          // Wait for system initialization
          await new Promise(resolve => setTimeout(resolve, systemTimings[i]));
          
          if (!mountedRef.current) return;
          
          // Mark as complete
          setSystemStages(prev => prev.map((sys, idx) => 
            idx === i ? { ...sys, status: 'complete' } : sys
          ));
        }
        
        if (!mountedRef.current) return;
        
        // Stage 4: All systems operational
        setStage(4);
        setCurrentSystemIndex(-1);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (!mountedRef.current) return;
        
        // Stage 5: Fade out
        setStage(5);
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
  }, [onComplete, voiceEnabled]);

  return (
    <div 
      className={cn('boot-overlay', stage >= 5 && 'boot-fade-out')}
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
            <div className="boot-subtitle">MARK PROTOTYPE PROTECTIVE SYSTEMS</div>
            
            {stage >= 3 && (
              <div className="boot-systems-container">
                <div className="boot-systems-header">
                  <span className="boot-systems-title">SYSTEM INITIALIZATION</span>
                  <span className="boot-systems-progress">{Math.round(progress)}%</span>
                </div>
                
                <div className="boot-progress-bar-container">
                  <div className="boot-progress-bar" style={{ width: `${progress}%` }} />
                </div>
                
                <div className="boot-systems-list">
                  {systemStages.map((system, idx) => (
                    <div 
                      key={system.id}
                      className={cn(
                        'boot-system-item',
                        system.status === 'active' && 'boot-system-active',
                        system.status === 'complete' && 'boot-system-complete',
                        idx > currentSystemIndex && system.status === 'pending' && 'boot-system-pending'
                      )}
                    >
                      <div className="boot-system-indicator">
                        {system.status === 'pending' && (
                          <div className="boot-system-dot" />
                        )}
                        {system.status === 'active' && (
                          <Loader2 className="boot-system-spinner" />
                        )}
                        {system.status === 'complete' && (
                          <Check className="boot-system-check" />
                        )}
                      </div>
                      <span className="boot-system-label">{system.label}</span>
                      <span className="boot-system-status">
                        {system.status === 'pending' && 'STANDBY'}
                        {system.status === 'active' && 'ACTIVE'}
                        {system.status === 'complete' && 'ONLINE'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {stage >= 4 && (
              <div className="boot-complete-message">
                <div className="boot-complete-icon">✓</div>
                <div className="boot-complete-text">BOOT UP SEQUENCE FINISHED</div>
                <div className="boot-complete-subtext">Have a very safe day</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
