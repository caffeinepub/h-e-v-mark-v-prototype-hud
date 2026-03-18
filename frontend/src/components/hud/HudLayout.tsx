import React from 'react';
import { useInfoSettingsStore } from '../../state/infoSettingsStore';

interface HudLayoutProps {
  children: React.ReactNode;
}

export function HudLayout({ children }: HudLayoutProps) {
  const { systemStyle, uiScale, hudOpacity } = useInfoSettingsStore();

  const factionClass =
    systemStyle === 'hecu'
      ? 'faction-hecu'
      : systemStyle === 'guard'
      ? 'faction-guard'
      : systemStyle === 'resistance'
      ? 'faction-resistance'
      : 'faction-hev';

  const factionTitle =
    systemStyle === 'hecu'
      ? 'HECU TACTICAL INTERFACE'
      : systemStyle === 'guard'
      ? 'BLACK MESA SECURITY HUD'
      : systemStyle === 'resistance'
      ? 'COMBINE OVERWATCH SYSTEM'
      : 'H.E.V MARK V PROTECTIVE SYSTEMS';

  return (
    <div
      className={`${factionClass} flex flex-col min-h-dvh`}
      style={{
        background: '#000000',
        opacity: (hudOpacity ?? 100) / 100,
        fontSize: `${(uiScale ?? 100) / 100}rem`,
        transition: 'opacity 0.3s ease, font-size 0.3s ease',
      }}
    >
      {/* Header bar */}
      <header
        className="flex items-center justify-between px-3 py-2 border-b"
        style={{
          background: '#000000',
          borderColor: 'var(--faction-border)',
          boxShadow: '0 1px 8px var(--faction-glow)',
        }}
      >
        <div className="flex items-center gap-2">
          <img
            src="/assets/generated/hev-logo.dim_256x256.png"
            alt="HEV"
            className="w-5 h-5 opacity-80"
            style={{ filter: 'sepia(1) saturate(3) hue-rotate(var(--hue-rotate, 0deg))' }}
          />
          <span
            className="text-xs font-bold tracking-tactical uppercase"
            style={{
              color: 'var(--faction-primary)',
              fontFamily: 'Orbitron, monospace',
              textShadow: '0 0 8px var(--faction-glow)',
            }}
          >
            {factionTitle}
          </span>
        </div>
        <div
          className="text-xs tracking-hud"
          style={{ color: 'var(--faction-dim)', fontFamily: 'Share Tech Mono, monospace' }}
        >
          {new Date().toLocaleTimeString('en-US', { hour12: false })}
        </div>
      </header>

      {/* Main content */}
      <main className="flex flex-col flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  );
}
