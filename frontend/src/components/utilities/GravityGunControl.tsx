import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';
import { HudSwitch } from '@/components/common/HudSwitch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';
import { uiSfx } from '@/audio/uiSfx';

export function GravityGunControl() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();

  const { data: gravityGunStatus } = useQuery({
    queryKey: ['gravityGun'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getGravityGunStatus();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 2000,
  });

  const toggleGravityGun = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.toggleGravityGun();
    },
    onSuccess: () => {
      uiSfx.toggle();
      queryClient.invalidateQueries({ queryKey: ['gravityGun'] });
    },
  });

  const chargeGravityGun = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.chargeGravityGun();
    },
    onSuccess: () => {
      uiSfx.confirmAccept();
      queryClient.invalidateQueries({ queryKey: ['gravityGun'] });
    },
  });

  const isActive = gravityGunStatus?.isActive ?? false;
  const mode = gravityGunStatus?.mode ?? 'normal';
  const chargeLevel = Number(gravityGunStatus?.chargeLevel ?? 0);

  return (
    <div className="hud-panel-compact">
      <div className="hud-panel-title-compact">GRAVITY GUN</div>
      <div className="hud-panel-content-compact">
        <div className="space-y-3">
          {/* Status Display */}
          <div className="flex items-center justify-between">
            <Label htmlFor="gravity-gun-toggle" className="text-sm">
              DEVICE STATUS
            </Label>
            <HudSwitch
              id="gravity-gun-toggle"
              checked={isActive}
              onCheckedChange={() => toggleGravityGun.mutate()}
              disabled={toggleGravityGun.isPending}
            />
          </div>

          {/* Mode Display */}
          <div className="flex items-center justify-between text-xs">
            <span className="opacity-70">MODE:</span>
            <span className={mode === 'supercharged' ? 'text-primary font-bold' : ''}>
              {mode.toUpperCase()}
            </span>
          </div>

          {/* Charge Level */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="opacity-70">CHARGE LEVEL:</span>
              <span className="font-mono">{chargeLevel}%</span>
            </div>
            <div className="h-2 bg-background/50 border border-border rounded-sm overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  mode === 'supercharged' ? 'bg-accent' : 'bg-primary'
                }`}
                style={{ width: `${chargeLevel}%` }}
              />
            </div>
          </div>

          {/* Supercharge Button */}
          <Button
            onClick={() => chargeGravityGun.mutate()}
            disabled={!isActive || mode === 'supercharged' || chargeGravityGun.isPending}
            size="sm"
            className="w-full flex items-center gap-2"
          >
            <Zap className="w-4 h-4" />
            SUPERCHARGE
          </Button>
        </div>
      </div>
    </div>
  );
}
