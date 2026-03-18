import { useState } from 'react';
import { Play, Pause, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

export function MiniAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-4 right-4 w-12 h-12 bg-primary/20 border-2 border-primary rounded-full flex items-center justify-center hover:bg-primary/30 transition-all z-50"
      >
        <Volume2 className="w-5 h-5 text-primary" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 border-2 border-primary/30 p-4 min-w-[280px] z-50">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-primary">AUDIO PLAYER</span>
        <button
          onClick={() => setIsMinimized(true)}
          className="text-xs text-muted-foreground hover:text-primary"
        >
          MINIMIZE
        </button>
      </div>

      <div className="text-xs text-muted-foreground mb-3 truncate">
        {isPlaying ? 'Now Playing: Ambient Track' : 'No track playing'}
      </div>

      <div className="flex items-center gap-2 mb-3">
        <Button size="sm" variant="outline" onClick={togglePlay} className="flex-1">
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        <Button size="sm" variant="outline">
          <SkipForward className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="outline" onClick={toggleMute}>
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Volume2 className="w-3 h-3 text-muted-foreground" />
        <Slider
          value={[isMuted ? 0 : volume]}
          onValueChange={(value) => {
            setVolume(value[0]);
            if (value[0] > 0) setIsMuted(false);
          }}
          max={100}
          step={1}
          className="flex-1"
        />
        <span className="text-xs text-muted-foreground w-8 text-right">
          {isMuted ? 0 : volume}%
        </span>
      </div>
    </div>
  );
}
