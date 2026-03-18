import { cn } from '@/lib/utils';

export function HudOfflineOverlay() {
  return (
    <div className="hud-offline-overlay">
      <div className="hud-offline-content">
        <div className="hud-offline-icon">⚠</div>
        <div className="hud-offline-title">HUD SYSTEM OFFLINE</div>
        <div className="hud-offline-message">
          Heads-up display is currently disabled.
          <br />
          Restore HUD status in INFO tab to resume operations.
        </div>
      </div>
    </div>
  );
}
