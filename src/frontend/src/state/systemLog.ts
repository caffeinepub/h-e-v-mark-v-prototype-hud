import { create } from 'zustand';

type LogType = 'system' | 'module' | 'command' | 'warning' | 'error' | 'hazard' | 'radio' | 'medical';

interface LogEntry {
  id: string;
  timestamp: string;
  type: LogType;
  message: string;
}

interface SystemLogState {
  entries: LogEntry[];
  addEntry: (type: LogType, message: string) => void;
  clearLog: () => void;
  reset: () => void;
}

export const useLogStore = create<SystemLogState>((set) => ({
  entries: [],

  addEntry: (type, message) =>
    set((state) => ({
      entries: [
        {
          id: `${Date.now()}-${Math.random()}`,
          timestamp: new Date().toLocaleTimeString(),
          type,
          message,
        },
        ...state.entries,
      ].slice(0, 100), // Keep only last 100 entries
    })),

  clearLog: () => set({ entries: [] }),

  reset: () => set({ entries: [] }),
}));
