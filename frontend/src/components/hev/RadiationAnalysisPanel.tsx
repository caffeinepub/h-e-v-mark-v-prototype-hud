import { useHazardsStore } from '@/state/hazardsState';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioTower, Shield, Clock } from 'lucide-react';

export function RadiationAnalysisPanel() {
  const { levels } = useHazardsStore();

  const accumulatedDose = 0.15; // mSv
  const safeExposureTime = 240; // minutes

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <RadioTower className="w-4 h-4 text-primary" />
        <span className="text-sm font-semibold">RADIATION ANALYSIS</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="p-3 border-2 border-primary/30 bg-background/50">
          <div className="text-xs font-semibold text-primary mb-2">DOSIMETER READINGS</div>
          <div className="space-y-2">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span>Current Level</span>
                <span>{levels.radiation}%</span>
              </div>
              <Progress value={levels.radiation} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span>Accumulated Dose</span>
                <span>{accumulatedDose} mSv</span>
              </div>
              <Progress value={(accumulatedDose / 1.0) * 100} className="h-2" />
            </div>
          </div>
        </div>

        <div className="p-3 border border-border">
          <div className="text-xs font-semibold text-primary mb-2">ISOTOPE IDENTIFICATION</div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <span>Cesium-137</span>
              <Badge variant="outline">TRACE</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Cobalt-60</span>
              <Badge variant="outline">NONE</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Iodine-131</span>
              <Badge variant="outline">NONE</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-accent" />
            <span className="text-xs font-semibold">SHIELDING</span>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <span>Effectiveness</span>
              <span>95%</span>
            </div>
            <Progress value={95} className="h-1" />
          </div>
        </div>

        <div className="p-3 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-accent" />
            <span className="text-xs font-semibold">SAFE EXPOSURE</span>
          </div>
          <div className="text-xs">
            <div className="font-semibold">{safeExposureTime} minutes</div>
            <div className="opacity-70">remaining at current level</div>
          </div>
        </div>
      </div>
    </div>
  );
}
