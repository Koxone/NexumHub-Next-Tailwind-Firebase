import { create } from 'zustand';

export const useProjectModal = create((set) => ({
  isOpen: false,
  openProject: () => set({ isOpen: true }),
  closeProject: () => set({ isOpen: false }),
  toggleProject: () => set((s) => ({ isOpen: !s.isOpen })),
}));
