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
        advancedMedical: false, // Not in backend response
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['modules'] });
    },
  });
}

export function useGetAllHazardStatuses() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['hazardStatuses'],
    queryFn: async () => {
      if (!actor) return null;
      const statuses = await actor.getAllHazardStatuses();
      return {
        fire: statuses.fire,
        bio: statuses.bio,
        radiation: statuses.radiation,
        electrical: statuses.electrical,
        gas: statuses.gas,
      };
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 5000, // Refresh every 5 seconds
  });
}

export function useGetLifeSupportInfo() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['lifeSupportInfo'],
    queryFn: async () => {
      if (!actor) return null;
      return await actor.getLifeSupportInfo();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 5000,
  });
}

export function useGetEnvProtectionInfo() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['envProtectionInfo'],
    queryFn: async () => {
      if (!actor) return null;
      return await actor.getEnvProtectionInfo();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 5000,
  });
}

export function useGetPowerInfo() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['powerInfo'],
    queryFn: async () => {
      if (!actor) return null;
      return await actor.getPowerInfo();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 5000,
  });
}
