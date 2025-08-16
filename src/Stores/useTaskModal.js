import { create } from 'zustand';

export const useTaskModal = create((set) => ({
  isOpen: false,
  openTask: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),
}));
