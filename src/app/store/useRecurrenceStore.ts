import { create } from 'zustand';

type Frequency = 'daily' | 'weekly' | 'monthly' | 'yearly';

interface RecurrenceState {
  frequency: Frequency;
  interval: number;
  selectedDays: number[]; // e.g. [1, 3, 5] for Mon, Wed, Fri
  startDate: string;
  endDate?: string;

  setFrequency: (freq: Frequency) => void;
  setInterval: (interval: number) => void;
  setSelectedDays: (days: number[]) => void;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
}

export const useRecurrenceStore = create<RecurrenceState>((set) => ({
  frequency: 'weekly',
  interval: 1,
  selectedDays: [],
  startDate: new Date().toISOString().split('T')[0],
  endDate: undefined,

  setFrequency: (freq) => set({ frequency: freq }),
  setInterval: (interval) => set({ interval }),
  setSelectedDays: (days) => set({ selectedDays: days }),
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
}));
