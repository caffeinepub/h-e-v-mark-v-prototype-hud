import { useEffect, useRef } from 'react';
import { useHazardsStore, HazardLevels } from '../state/hazardsState';

export function useHazardSimulation() {
  const { setHazardLevel } = useHazardsStore();
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Simulate hazard level changes every 2-4 seconds
    const simulate = () => {
      const hazardTypes: (keyof HazardLevels)[] = ['fire', 'bio', 'radiation', 'electrical', 'gas'];
      
      // Randomly pick 1-2 hazards to update
      const numToUpdate = Math.random() > 0.5 ? 1 : 2;
      const shuffled = [...hazardTypes].sort(() => Math.random() - 0.5);
      const toUpdate = shuffled.slice(0, numToUpdate);

      toUpdate.forEach((hazardType) => {
        const currentLevel = useHazardsStore.getState().levels[hazardType];
        
        // Simulate realistic changes: small increments/decrements with occasional spikes
        let change: number;
        const rand = Math.random();
        
        if (rand < 0.05) {
          // 5% chance of spike
          change = Math.random() * 20 + 10;
        } else if (rand < 0.15) {
          // 10% chance of significant drop
          change = -(Math.random() * 15 + 5);
        } else if (rand < 0.5) {
          // 35% chance of small increase
          change = Math.random() * 5;
        } else if (rand < 0.85) {
          // 35% chance of small decrease
          change = -(Math.random() * 5);
        } else {
          // 15% chance of no change
          change = 0;
        }

        // Apply natural decay towards safe levels
        let newLevel = currentLevel + change;
        if (currentLevel > 50) {
          newLevel -= Math.random() * 2; // Faster decay at high levels
        } else if (currentLevel > 20) {
          newLevel -= Math.random() * 1; // Moderate decay
        }

        // Clamp between 0 and 100
        newLevel = Math.max(0, Math.min(100, newLevel));
        
        setHazardLevel(hazardType, Math.round(newLevel));
      });
    };

    // Initial simulation
    simulate();

    // Set up interval with random timing
    const scheduleNext = () => {
      const delay = 2000 + Math.random() * 2000; // 2-4 seconds
      intervalRef.current = window.setTimeout(() => {
        simulate();
        scheduleNext();
      }, delay);
    };

    scheduleNext();

    return () => {
      if (intervalRef.current !== null) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [setHazardLevel]);
}
