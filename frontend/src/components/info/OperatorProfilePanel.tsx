import { useInfoSettingsStore } from '../../state/infoSettingsStore';
import { Badge } from '@/components/ui/badge';
import { User, Shield, Radio, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

export function OperatorProfilePanel() {
  const { operatorName, systemStyle } = useInfoSettingsStore();
  const [missionTime, setMissionTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMissionTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDesignation = () => {
    switch (systemStyle) {
      case 'hecu':
        return Math.random() > 0.5 ? 'GRUNT' : 'SOLDIER';
      case 'security':
        return 'SECURITY OFFICER';
      case 'guard':
        return 'SECURITY GUARD';
      case 'resistance':
        return 'RESISTANCE FIGHTER';
      default:
        return 'LAMBDA-6';
    }
  };

  const getClearanceLabel = () => {
    switch (systemStyle) {
      case 'hecu':
        return 'Military Clearance';
      case 'security':
      case 'guard':
        return 'Facility Clearance';
      default:
        return 'Security Clearance';
    }
  };

  const getNeuralLinkLabel = () => {
    switch (systemStyle) {
      case 'hecu':
        return 'Tactical Datalink';
      case 'security':
      case 'guard':
        return 'Security Network';
      default:
        return 'Neural Link';
    }
  };

  return (
    <div className="hud-panel">
      <div className="hud-panel-title flex items-center gap-2">
        <User className="w-4 h-4" />
        OPERATOR PROFILE
      </div>
      <div className="hud-panel-content space-y-3">
        <div className="operator-profile-section">
          <div className="operator-profile-row">
            <span className="operator-profile-label">OPERATOR:</span>
            <span className="operator-profile-value font-bold">{operatorName}</span>
          </div>
          <div className="operator-profile-row">
            <span className="operator-profile-label">DESIGNATION:</span>
            <Badge variant="outline" className="operator-designation-badge">
              {getDesignation()}
            </Badge>
          </div>
        </div>

        <div className="operator-profile-section">
          <div className="operator-profile-row">
            <span className="operator-profile-label">{getClearanceLabel()}:</span>
            <span className="operator-profile-value">LEVEL 5</span>
          </div>
          <div className="operator-profile-row">
            <span className="operator-profile-label">SUIT SERIAL:</span>
            <span className="operator-profile-value font-mono">HEV-{Math.floor(Math.random() * 9000 + 1000)}</span>
          </div>
        </div>

        <div className="operator-profile-section">
          <div className="operator-profile-row">
            <span className="operator-profile-label flex items-center gap-1">
              <Radio className="w-3 h-3" />
              {getNeuralLinkLabel()}:
            </span>
            <Badge variant="default" className="status-badge-active">
              ACTIVE
            </Badge>
          </div>
          <div className="operator-profile-row">
            <span className="operator-profile-label">BIOMETRIC ID:</span>
            <span className="operator-profile-value font-mono">
              {Array.from({ length: 8 }, () => Math.floor(Math.random() * 16).toString(16).toUpperCase()).join('')}
            </span>
          </div>
        </div>

        <div className="operator-profile-section">
          <div className="operator-profile-row">
            <span className="operator-profile-label flex items-center gap-1">
              <Clock className="w-3 h-3" />
              MISSION TIME:
            </span>
            <span className="operator-profile-value font-mono">{formatTime(missionTime)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
