export function TacticalOverlay() {
  return (
    <div className="tactical-overlay">
      {/* Corner frames */}
      <div className="tactical-frame tactical-frame-tl" />
      <div className="tactical-frame tactical-frame-tr" />
      <div className="tactical-frame tactical-frame-bl" />
      <div className="tactical-frame tactical-frame-br" />
      
      {/* Center reticle */}
      <div className="tactical-reticle">
        <div className="tactical-reticle-h" />
        <div className="tactical-reticle-v" />
      </div>
      
      {/* Original tactical readouts */}
      <div className="tactical-readout tactical-readout-tl">
        <div className="tactical-readout-label">THREAT LEVEL</div>
        <div className="tactical-readout-value">NOMINAL</div>
      </div>
      
      <div className="tactical-readout tactical-readout-tr">
        <div className="tactical-readout-label">COMBAT MODE</div>
        <div className="tactical-readout-value">ACTIVE</div>
      </div>
      
      <div className="tactical-readout tactical-readout-bl">
        <div className="tactical-readout-label">TARGETING</div>
        <div className="tactical-readout-value">ONLINE</div>
      </div>
      
      <div className="tactical-readout tactical-readout-br">
        <div className="tactical-readout-label">COMMS</div>
        <div className="tactical-readout-value">SECURE</div>
      </div>

      {/* New militarized tactical systems */}
      <div className="tactical-readout tactical-readout-center-left">
        <div className="tactical-readout-label">HEART RATE</div>
        <div className="tactical-readout-value">
          <span className="tactical-heartbeat">72</span> BPM
        </div>
        <div className="tactical-readout-subvalue">NOMINAL</div>
      </div>

      <div className="tactical-readout tactical-readout-center-right">
        <div className="tactical-readout-label">ENEMY LOCATOR</div>
        <div className="tactical-readout-value">
          <span className="tactical-scan-indicator">SCANNING</span>
        </div>
        <div className="tactical-readout-subvalue">0 CONTACTS</div>
      </div>

      <div className="tactical-readout tactical-readout-top-center">
        <div className="tactical-readout-label">ADVANCED COMBAT SYSTEM</div>
        <div className="tactical-readout-value">ENGAGED</div>
        <div className="tactical-readout-subvalue">THREAT ANALYSIS: ACTIVE</div>
      </div>

      <div className="tactical-readout tactical-readout-bottom-center">
        <div className="tactical-readout-label">AUTO ENGAGEMENT</div>
        <div className="tactical-readout-value">STANDBY</div>
        <div className="tactical-readout-subvalue">MANUAL OVERRIDE</div>
      </div>
    </div>
  );
}
