// Hazard alert evaluation and critical flashing logic

import { useEffect } from 'react';
import { useHazardsStore } from './hazardsState';
import { hevVoice } from '../audio/hevVoice';
import { create } from 'zustand';

interface AlertState {
  isCriticalFlashing: boolean;
  lastAlertTime: number;
}

export const useAlertState = create<AlertState>(() => ({
  isCriticalFlashing: false,
  lastAlertTime: 0,
}));

export function useHazardAlertMonitor() {
  useEffect(() => {
    const checkInterval = setInterval(() => {
      const { levels } = useHazardsStore.getState();
      const maxLevel = Math.max(...Object.values(levels));
      
      // Critical flashing when any hazard > 80%
      const shouldFlash = maxLevel > 80;
      const currentFlashing = useAlertState.getState().isCriticalFlashing;
      
      if (shouldFlash !== currentFlashing) {
        useAlertState.setState({ isCriticalFlashing: shouldFlash });
        
        // Trigger alert on transition to critical
        if (shouldFlash) {
          const now = Date.now();
          const lastAlert = useAlertState.getState().lastAlertTime;
          
          // Throttle alerts to once per 5 seconds
          if (now - lastAlert > 5000) {
            hevVoice.hazardDetected('environmental');
            useAlertState.setState({ lastAlertTime: now });
          }
        }
      }
    }, 1000);
    
    return () => clearInterval(checkInterval);
  }, []);
}
