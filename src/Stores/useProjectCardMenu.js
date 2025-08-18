import { create } from 'zustand';

export const useProjectCardMenu = create((set) => ({
  isOpen: false,
  openProjectMenu: () => set({ isOpen: true }),
  closeProjectMenu: () => set({ isOpen: false }),
  toggleProjectMenu: () => set((s) => ({ isOpen: !s.isOpen })),
}));
