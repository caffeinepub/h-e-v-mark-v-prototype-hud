import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useGetStats() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      if (!actor) return null;
      const [health, armor, aux, ammo, hazard] = await actor.getStats();
      return {
        health: Number(health),
        armor: Number(armor),
        aux: Number(aux),
        ammo: Number(ammo),
        hazard: Number(hazard),
      };
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetModuleStates() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['modules'],
    queryFn: async () => {
      if (!actor) return null;
      const modules = await actor.getModuleStates();
      return {
        helmet: modules.helmet,
        respirator: modules.respirator,
        longJump: modules.longJump,
        flashlight: modules.flashlight,
        advancedMedical: modules.advancedMedical,
        radiationShield: modules.radiationShield,
        defibrillator: modules.defibrillator,
        shieldBoost: modules.shieldBoost,
        hazardSystem: modules.hazardSystem,
        moduleSync: modules.moduleSync,
      };
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateStat() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ stat, value }: { stat: string; value: number }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.updateStats(stat, BigInt(value));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });
}

export function useToggleModule() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (moduleName: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.toggleModule(moduleName);
    },
    onMutate: async (moduleName) => {
      await queryClient.cancelQueries({ queryKey: ['modules'] });
      const previousModules = queryClient.getQueryData(['modules']);
      queryClient.setQueryData(['modules'], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          [moduleName]: !old[moduleName],
        };
      });
      return { previousModules };
    },
    onError: (err, moduleName, context) => {
      if (context?.previousModules) {
        queryClient.setQueryData(['modules'], context.previousModules);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['modules'] });
    },
  });
}

export function useGetGravityGunStatus() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['gravityGun'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getGravityGunStatus();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 2000,
  });
}

export function useToggleGravityGun() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.toggleGravityGun();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gravityGun'] });
    },
  });
}

export function useChargeGravityGun() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.chargeGravityGun();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gravityGun'] });
    },
  });
}

export function useGetVehicles() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['vehicles'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllComprehensiveVehicleInfo();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 3000,
  });
}

export function useGetFactionWeapons() {
  const { actor, isFetching } = useActor();
  const { systemStyle } = useInfoSettingsStore();

  return useQuery({
    queryKey: ['factionWeapons', systemStyle],
    queryFn: async () => {
      if (!actor) return null;
      const factionMap: Record<string, string> = {
        hev: 'default',
        hecu: 'hecu',
        security: 'blackMesaSecurity',
        guard: 'blackMesaSecurity',
        resistance: 'halfLife2',
      };
      const faction = factionMap[systemStyle] || 'default';
      return actor.getFactionWeapons(faction);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCustomizeFactionWeapons() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ faction, weaponList }: { faction: string; weaponList: string[] }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.customizeFactionWeapons(faction, weaponList);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['factionWeapons'] });
    },
  });
}

// Import at top
import { useInfoSettingsStore } from '@/state/infoSettingsStore';
