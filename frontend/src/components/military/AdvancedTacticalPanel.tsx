import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target, Radio, Shield, Crosshair } from 'lucide-react';

export function AdvancedTacticalPanel() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="p-3 border-2 border-primary/30 bg-background/50">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold">THREAT ASSESSMENT</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span>Hostile Contacts</span>
              <Badge variant="destructive">7</Badge>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span>Threat Level</span>
              <Badge variant="outline">MODERATE</Badge>
            </div>
            <Progress value={60} className="h-2" />
          </div>
        </div>

        <div className="p-3 border-2 border-primary/30 bg-background/50">
          <div className="flex items-center gap-2 mb-2">
            <Radio className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold">FIRE SUPPORT</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span>Artillery Available</span>
              <Badge>READY</Badge>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span>Air Support</span>
              <Badge variant="outline">ON STANDBY</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 border border-border">
        <div className="flex items-center gap-2 mb-3">
          <Crosshair className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold">ENGAGEMENT PROTOCOLS</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <div className="font-semibold text-primary mb-1">ROE Status</div>
            <div className="opacity-90">WEAPONS FREE</div>
          </div>
          <div>
            <div className="font-semibold text-primary mb-1">OPORD</div>
            <div className="opacity-90">SEARCH & DESTROY</div>
          </div>
          <div>
            <div className="font-semibold text-primary mb-1">Area Denial</div>
            <div className="opacity-90">AUTHORIZED</div>
          </div>
          <div>
            <div className="font-semibold text-primary mb-1">Fire Discipline</div>
            <div className="opacity-90">CONTROLLED</div>
          </div>
        </div>
      </div>

      <div className="p-3 border border-border">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold">TACTICAL OVERLAY</span>
        </div>
        <div className="space-y-1 text-xs">
          <div className="flex items-center justify-between">
            <span>Grid Reference</span>
            <span className="font-mono">NK 4527 8934</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Elevation</span>
            <span className="font-mono">247m ASL</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Bearing</span>
            <span className="font-mono">087° MAG</span>
          </div>
        </div>
      </div>
    </div>
  );
}
