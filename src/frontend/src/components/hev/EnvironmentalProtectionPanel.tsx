import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Wind, Thermometer, Droplets, Shield } from 'lucide-react';

export function EnvironmentalProtectionPanel() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Shield className="w-4 h-4 text-primary" />
        <span className="text-sm font-semibold">ENVIRONMENTAL PROTECTION SYSTEMS</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="p-3 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Wind className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold">RESPIRATOR</span>
          </div>
          <div className="space-y-2">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span>Filter Efficiency</span>
                <span>99.7%</span>
              </div>
              <Progress value={99.7} className="h-1" />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span>Air Flow Rate</span>
              <Badge variant="outline">OPTIMAL</Badge>
            </div>
          </div>
        </div>

        <div className="p-3 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Droplets className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold">HAZMAT SEAL</span>
          </div>
          <div className="space-y-2">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span>Seal Integrity</span>
                <span>100%</span>
              </div>
              <Progress value={100} className="h-1" />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span>Pressure Status</span>
              <Badge>POSITIVE</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 border border-border">
        <div className="flex items-center gap-2 mb-2">
          <Thermometer className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold">TEMPERATURE REGULATION</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div>
            <div className="text-primary font-semibold">Internal</div>
            <div>22°C</div>
          </div>
          <div>
            <div className="text-primary font-semibold">External</div>
            <div>18°C</div>
          </div>
          <div>
            <div className="text-primary font-semibold">Status</div>
            <Badge variant="outline">NOMINAL</Badge>
          </div>
        </div>
      </div>

      <div className="p-3 border border-border">
        <div className="text-xs font-semibold text-primary mb-2">ATMOSPHERIC COMPOSITION</div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center justify-between">
            <span>Oxygen</span>
            <span>20.9%</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Nitrogen</span>
            <span>78.1%</span>
          </div>
          <div className="flex items-center justify-between">
            <span>CO₂</span>
            <span>0.04%</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Toxins</span>
            <Badge variant="outline">NONE</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
