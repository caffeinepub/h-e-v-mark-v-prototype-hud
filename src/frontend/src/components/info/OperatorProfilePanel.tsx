import { HudPanel } from '../hud/Panels';

export function OperatorProfilePanel() {
  return (
    <div className="tactical-panel">
      <div className="hud-panel-title">OPERATOR PROFILE</div>
      <div className="hud-panel-content">
        <div className="operator-profile-grid">
          <div className="operator-stat-row">
            <span className="operator-label">OPERATOR NAME:</span>
            <span className="operator-value operator-name">LEON KRYWIAK</span>
          </div>
          <div className="operator-stat-row">
            <span className="operator-label">CLEARANCE LEVEL:</span>
            <span className="operator-value">LAMBDA-7</span>
          </div>
          <div className="operator-stat-row">
            <span className="operator-label">SUIT SERIAL:</span>
            <span className="operator-value">HEV-MK4-2847</span>
          </div>
          <div className="operator-stat-row">
            <span className="operator-label">NEURAL LINK:</span>
            <span className="operator-value status-ok">SYNCHRONIZED</span>
          </div>
          <div className="operator-stat-row">
            <span className="operator-label">BIOMETRIC ID:</span>
            <span className="operator-value">VERIFIED</span>
          </div>
          <div className="operator-stat-row">
            <span className="operator-label">MISSION TIME:</span>
            <span className="operator-value">{new Date().toLocaleTimeString('en-US', { hour12: false })}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
