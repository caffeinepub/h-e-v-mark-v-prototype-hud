import { MedicalReadouts } from '../components/medical/MedicalReadouts';
import { MedicalInteractivePanels } from '../components/medical/MedicalInteractivePanels';

export function MedicalTab() {
  return (
    <div className="tab-content">
      <div className="medical-tab-layout">
        <MedicalReadouts />
        <MedicalInteractivePanels />
      </div>
    </div>
  );
}
