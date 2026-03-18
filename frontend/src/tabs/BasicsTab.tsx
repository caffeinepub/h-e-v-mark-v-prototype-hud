import React from 'react';
import { useSuitStore } from '../state/suitState';
import { useHazardsStore } from '../state/hazardsState';
import { StatPanel, MeterPanel } from '../components/hud/Panels';
import { HorizontalHazardPanel } from '../components/hazards/HorizontalHazardPanel';
import { GeigerCounterModule } from '../components/hazards/GeigerCounterModule';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function BasicsTab() {
  const { stats } = useSuitStore();
  const { getAggregateHazard } = useHazardsStore();
  const prefersReduced = useReducedMotion();

  const health = stats.health;
  const armor = stats.armor;
  const aux = stats.aux;
  const ammo = stats.ammo;

  const healthCritical = health < 25;
  const healthWarning = health < 50;
  const armorLow = armor < 20;
  const ammoLow = ammo < 10;
  const auxLow = aux < 20;

  return (
    <div className="p-2 space-y-2 animate-fade-in-up">
      {/* Critical alert banner */}
      {(healthCritical || armorLow) && (
        <div
          style={{
            padding: '6px 10px',
            background: 'oklch(4% 0.02 25)',
            border: '1px solid oklch(55% 0.22 25 / 0.6)',
            color: 'oklch(65% 0.25 25)',
            fontSize: '0.6rem',
            letterSpacing: '0.12em',
            textAlign: 'center',
            animation: !prefersReduced ? 'warningFlash 1s ease-in-out infinite' : undefined,
          }}
        >
          ⚠ {healthCritical ? 'HEALTH CRITICAL' : ''}{healthCritical && armorLow ? ' — ' : ''}{armorLow ? 'ARMOR DEPLETED' : ''}
        </div>
      )}

      {/* Core stats grid */}
      <div className="grid grid-cols-2 gap-2">
        <StatPanel
          label="HEALTH"
          value={health}
          max={100}
          critical={healthCritical}
          warning={healthWarning}
          icon="♥"
        />
        <StatPanel
          label="ARMOR"
          value={armor}
          max={100}
          critical={armorLow}
          warning={armor < 40}
          icon="◈"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <StatPanel
          label="AUX POWER"
          value={aux}
          max={100}
          critical={auxLow}
          warning={aux < 40}
          unit="%"
          icon="⚡"
        />
        <StatPanel
          label="AMMO"
          value={ammo}
          max={100}
          critical={ammoLow}
          warning={ammo < 20}
          icon="◉"
        />
      </div>

      {/* Ammo low warning */}
      {ammoLow && (
        <div
          style={{
            padding: '4px 8px',
            background: 'oklch(4% 0.02 80)',
            border: '1px solid oklch(75% 0.18 80 / 0.5)',
            color: 'oklch(75% 0.18 80)',
            fontSize: '0.55rem',
            letterSpacing: '0.1em',
            textAlign: 'center',
            animation: !prefersReduced ? 'warningFlash 1.5s ease-in-out infinite' : undefined,
          }}
        >
          ⚠ LOW AMMUNITION — RESUPPLY REQUIRED
        </div>
      )}

      {/* Aux power warning */}
      {auxLow && (
        <div
          style={{
            padding: '4px 8px',
            background: 'oklch(4% 0.02 80)',
            border: '1px solid oklch(75% 0.18 80 / 0.5)',
            color: 'oklch(75% 0.18 80)',
            fontSize: '0.55rem',
            letterSpacing: '0.1em',
            textAlign: 'center',
            animation: !prefersReduced ? 'warningFlash 2s ease-in-out infinite' : undefined,
          }}
        >
          ⚡ AUX POWER LOW — RECHARGING
        </div>
      )}

      {/* Hazards panel */}
      <HorizontalHazardPanel />

      {/* Geiger counter */}
      <GeigerCounterModule />
    </div>
  );
}
