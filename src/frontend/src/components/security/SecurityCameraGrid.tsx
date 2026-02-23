import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Video, Circle, SkipForward } from 'lucide-react';

interface CameraFeed {
  id: string;
  name: string;
  location: string;
  image: string;
  status: 'active' | 'offline' | 'recording';
}

export function SecurityCameraGrid() {
  const [selectedCamera, setSelectedCamera] = useState<string>('cam-01');

  const cameras: CameraFeed[] = [
    {
      id: 'cam-01',
      name: 'CAM-01',
      location: 'Sector C Corridor',
      image: '/assets/generated/security-cam-01.dim_320x240.png',
      status: 'recording',
    },
    {
      id: 'cam-02',
      name: 'CAM-02',
      location: 'Anomalous Materials Lab',
      image: '/assets/generated/security-cam-02.dim_320x240.png',
      status: 'recording',
    },
    {
      id: 'cam-03',
      name: 'CAM-03',
      location: 'Main Entrance',
      image: '/assets/generated/security-cam-03.dim_320x240.png',
      status: 'active',
    },
  ];

  const cycleCamera = () => {
    const currentIndex = cameras.findIndex((cam) => cam.id === selectedCamera);
    const nextIndex = (currentIndex + 1) % cameras.length;
    setSelectedCamera(cameras[nextIndex].id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'recording':
        return 'text-destructive';
      case 'active':
        return 'text-primary';
      case 'offline':
        return 'text-muted-foreground';
      default:
        return 'text-foreground';
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Video className="w-4 h-4" />
          <span className="text-sm font-semibold">SECURITY CAMERA FEEDS</span>
        </div>
        <Button variant="outline" size="sm" onClick={cycleCamera}>
          <SkipForward className="w-4 h-4 mr-1" />
          Cycle
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {cameras.map((camera) => (
          <button
            key={camera.id}
            className={`relative border-2 transition-all ${
              selectedCamera === camera.id ? 'border-primary' : 'border-border hover:border-primary/50'
            }`}
            onClick={() => setSelectedCamera(camera.id)}
          >
            <img src={camera.image} alt={camera.name} className="w-full h-auto" />
            <div className="absolute top-2 left-2 flex items-center gap-2">
              <Badge variant="outline" className="bg-background/80">
                {camera.name}
              </Badge>
              <Circle className={`w-3 h-3 fill-current ${getStatusColor(camera.status)}`} />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-background/90 p-2 border-t border-border">
              <div className="text-xs font-semibold">{camera.location}</div>
              <div className="text-xs opacity-70">
                {new Date().toLocaleTimeString()} | {camera.status.toUpperCase()}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
