import { ContaminationMonitorPanel } from '@/components/hev/ContaminationMonitorPanel';
import { RadiationAnalysisPanel } from '@/components/hev/RadiationAnalysisPanel';
import { EnvironmentalProtectionPanel } from '@/components/hev/EnvironmentalProtectionPanel';
import { Shield } from 'lucide-react';

export function HevTab() {
  return (
    <div className="tab-content">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold tracking-wider">H.E.V. HAZARD SYSTEMS</h2>
        </div>

        <div className="tactical-panel">
          <div className="hud-panel-title-compact">CONTAMINATION MONITORING</div>
          <div className="hud-panel-content-compact">
            <ContaminationMonitorPanel />
          </div>
        </div>

        <div className="tactical-panel">
          <div className="hud-panel-title-compact">RADIATION ANALYSIS</div>
          <div className="hud-panel-content-compact">
            <RadiationAnalysisPanel />
          </div>
        </div>

        <div className="tactical-panel">
          <div className="hud-panel-title-compact">ENVIRONMENTAL PROTECTION</div>
          <div className="hud-panel-content-compact">
            <EnvironmentalProtectionPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
