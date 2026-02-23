import { create } from 'zustand';

interface TacticalState {
  threatLevel: number;
  missionStatus: 'active' | 'complete' | 'failed';
  objectives: Array<{
    id: number;
    title: string;
    status: 'pending' | 'active' | 'complete';
    priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  }>;
  waypoints: Array<{
    id: number;
    name: string;
    distance: number;
    bearing: number;
  }>;
  engagementStatus: 'clear' | 'contact' | 'engaged';
  setThreatLevel: (level: number) => void;
  setMissionStatus: (status: 'active' | 'complete' | 'failed') => void;
  updateObjective: (id: number, updates: Partial<TacticalState['objectives'][0]>) => void;
  setEngagementStatus: (status: 'clear' | 'contact' | 'engaged') => void;
}

export const useTacticalStore = create<TacticalState>((set) => ({
  threatLevel: 0,
  missionStatus: 'active',
  objectives: [
    { id: 1, title: 'Reach Surface Level', status: 'active', priority: 'HIGH' },
    { id: 2, title: 'Locate Emergency Exit', status: 'pending', priority: 'HIGH' },
    { id: 3, title: 'Avoid Hostile Contacts', status: 'pending', priority: 'MEDIUM' },
  ],
  waypoints: [
    { id: 1, name: 'SECTOR C', distance: 127, bearing: 45 },
    { id: 2, name: 'EMERGENCY SHAFT', distance: 342, bearing: 112 },
  ],
  engagementStatus: 'clear',
  setThreatLevel: (level) => set({ threatLevel: level }),
  setMissionStatus: (status) => set({ missionStatus: status }),
  updateObjective: (id, updates) =>
    set((state) => ({
      objectives: state.objectives.map((obj) =>
        obj.id === id ? { ...obj, ...updates } : obj
      ),
    })),
  setEngagementStatus: (status) => set({ engagementStatus: status }),
}));
