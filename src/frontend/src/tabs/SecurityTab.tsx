import { FacilityMapPanel } from '@/components/security/FacilityMapPanel';
import { SecurityCameraGrid } from '@/components/security/SecurityCameraGrid';
import { AccessControlPanel } from '@/components/security/AccessControlPanel';
import { Shield } from 'lucide-react';

export function SecurityTab() {
  return (
    <div className="tab-content">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold tracking-wider">SECURITY OPERATIONS</h2>
        </div>

        <div className="tactical-panel">
          <div className="hud-panel-title-compact">BLACK MESA FACILITY MAP</div>
          <div className="hud-panel-content-compact">
            <FacilityMapPanel />
          </div>
        </div>

        <div className="tactical-panel">
          <div className="hud-panel-title-compact">SURVEILLANCE SYSTEMS</div>
          <div className="hud-panel-content-compact">
            <SecurityCameraGrid />
          </div>
        </div>

        <div className="tactical-panel">
          <div className="hud-panel-title-compact">ACCESS CONTROL</div>
          <div className="hud-panel-content-compact">
            <AccessControlPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
