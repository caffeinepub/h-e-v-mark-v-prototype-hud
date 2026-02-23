import { useGetVehicles } from '../hooks/useQueries';
import { useInfoSettingsStore } from '@/state/infoSettingsStore';
import { VehicleStatusPanel } from '../components/vehicles/VehicleStatusPanel';
import { Loader2 } from 'lucide-react';

export function VehiclesTab() {
  const { data: vehicles, isLoading, error } = useGetVehicles();
  const { detailedMode } = useInfoSettingsStore();

  if (isLoading) {
    return (
      <div className="tab-content-compact">
        <div className="flex items-center justify-center p-8">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-3 text-sm">Loading vehicle data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="tab-content-compact">
        <div className="hud-panel">
          <div className="hud-panel-title">ERROR</div>
          <div className="hud-panel-content">
            <p className="text-destructive">Failed to load vehicle information.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tab-content-compact">
      <div className="vehicles-grid">
        {vehicles?.map((vehicle) => (
          <VehicleStatusPanel key={vehicle.name} vehicle={vehicle} detailed={detailedMode} />
        ))}
      </div>
    </div>
  );
}
