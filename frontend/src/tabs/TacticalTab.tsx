import React from 'react';
import { RadarPanel } from '../components/tactical/RadarPanel';
import { ThreatAssessmentPanel } from '../components/tactical/ThreatAssessmentPanel';
import { MissionBriefingDisplay } from '../components/tactical/MissionBriefingDisplay';
import { UnitTrackerModule } from '../components/tactical/UnitTrackerModule';

export function TacticalTab() {
  return (
    <div className="p-2 space-y-2 animate-fade-in-up">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <RadarPanel />
        <div className="space-y-2">
          <UnitTrackerModule />
          <ThreatAssessmentPanel />
        </div>
      </div>
      <MissionBriefingDisplay />
    </div>
  );
}
