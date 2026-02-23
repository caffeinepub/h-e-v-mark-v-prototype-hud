import { ReactNode, useRef, useEffect } from 'react';
import { useInfoSettingsStore } from '@/state/infoSettingsStore';
import { useSuitStore } from '@/state/suitState';
import { useHazardsStore } from '@/state/hazardsState';
import { useHudPresence } from '@/hooks/useHudPresence';
import { useAutoUiScale } from '@/hooks/useAutoUiScale';
import { HudGlobalEffects } from './HudGlobalEffects';
import { EnhancedStatusIndicators } from './EnhancedStatusIndicators';
import { FactionLayoutWrapper } from './FactionLayoutWrapper';
import { MarkIGlitchOverlay } from './MarkIGlitchOverlay';
import { getMarkTheme } from '@/lib/markThemes';

interface HudLayoutProps {
  children: ReactNode;
}

export function HudLayout({ children }: HudLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    systemStyle,
    hudStyleMode,
    hudOpacity,
    operatorName,
    hevMark,
    separateMarkStyleFromFunction,
    functionalMark,
  } = useInfoSettingsStore();
  const { stats } = useSuitStore();
  const { getAggregateHazard } = useHazardsStore();
  const autoScale = useAutoUiScale();

  useHudPresence(containerRef);

  const aggregateHazard = getAggregateHazard();
  const isCritical = stats.health < 25 || stats.armor < 20 || aggregateHazard > 75;

  // Get faction display name
  const getFactionDisplayName = () => {
    switch (systemStyle) {
      case 'hev':
        return getMarkTheme(hevMark).name;
      case 'hecu':
        return 'HECU MARINE';
      case 'security':
      case 'guard':
        return 'SECURITY GUARD';
      case 'resistance':
        return 'RESISTANCE FIGHTER';
      default:
        return 'H.E.V. MARK V';
    }
  };

  // Apply Mark theme to CSS variables
  useEffect(() => {
    const visualMark = hevMark;
    const theme = getMarkTheme(visualMark);

    if (containerRef.current) {
      const root = containerRef.current;
      root.style.setProperty('--primary', theme.colors.primary);
      root.style.setProperty('--accent', theme.colors.accent);
      root.style.setProperty('--border', theme.colors.border);
      root.style.setProperty('--background', theme.colors.background);
      root.style.setProperty('--foreground', theme.colors.foreground);
      
      // Add visual style class
      root.setAttribute('data-mark-style', theme.visualStyle);
      root.setAttribute('data-mark', visualMark);
    }
  }, [hevMark]);

  return (
    <div
      ref={containerRef}
      className="hud-container"
      data-system-style={systemStyle}
      data-hud-mode={hudStyleMode}
      style={
        {
          '--hud-opacity': hudOpacity,
          '--hud-scale': autoScale,
        } as React.CSSProperties
      }
    >
      <HudGlobalEffects isCriticalFlashing={isCritical} />
      <EnhancedStatusIndicators />
      <MarkIGlitchOverlay />

      <FactionLayoutWrapper>
        <div className="hud-layout">
          <header className="hud-header">
            <div className="hud-header-content">
              <h1 className="hud-title">{getFactionDisplayName()}</h1>
              <div className="hud-subtitle">
                <span className="operator-name">{operatorName}</span>
                <span className="hud-status-dot" />
                <span>SYSTEM ONLINE</span>
              </div>
            </div>
          </header>

          <main className="hud-main">{children}</main>
        </div>
      </FactionLayoutWrapper>
    </div>
  );
}
