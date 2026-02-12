import { ReactNode, useEffect, useState } from 'react';
import { useUIStore } from '../../state/uiState';
import { useInfoSettingsStore } from '../../state/infoSettingsState';
import { useAlertState } from '../../state/hazardAlerts';
import { useViewportOrientation } from '../../hooks/useViewportOrientation';
import { cn } from '@/lib/utils';

interface HudLayoutProps {
  children: ReactNode;
  displayMode?: 'TACTICAL' | 'STANDARD' | 'MINIMAL';
}

export function HudLayout({ children, displayMode = 'STANDARD' }: HudLayoutProps) {
  const { landscapeModeEnabled } = useUIStore();
  const { hudColorScheme, uiScale } = useInfoSettingsStore();
  const { isCriticalFlashing } = useAlertState();
  const isLandscapeOrientation = useViewportOrientation();
  const isWideViewport = typeof window !== 'undefined' && window.innerWidth >= 1024;
  
  // Track viewport height for ultra-compact tier
  const [viewportHeight, setViewportHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 600
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Apply landscape layout when:
  // 1. Landscape mode is enabled AND
  // 2. Either device is in landscape orientation OR viewport is wide (desktop)
  const useLandscapeLayout = landscapeModeEnabled && (isLandscapeOrientation || isWideViewport);
  
  // Ultra-compact tier for very short landscape viewports
  const isUltraCompact = useLandscapeLayout && viewportHeight <= 480;

  return (
    <div 
      className={cn(
        'hud-container',
        isCriticalFlashing && 'hud-critical-alert',
        `display-mode-${displayMode.toLowerCase()}`,
        `hud-scheme-${hudColorScheme.toLowerCase()}`
      )}
      style={{
        '--hud-scale': uiScale,
      } as React.CSSProperties}
    >
      <div className="hud-crt-overlay" />
      <div className="hud-scanlines" />
      <div className={cn(
        'hud-layout',
        useLandscapeLayout ? 'landscape' : 'portrait',
        isUltraCompact && 'ultra-compact'
      )}>
        <header className="hud-header">
          <div className="hud-header-content">
            <div className="hud-title">H.E.V MARK V PROTOTYPE</div>
            <div className="hud-user">OPERATOR: LEON KRYWIAK | BLACK MESA RESEARCH FACILITY</div>
          </div>
        </header>
        <main className="hud-main">
          {children}
        </main>
        <footer className="hud-footer">
          <div className="hud-footer-content">
            <span className="text-xs opacity-60">© {new Date().getFullYear()} BLACK MESA RESEARCH FACILITY - ANOMALOUS MATERIALS DIVISION</span>
            <span className="text-xs opacity-60">
              Built with ❤️ using{' '}
              <a 
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'hev-prototype')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hud-link"
              >
                caffeine.ai
              </a>
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
