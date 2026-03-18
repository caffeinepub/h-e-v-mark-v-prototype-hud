import React from 'react';
import { MedicalReadouts } from '../components/medical/MedicalReadouts';
import { MedicalInteractivePanels } from '../components/medical/MedicalInteractivePanels';
import { MorphineDoseModule } from '../components/medical/MorphineDoseModule';
import { OxygenLevelModule } from '../components/medical/OxygenLevelModule';

export function MedicalTab() {
  return (
    <div className="p-2 space-y-2 animate-fade-in-up">
      <div className="grid grid-cols-1 gap-2">
        <MedicalReadouts />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <MorphineDoseModule />
        <OxygenLevelModule />
      </div>
      <MedicalInteractivePanels />
    </div>
  );
}
