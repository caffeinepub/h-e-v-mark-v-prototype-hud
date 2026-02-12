import { useAudioStore } from '../../state/audioState';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import { useRef } from 'react';

export function AmbiencePlayer() {
  const { 
    playlist, 
    currentIndex, 
    isPlaying, 
    loop, 
    volume,
    play,
    pause,
    next,
    previous,
    toggleLoop,
    setVolume,
    addCustomTrack
  } = useAudioStore();
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentTrack = playlist[currentIndex];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        if (file.type.startsWith('audio/')) {
          addCustomTrack(file);
        }
      });
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="ambience-player">
      <div className="player-info">
        <div className="track-name">{currentTrack?.name || 'No track loaded'}</div>
        <div className="track-type">{currentTrack?.isCustom ? 'CUSTOM' : 'SYSTEM'}</div>
      </div>

      <div className="player-controls">
        <Button 
          size="sm" 
          variant="outline" 
          onClick={previous}
          disabled={playlist.length === 0}
        >
          <SkipBack className="w-4 h-4" />
        </Button>
        
        <Button 
          size="sm"
          onClick={isPlaying ? pause : play}
          disabled={playlist.length === 0}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        
        <Button 
          size="sm" 
          variant="outline" 
          onClick={next}
          disabled={playlist.length === 0}
        >
          <SkipForward className="w-4 h-4" />
        </Button>
      </div>

      <div className="player-settings">
        <div className="player-setting">
          <Label htmlFor="loop" className="setting-label-small">LOOP</Label>
          <Switch id="loop" checked={loop} onCheckedChange={toggleLoop} />
        </div>
        
        <div className="player-setting player-volume">
          <Label className="setting-label-small">VOLUME</Label>
          <Slider
            value={[volume * 100]}
            onValueChange={([v]) => setVolume(v / 100)}
            max={100}
            step={1}
            className="volume-slider"
          />
          <span className="volume-value">{Math.round(volume * 100)}%</span>
        </div>
      </div>

      <div className="player-custom">
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          id="custom-audio"
        />
        <Button 
          size="sm" 
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          className="w-full"
        >
          ADD CUSTOM TRACKS
        </Button>
      </div>
    </div>
  );
}
