import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Droplet, Wind, AlertTriangle } from 'lucide-react';

export function ContaminationMonitorPanel() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Droplet className="w-4 h-4 text-primary" />
        <span className="text-sm font-semibold">CONTAMINATION MONITORING</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="p-3 border border-border">
          <div className="text-xs font-semibold text-primary mb-2">EXPOSURE LEVELS</div>
          <div className="space-y-2">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span>Surface Contamination</span>
                <span>0.02 mSv</span>
              </div>
              <Progress value={5} className="h-1" />
            </div>
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span>Airborne Particles</span>
                <span>12 PPM</span>
              </div>
              <Progress value={15} className="h-1" />
            </div>
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span>Biological Agents</span>
                <span>TRACE</span>
              </div>
              <Progress value={3} className="h-1" />
            </div>
          </div>
        </div>

        <div className="p-3 border border-border">
          <div className="text-xs font-semibold text-primary mb-2">DECONTAMINATION STATUS</div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span>Last Decon Cycle</span>
              <Badge variant="outline">47 MIN AGO</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Suit Integrity</span>
              <Badge>98.7%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Filter Status</span>
              <Badge>NOMINAL</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 border-2 border-accent/30 bg-accent/5">
        <div className="flex items-center gap-2 mb-2">
          <Wind className="w-4 h-4 text-accent" />
          <span className="text-xs font-semibold">AIRBORNE HAZARD ANALYSIS</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div>
            <div className="text-accent font-semibold">Particulates</div>
            <div>LOW</div>
          </div>
          <div>
            <div className="text-accent font-semibold">Toxins</div>
            <div>MINIMAL</div>
          </div>
          <div>
            <div className="text-accent font-semibold">Pathogens</div>
            <div>NONE DETECTED</div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 p-2 border border-border bg-background/50">
        <AlertTriangle className="w-4 h-4 text-primary" />
        <span className="text-xs">Suit breach warnings: NONE</span>
      </div>
    </div>
  );
}
