import { Camera, Lock, AlertTriangle, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function FacilityMonitoringTab() {
  return (
    <div className="space-y-6 p-6">
      <div className="bg-black/40 border-2 border-primary/30 p-4">
        <div className="flex items-center gap-2 mb-2">
          <Camera className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-primary">FACILITY MONITORING</h2>
        </div>
        <p className="text-sm text-muted-foreground">Black Mesa Security Systems</p>
      </div>

      {/* Sector Security Status */}
      <div className="bg-black/40 border-2 border-primary/30 p-6">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-primary">SECTOR SECURITY STATUS</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {['A', 'B', 'C', 'D', 'E', 'F'].map((sector) => (
            <div key={sector} className="p-4 bg-black/20 border border-primary/20">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-primary">SECTOR {sector}</span>
                <Badge
                  variant={sector === 'C' ? 'destructive' : 'default'}
                  className={sector === 'C' ? '' : 'bg-green-500/20 text-green-500 border-green-500'}
                >
                  {sector === 'C' ? 'BREACH' : 'SECURE'}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground">
                {sector === 'C' ? 'Containment failure detected' : 'All systems operational'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Surveillance Cameras */}
      <div className="bg-black/40 border-2 border-primary/30 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Camera className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-primary">SURVEILLANCE FEEDS</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((cam) => (
            <div key={cam} className="border-2 border-primary/30 bg-black/60 aspect-video relative">
              <img
                src={`/assets/generated/security-cam-0${cam}.dim_320x240.png`}
                alt={`Camera ${cam}`}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute top-2 left-2 bg-black/80 px-2 py-1 text-xs font-bold text-primary">
                CAM-{cam.toString().padStart(2, '0')}
              </div>
              <div className="absolute top-2 right-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Access Control */}
      <div className="bg-black/40 border-2 border-primary/30 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lock className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-primary">ACCESS CONTROL</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-black/20 border border-primary/20">
            <div>
              <div className="font-bold text-primary">Main Entrance</div>
              <div className="text-xs text-muted-foreground">Level 1 Clearance</div>
            </div>
            <Badge className="bg-green-500/20 text-green-500 border-green-500">UNLOCKED</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-black/20 border border-primary/20">
            <div>
              <div className="font-bold text-primary">Research Labs</div>
              <div className="text-xs text-muted-foreground">Level 2 Clearance</div>
            </div>
            <Badge className="bg-red-500/20 text-red-500 border-red-500">LOCKED</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-black/20 border border-primary/20">
            <div>
              <div className="font-bold text-primary">Lambda Complex</div>
              <div className="text-xs text-muted-foreground">Level 4 Clearance</div>
            </div>
            <Badge className="bg-red-500/20 text-red-500 border-red-500">LOCKED</Badge>
          </div>
        </div>
      </div>

      {/* Emergency Protocols */}
      <div className="bg-black/40 border-2 border-primary/30 p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-primary">EMERGENCY PROTOCOLS</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button variant="destructive" className="w-full">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Facility Lockdown
          </Button>
          <Button variant="outline" className="w-full">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Evacuation Alert
          </Button>
          <Button variant="outline" className="w-full">
            <Lock className="w-4 h-4 mr-2" />
            Seal Sector C
          </Button>
          <Button variant="outline" className="w-full">
            <Camera className="w-4 h-4 mr-2" />
            Review All Feeds
          </Button>
        </div>
      </div>

      {/* Containment Breach Log */}
      <div className="bg-black/40 border-2 border-primary/30 p-6">
        <h3 className="text-lg font-bold text-primary mb-4">CONTAINMENT BREACH LOG</h3>
        <div className="space-y-2 text-sm">
          <div className="p-3 bg-red-500/10 border border-red-500/30">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-red-500">SECTOR C - ANOMALOUS MATERIALS</span>
              <span className="text-xs text-muted-foreground">08:47:23</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Resonance cascade detected. Multiple containment failures. Hostile entities present.
            </p>
          </div>
          <div className="p-3 bg-orange-500/10 border border-orange-500/30">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-orange-500">SECTOR D - BIOLOGICAL RESEARCH</span>
              <span className="text-xs text-muted-foreground">09:15:41</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Specimen containment compromised. Evacuation in progress.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
