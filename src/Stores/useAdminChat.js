import { create } from 'zustand';

export const useAdminChat = create((set) => ({
  isOpenAdminChat: false,
  openChat: () => set({ isOpenAdminChat: true }),
  closeChat: () => set({ isOpenAdminChat: false }),
  toggleChat: () => set((state) => ({ isOpenAdminChat: !state.isOpenAdminChat })),
}));
