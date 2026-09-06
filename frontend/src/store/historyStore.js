import { create } from "zustand";

export const useHistoryStore = create((set) => ({
  screenings: [],
  selectedScreening: null,

  addScreening: (screening) =>
    set((state) => ({
      screenings: [screening, ...state.screenings].slice(0, 15),
    })),

  selectScreening: (screening) =>
    set({ selectedScreening: screening }),

  resetScreening: () => set({ selectedScreening: null }),
}));
