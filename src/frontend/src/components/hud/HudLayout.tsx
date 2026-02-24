import { ReactNode, useRef, useEffect } from 'react';
import { useInfoSettingsStore } from '@/state/infoSettingsStore';
import { useSuitStore } from '@/state/suitState';
import { useHazardsStore } from '@/state/hazardsState';
import { useHudPresence } from '@/hooks/useHudPresence';
import { useAutoUiScale } from '@/hooks/useAutoUiScale';
import { HudGlobalEffects } from './HudGlobalEffects';
import { EnhancedStatusIndicators } from './EnhancedStatusIndicators';
import { FactionLayoutWrapper } from './FactionLayoutWrapper';
import { cn } from '@/lib/utils';

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
    uiScale,
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
        return 'H.E.V. MARK V';
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

  // Apply faction-specific CSS class to root
  useEffect(() => {
    if (containerRef.current) {
      const root = containerRef.current;
      // Remove all faction classes
      root.classList.remove('faction-hev', 'faction-hecu', 'faction-security', 'faction-resistance');
      // Add current faction class
      root.classList.add(`faction-${systemStyle}`);
    }
  }, [systemStyle]);

  return (
    <div
      ref={containerRef}
      className={cn('hud-container', `faction-${systemStyle}`)}
      data-system-style={systemStyle}
      data-hud-mode={hudStyleMode}
      style={
        {
          '--hud-opacity': hudOpacity,
          '--hud-scale': uiScale * autoScale,
        } as React.CSSProperties
      }
    >
      <HudGlobalEffects isCriticalFlashing={isCritical} />
      <EnhancedStatusIndicators />

      <FactionLayoutWrapper>
        <div className="hud-layout">
          <header className="hud-header">
            <div className="hud-header-content">
              <h1 className="hud-title">{getFactionDisplayName()}</h1>
              <div className="hud-subtitle">
                <span className="hud-operator">{operatorName}</span>
                <span className="hud-status">ONLINE</span>
              </div>
            </div>
          </header>
          <main className="hud-main">{children}</main>
        </div>
      </FactionLayoutWrapper>
    </div>
  );
}
