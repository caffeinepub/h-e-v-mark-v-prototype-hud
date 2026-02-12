import { ReactNode } from 'react';
import { useSuitStore } from '../../state/suitState';
import { StatPanel } from './Panels';

interface TacticalHudShellProps {
  children: ReactNode;
}

export function TacticalHudShell({ children }: TacticalHudShellProps) {
  const { stats } = useSuitStore();

  return (
    <div className="tactical-hud-shell">
      {/* Top tactical bar */}
      <div className="tactical-top-bar">
        <div className="tactical-module">
          <div className="tactical-module-label">ADVANCED COMBAT SYSTEM</div>
          <div className="tactical-module-value">ENGAGED</div>
          <div className="tactical-module-sub">THREAT ANALYSIS: ACTIVE</div>
        </div>
        <div className="tactical-module">
          <div className="tactical-module-label">COMBAT MODE</div>
          <div className="tactical-module-value">ACTIVE</div>
        </div>
        <div className="tactical-module">
          <div className="tactical-module-label">TARGETING</div>
          <div className="tactical-module-value">ONLINE</div>
        </div>
      </div>

      {/* Main content area with side panels */}
      <div className="tactical-main-grid">
        {/* Left tactical sidebar */}
        <div className="tactical-sidebar tactical-sidebar-left">
          <div className="tactical-module">
            <div className="tactical-module-label">THREAT LEVEL</div>
            <div className="tactical-module-value">NOMINAL</div>
          </div>
          <div className="tactical-module">
            <div className="tactical-module-label">HEART RATE</div>
            <div className="tactical-module-value">
              <span className="tactical-heartbeat">72</span> BPM
            </div>
            <div className="tactical-module-sub">NOMINAL</div>
          </div>
          <StatPanel 
            label="HEALTH" 
            value={stats.health} 
            max={100} 
            status={stats.health >= 70 ? 'nominal' : stats.health >= 40 ? 'warning' : 'critical'}
            className="tactical-stat-compact"
          />
          <StatPanel 
            label="ARMOR" 
            value={stats.armor} 
            max={100}
            status={stats.armor >= 70 ? 'nominal' : stats.armor >= 40 ? 'warning' : 'critical'}
            className="tactical-stat-compact"
          />
        </div>

        {/* Center content area (tabs) */}
        <div className="tactical-center-content">
          {/* Center reticle overlay */}
          <div className="tactical-reticle">
            <div className="tactical-reticle-h" />
            <div className="tactical-reticle-v" />
          </div>
          {children}
        </div>

        {/* Right tactical sidebar */}
        <div className="tactical-sidebar tactical-sidebar-right">
          <div className="tactical-module">
            <div className="tactical-module-label">COMMS</div>
            <div className="tactical-module-value">SECURE</div>
          </div>
          <div className="tactical-module">
            <div className="tactical-module-label">ENEMY LOCATOR</div>
            <div className="tactical-module-value">
              <span className="tactical-scan-indicator">SCANNING</span>
            </div>
            <div className="tactical-module-sub">0 CONTACTS</div>
          </div>
          <StatPanel 
            label="AUX POWER" 
            value={stats.aux} 
            max={100}
            status={stats.aux >= 70 ? 'nominal' : stats.aux >= 40 ? 'warning' : 'critical'}
            className="tactical-stat-compact"
          />
          <StatPanel 
            label="AMMO" 
            value={stats.ammo} 
            max={999}
            status="nominal"
            className="tactical-stat-compact"
          />
        </div>
      </div>

      {/* Bottom tactical bar */}
      <div className="tactical-bottom-bar">
        <div className="tactical-module">
          <div className="tactical-module-label">AUTO ENGAGEMENT</div>
          <div className="tactical-module-value">STANDBY</div>
          <div className="tactical-module-sub">MANUAL OVERRIDE</div>
        </div>
      </div>

      {/* Corner frames for visual effect */}
      <div className="tactical-frame tactical-frame-tl" />
      <div className="tactical-frame tactical-frame-tr" />
      <div className="tactical-frame tactical-frame-bl" />
      <div className="tactical-frame tactical-frame-br" />
    </div>
  );
}
