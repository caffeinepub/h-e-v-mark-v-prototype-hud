import { useSuitStore } from '../../state/suitState';
import { useInfoSettingsStore } from '../../state/infoSettingsState';
import { useLogStore } from '../../state/systemLog';
import { StatPanel } from './Panels';
import { Button } from '@/components/ui/button';
import { Maximize2 } from 'lucide-react';
import { uiSfx } from '../../audio/uiSfx';
import { hevVoice } from '../../audio/hevVoice';

export function MinimalHudView() {
  const { stats } = useSuitStore();
  const { setDisplayMode } = useInfoSettingsStore();
  const { addEntry } = useLogStore();

  const handleRestoreStandard = () => {
    setDisplayMode('STANDARD');
    addEntry('system', 'DISPLAY MODE: STANDARD');
    uiSfx.toggle();
    hevVoice.displayModeChanged('STANDARD');
  };

  return (
    <div className="minimal-hud-view">
      <div className="minimal-stats-grid">
        <StatPanel 
          label="HEALTH" 
          value={stats.health} 
          max={100} 
          status={stats.health >= 70 ? 'nominal' : stats.health >= 40 ? 'warning' : 'critical'}
        />
        <StatPanel 
          label="ARMOR" 
          value={stats.armor} 
          max={100}
          status={stats.armor >= 70 ? 'nominal' : stats.armor >= 40 ? 'warning' : 'critical'}
        />
        <StatPanel 
          label="AUX POWER" 
          value={stats.aux} 
          max={100}
          status={stats.aux >= 70 ? 'nominal' : stats.aux >= 40 ? 'warning' : 'critical'}
        />
        <StatPanel 
          label="AMMO" 
          value={stats.ammo} 
          max={999}
          status="nominal"
        />
      </div>
      <div className="minimal-restore-control">
        <Button
          onClick={handleRestoreStandard}
          variant="outline"
          size="lg"
          className="minimal-restore-button"
        >
          <Maximize2 className="mr-2 h-5 w-5" />
          RESTORE FULL HUD
        </Button>
      </div>
    </div>
  );
}
