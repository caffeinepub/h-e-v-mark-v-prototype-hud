import { useState } from 'react';
import { useInfoSettingsStore } from '../../state/infoSettingsStore';
import { useLogStore } from '../../state/systemLog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Radio, Send, Signal } from 'lucide-react';
import { uiSfx } from '../../audio/uiSfx';
import { cn } from '@/lib/utils';

interface BroadcastEntry {
  id: string;
  timestamp: string;
  channel: string;
  message: string;
}

export function RadioControlPanel() {
  const { radioLink, radioFrequency, selectedChannel, setRadioFrequency, setSelectedChannel, systemStyle } = useInfoSettingsStore();
  const { addEntry } = useLogStore();
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastHistory, setBroadcastHistory] = useState<BroadcastEntry[]>([]);

  const getChannels = () => {
    switch (systemStyle) {
      case 'hecu':
        return ['COMMAND NET', 'TACTICAL', 'EMERGENCY', 'SQUAD', 'RECON', 'FIRE SUPPORT', 'MEDEVAC', 'OPEN'];
      case 'security':
        return ['SECURITY NET', 'FACILITY', 'EMERGENCY', 'PATROL', 'MEDICAL', 'ENGINEERING', 'ADMIN', 'OPEN'];
      default:
        return ['COMMAND', 'TACTICAL', 'EMERGENCY', 'SECURITY', 'MEDICAL', 'ENGINEERING', 'SQUAD', 'OPEN'];
    }
  };

  const channels = getChannels();

  const handleFrequencyChange = (value: number[]) => {
    setRadioFrequency(value[0]);
    uiSfx.toggle();
  };

  const handleChannelChange = (channel: string) => {
    setSelectedChannel(channel);
    addEntry('radio', `Channel switched to ${channel}`);
    uiSfx.toggle();
  };

  const handleTransmit = () => {
    if (!radioLink) {
      addEntry('radio', 'TRANSMISSION FAILED: Radio link offline');
      uiSfx.toggle();
      return;
    }

    if (!broadcastMessage.trim()) {
      return;
    }

    const entry: BroadcastEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString(),
      channel: selectedChannel,
      message: broadcastMessage.trim(),
    };

    setBroadcastHistory((prev) => [entry, ...prev].slice(0, 20));
    addEntry('radio', `[${selectedChannel}] ${broadcastMessage.trim()}`);
    setBroadcastMessage('');
    uiSfx.confirm();
  };

  const signalStrength = radioLink ? Math.floor(70 + Math.random() * 30) : 0;

  return (
    <div className="radio-control-panel">
      <div className="hud-panel-title flex items-center gap-2">
        <Radio className="w-4 h-4" />
        RADIO COMMUNICATIONS
      </div>

      <div className="radio-control-content">
        {/* Frequency Tuning */}
        <div className="radio-control-section">
          <div className="radio-control-label">
            <span className="text-xs font-semibold">FREQUENCY</span>
            <span className="text-xs opacity-70">{radioFrequency.toFixed(1)} MHz</span>
          </div>
          <Slider
            value={[radioFrequency]}
            onValueChange={handleFrequencyChange}
            min={88}
            max={108}
            step={0.1}
            className="radio-frequency-slider"
          />
        </div>

        {/* Signal Strength */}
        <div className="radio-control-section">
          <div className="radio-control-label">
            <span className="text-xs font-semibold flex items-center gap-1">
              <Signal className="w-3 h-3" />
              SIGNAL STRENGTH
            </span>
            <span className={cn('text-xs font-semibold', radioLink ? 'text-primary' : 'text-destructive')}>
              {radioLink ? `${signalStrength}%` : 'OFFLINE'}
            </span>
          </div>
          <div className="radio-signal-bar">
            <div 
              className="radio-signal-fill"
              style={{ width: `${signalStrength}%` }}
            />
          </div>
        </div>

        {/* Channel Selector */}
        <div className="radio-control-section">
          <div className="radio-control-label">
            <span className="text-xs font-semibold">CHANNEL</span>
          </div>
          <Select value={selectedChannel} onValueChange={handleChannelChange}>
            <SelectTrigger className="radio-channel-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {channels.map((channel) => (
                <SelectItem key={channel} value={channel}>
                  {channel}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Broadcast Mode */}
        <div className="radio-control-section">
          <div className="radio-control-label">
            <span className="text-xs font-semibold">BROADCAST MESSAGE</span>
            <span className="text-xs opacity-70">{broadcastMessage.length}/200</span>
          </div>
          <Textarea
            value={broadcastMessage}
            onChange={(e) => setBroadcastMessage(e.target.value.slice(0, 200))}
            placeholder="Enter message..."
            className="radio-message-input"
            rows={3}
            disabled={!radioLink}
          />
          <Button
            onClick={handleTransmit}
            disabled={!radioLink || !broadcastMessage.trim()}
            className="radio-transmit-button w-full"
            variant="outline"
          >
            <Send className="mr-2 h-4 w-4" />
            TRANSMIT
          </Button>
        </div>

        {/* Transmission Log */}
        {broadcastHistory.length > 0 && (
          <div className="radio-control-section">
            <div className="radio-control-label">
              <span className="text-xs font-semibold">TRANSMISSION LOG</span>
            </div>
            <div className="radio-transmission-log">
              {broadcastHistory.map((entry) => (
                <div key={entry.id} className="radio-transmission-entry">
                  <div className="radio-transmission-header">
                    <span className="radio-transmission-time">{entry.timestamp}</span>
                    <Badge variant="outline" className="radio-transmission-channel">
                      {entry.channel}
                    </Badge>
                  </div>
                  <div className="radio-transmission-message">{entry.message}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
