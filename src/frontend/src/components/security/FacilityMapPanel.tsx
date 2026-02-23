import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

export function FacilityMapPanel() {
  const [zoom, setZoom] = useState(1);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);

  const sectors = [
    { id: 'sector-a', name: 'Sector A', x: 20, y: 15 },
    { id: 'sector-b', name: 'Sector B', x: 45, y: 25 },
    { id: 'sector-c', name: 'Sector C', x: 70, y: 20 },
    { id: 'anomalous', name: 'Anomalous Materials', x: 50, y: 60 },
  ];

  const ventLocations = [
    { x: 30, y: 30 },
    { x: 55, y: 40 },
    { x: 65, y: 55 },
    { x: 40, y: 70 },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline">FACILITY MAP</Badge>
          {selectedSector && <Badge>{selectedSector}</Badge>}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
            disabled={zoom <= 0.5}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setZoom(Math.min(2, zoom + 0.25))}
            disabled={zoom >= 2}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setZoom(1)}>
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="relative border-2 border-primary/30 bg-background/50 overflow-hidden" style={{ height: '400px' }}>
        <div
          className="absolute inset-0 transition-transform duration-300"
          style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
        >
          <img
            src="/assets/generated/black-mesa-facility-map.dim_1200x800.png"
            alt="Black Mesa Facility Map"
            className="w-full h-full object-contain"
          />

          {/* Sector markers */}
          {sectors.map((sector) => (
            <button
              key={sector.id}
              className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 bg-primary/20 border-2 border-primary rounded-full hover:bg-primary/40 transition-colors cursor-pointer"
              style={{ left: `${sector.x}%`, top: `${sector.y}%` }}
              onClick={() => setSelectedSector(sector.name)}
              title={sector.name}
            >
              <span className="text-xs font-bold text-primary">{sector.name.charAt(sector.name.length - 1)}</span>
            </button>
          ))}

          {/* Vent system markers */}
          {ventLocations.map((vent, index) => (
            <div
              key={index}
              className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 bg-accent/30 border border-accent animate-pulse"
              style={{ left: `${vent.x}%`, top: `${vent.y}%` }}
              title="Vent Access Point"
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-primary/20 border-2 border-primary rounded-full" />
          <span>Sector Marker</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-accent/30 border border-accent" />
          <span>Vent Access</span>
        </div>
      </div>
    </div>
  );
}
