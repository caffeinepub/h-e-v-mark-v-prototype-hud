import { create } from 'zustand';

export type LogEntryType = 'system' | 'module' | 'command' | 'warning' | 'error' | 'hazard';

export interface LogEntry {
  id: string;
  type: LogEntryType;
  message: string;
  timestamp: Date;
}

interface SystemLogState {
  entries: LogEntry[];
  addEntry: (type: LogEntryType, message: string) => void;
  clear: () => void;
}

export const useLogStore = create<SystemLogState>((set) => ({
  entries: [],
  addEntry: (type, message) => {
    const entry: LogEntry = {
      id: `${Date.now()}-${Math.random()}`,
      type,
      message,
      timestamp: new Date(),
    };
    set((state) => ({
      entries: [...state.entries, entry],
    }));
  },
  clear: () => set({ entries: [] }),
}));
