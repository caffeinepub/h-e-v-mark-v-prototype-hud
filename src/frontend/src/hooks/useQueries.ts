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
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['modules'] });

      // Snapshot the previous value
      const previousModules = queryClient.getQueryData(['modules']);

      // Optimistically update the query cache only
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
      // Rollback on error
      if (context?.previousModules) {
        queryClient.setQueryData(['modules'], context.previousModules);
      }
    },
    onSettled: () => {
      // Refetch to ensure sync with backend
      queryClient.invalidateQueries({ queryKey: ['modules'] });
    },
  });
}
