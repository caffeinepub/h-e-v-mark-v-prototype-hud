import { useMarkFeatures } from '../hooks/useMarkFeatures';
import { MedicalReadouts } from '../components/medical/MedicalReadouts';
import { MedicalInteractivePanels } from '../components/medical/MedicalInteractivePanels';
import { Activity } from 'lucide-react';

export function MedicalTab() {
  const markFeatures = useMarkFeatures();

  // Mark I and II have no medical tab
  if (!markFeatures.tabs.medical) {
    return (
      <div className="tab-content-compact">
        <div className="hud-panel-compact">
          <div className="text-center py-8 opacity-70">
            <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <div className="font-semibold">MEDICAL SYSTEMS UNAVAILABLE</div>
            <div className="text-xs mt-2">This feature requires Mark III or higher</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tab-content medical-tab-enhanced">
      <MedicalReadouts />
      {markFeatures.advanced.bioMonitoring && <MedicalInteractivePanels />}
    </div>
  );
}
