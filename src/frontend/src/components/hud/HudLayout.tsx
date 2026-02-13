import { useRef, useEffect } from 'react';
import { useInfoSettingsStore } from '../../state/infoSettingsState';
import { useUIStore } from '../../state/uiState';
import { useViewportOrientation } from '../../hooks/useViewportOrientation';
import { useAlertState } from '../../state/hazardAlerts';
import { useHudPresence } from '../../hooks/useHudPresence';
import { useAutoUiScale } from '../../hooks/useAutoUiScale';
import { HudGlobalEffects } from './HudGlobalEffects';
import { SiX, SiGithub } from 'react-icons/si';
import { Heart } from 'lucide-react';

interface HudLayoutProps {
  children: React.ReactNode;
}

export function HudLayout({ children }: HudLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { hudColorScheme, uiScale } = useInfoSettingsStore();
  const { landscapeModeEnabled } = useUIStore();
  const isLandscape = useViewportOrientation();
  const { isCriticalFlashing } = useAlertState();
  const autoScale = useAutoUiScale();

  // Apply HUD presence tracking for reactive effects
  useHudPresence(containerRef);

  // Apply effective UI scale (manual * auto) CSS variable
  useEffect(() => {
    if (containerRef.current) {
      const effectiveScale = uiScale * autoScale;
      containerRef.current.style.setProperty('--hud-scale', effectiveScale.toString());
    }
  }, [uiScale, autoScale]);

  // Determine if landscape layout should be active
  const shouldUseLandscape = landscapeModeEnabled || isLandscape;
  
  // Check if viewport is ultra-compact (short landscape)
  const isUltraCompact = typeof window !== 'undefined' && 
    window.innerHeight <= 480 && 
    window.innerWidth > window.innerHeight;

  const schemeClass = `hud-scheme-${hudColorScheme.toLowerCase()}`;
  const landscapeClass = shouldUseLandscape ? 'hud-landscape' : '';
  const compactClass = isUltraCompact ? 'hud-ultra-compact' : '';
  const criticalClass = isCriticalFlashing ? 'hud-critical-alert' : '';

  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname)
    : 'hev-suit-hud';

  return (
    <div 
      ref={containerRef}
      className={`hud-container ${schemeClass} ${landscapeClass} ${compactClass} ${criticalClass}`}
    >
      {/* CRT Overlay */}
      <div className="hud-crt-overlay" />
      
      {/* Scanlines */}
      <div className="hud-scanlines" />

      {/* Global Effects (bloom, critical, presence) */}
      <HudGlobalEffects isCriticalFlashing={isCriticalFlashing} />

      {/* Main Layout */}
      <div className="hud-layout">
        <header className="hud-header">
          <div className="hud-header-content">
            <h1 className="hud-title">H.E.V SUIT INTERFACE</h1>
            <div className="hud-user">OPERATOR: LEON KRYWIAK</div>
          </div>
        </header>

        <main className="hud-main">
          {children}
        </main>

        <footer className="hud-footer">
          <div className="hud-footer-content">
            <div className="hud-footer-left">
              © {currentYear} BLACK MESA RESEARCH FACILITY
            </div>
            <div className="hud-footer-center">
              Built with <Heart className="inline w-4 h-4 text-primary" fill="currentColor" /> using{' '}
              <a 
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hud-link"
              >
                caffeine.ai
              </a>
            </div>
            <div className="hud-footer-right">
              <a 
                href="https://twitter.com/blackmesa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hud-link"
                aria-label="Twitter"
              >
                <SiX className="inline w-4 h-4" />
              </a>
              {' '}
              <a 
                href="https://github.com/blackmesa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hud-link"
                aria-label="GitHub"
              >
                <SiGithub className="inline w-4 h-4" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
