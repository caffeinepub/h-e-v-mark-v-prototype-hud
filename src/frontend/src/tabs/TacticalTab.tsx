import { RadarPanel } from '@/components/tactical/RadarPanel';
import { ThreatAssessmentPanel } from '@/components/tactical/ThreatAssessmentPanel';
import { MissionBriefingDisplay } from '@/components/tactical/MissionBriefingDisplay';

export function TacticalTab() {
  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RadarPanel />
        <ThreatAssessmentPanel />
      </div>
      <MissionBriefingDisplay />
    </div>
  );
}
