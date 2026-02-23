import { ComprehensiveVehicleInfo } from '@/backend';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Fuel, Shield, Gauge, Wrench, Info } from 'lucide-react';

interface VehicleStatusPanelProps {
  vehicle: ComprehensiveVehicleInfo;
  detailed?: boolean;
}

export function VehicleStatusPanel({ vehicle, detailed = false }: VehicleStatusPanelProps) {
  const fuelPercentage = Number(vehicle.fuel);
  const integrityPercentage = Number(vehicle.integrity);
  const speedValue = Number(vehicle.speed);

  const getStatusColor = (value: number) => {
    if (value >= 70) return 'text-primary';
    if (value >= 40) return 'text-yellow-500';
    return 'text-destructive';
  };

  return (
    <div className="hud-panel vehicle-status-panel">
      <div className="hud-panel-title flex items-center justify-between">
        <span>{vehicle.name}</span>
        <Badge variant="outline" className="text-xs">
          {vehicle.diagnostics.toUpperCase()}
        </Badge>
      </div>

      <div className="hud-panel-content space-y-3">
        {/* Core Stats */}
        <div className="vehicle-stats-grid">
          <div className="vehicle-stat">
            <div className="vehicle-stat-label">
              <Fuel className="w-3 h-3" />
              FUEL
            </div>
            <Progress value={fuelPercentage} className="vehicle-stat-bar" />
            <span className={`vehicle-stat-value ${getStatusColor(fuelPercentage)}`}>{fuelPercentage}%</span>
          </div>

          <div className="vehicle-stat">
            <div className="vehicle-stat-label">
              <Shield className="w-3 h-3" />
              INTEGRITY
            </div>
            <Progress value={integrityPercentage} className="vehicle-stat-bar" />
            <span className={`vehicle-stat-value ${getStatusColor(integrityPercentage)}`}>{integrityPercentage}%</span>
          </div>

          <div className="vehicle-stat">
            <div className="vehicle-stat-label">
              <Gauge className="w-3 h-3" />
              SPEED
            </div>
            <span className="vehicle-stat-value text-primary">{speedValue} km/h</span>
          </div>
        </div>

        {detailed && (
          <>
            <Separator />

            {/* Engine Specs */}
            <div className="vehicle-detail-section">
              <div className="vehicle-detail-title">
                <Wrench className="w-4 h-4" />
                ENGINE SPECIFICATIONS
              </div>
              <div className="vehicle-detail-grid">
                <div className="vehicle-detail-row">
                  <span className="vehicle-detail-label">Type:</span>
                  <span className="vehicle-detail-value">{vehicle.engineSpecs.engineType}</span>
                </div>
                <div className="vehicle-detail-row">
                  <span className="vehicle-detail-label">Power:</span>
                  <span className="vehicle-detail-value">{Number(vehicle.engineSpecs.powerOutput)} HP</span>
                </div>
                <div className="vehicle-detail-row">
                  <span className="vehicle-detail-label">Torque:</span>
                  <span className="vehicle-detail-value">{Number(vehicle.engineSpecs.torque)} Nm</span>
                </div>
                <div className="vehicle-detail-row">
                  <span className="vehicle-detail-label">Transmission:</span>
                  <span className="vehicle-detail-value">{vehicle.engineSpecs.transmission}</span>
                </div>
              </div>
            </div>

            {/* Tactical Capabilities */}
            <div className="vehicle-detail-section">
              <div className="vehicle-detail-title">TACTICAL CAPABILITIES</div>
              <div className="vehicle-detail-grid">
                <div className="vehicle-detail-row">
                  <span className="vehicle-detail-label">Max Speed:</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="vehicle-detail-value cursor-help">
                          {Number(vehicle.tacticalCapabilities.speed)} km/h
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Maximum achievable speed</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="vehicle-detail-row">
                  <span className="vehicle-detail-label">Acceleration:</span>
                  <Progress value={Number(vehicle.tacticalCapabilities.acceleration)} className="h-2" />
                </div>
                <div className="vehicle-detail-row">
                  <span className="vehicle-detail-label">Handling:</span>
                  <span className="vehicle-detail-value">{vehicle.tacticalCapabilities.handling}</span>
                </div>
                <div className="vehicle-detail-row">
                  <span className="vehicle-detail-label">Durability:</span>
                  <Progress value={Number(vehicle.tacticalCapabilities.durability)} className="h-2" />
                </div>
              </div>
            </div>

            {/* Damage Resistance */}
            <div className="vehicle-detail-section">
              <div className="vehicle-detail-title">DAMAGE RESISTANCE</div>
              <div className="vehicle-detail-grid">
                <div className="vehicle-detail-row">
                  <span className="vehicle-detail-label">Armor:</span>
                  <Progress value={Number(vehicle.damageResistance.armorStrength)} className="h-2" />
                </div>
                <div className="vehicle-detail-row">
                  <span className="vehicle-detail-label">Fire:</span>
                  <Progress value={Number(vehicle.damageResistance.resistances.fire)} className="h-2" />
                </div>
                <div className="vehicle-detail-row">
                  <span className="vehicle-detail-label">Bio:</span>
                  <Progress value={Number(vehicle.damageResistance.resistances.bioHazards)} className="h-2" />
                </div>
                <div className="vehicle-detail-row">
                  <span className="vehicle-detail-label">Radiation:</span>
                  <Progress value={Number(vehicle.damageResistance.resistances.radiation)} className="h-2" />
                </div>
                <div className="vehicle-detail-row">
                  <span className="vehicle-detail-label">Electrical:</span>
                  <Progress value={Number(vehicle.damageResistance.resistances.electrical)} className="h-2" />
                </div>
              </div>
            </div>

            {/* Support Systems */}
            <div className="vehicle-detail-section">
              <div className="vehicle-detail-title">SUPPORT SYSTEMS</div>
              <div className="vehicle-detail-grid">
                <div className="vehicle-detail-row">
                  <span className="vehicle-detail-label">Navigation:</span>
                  <span className="vehicle-detail-value">{vehicle.supportSystems.navigation}</span>
                </div>
                <div className="vehicle-detail-row">
                  <span className="vehicle-detail-label">Communication:</span>
                  <span className="vehicle-detail-value">{vehicle.supportSystems.communication}</span>
                </div>
                <div className="vehicle-detail-row">
                  <span className="vehicle-detail-label">Sensors:</span>
                  <span className="vehicle-detail-value">{vehicle.supportSystems.sensors}</span>
                </div>
                <div className="vehicle-detail-row">
                  <span className="vehicle-detail-label">Automation:</span>
                  <span className="vehicle-detail-value">{vehicle.supportSystems.automation}</span>
                </div>
              </div>
            </div>

            {/* Lore */}
            <div className="vehicle-detail-section">
              <div className="vehicle-detail-title">
                <Info className="w-4 h-4" />
                VEHICLE LORE
              </div>
              <div className="vehicle-lore">
                <p className="text-xs opacity-80 mb-2">
                  <strong>Manufacturer:</strong> {vehicle.lore.manufacturer}
                </p>
                <p className="text-xs opacity-80 mb-2">
                  <strong>Purpose:</strong> {vehicle.lore.purpose}
                </p>
                <p className="text-xs opacity-80 mb-2">{vehicle.lore.historicalUse}</p>
                <p className="text-xs opacity-80">
                  <strong>Notable Upgrades:</strong> {vehicle.lore.notableUpgrades}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
