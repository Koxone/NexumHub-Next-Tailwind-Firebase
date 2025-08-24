import { create } from 'zustand';

export const useKxChat = create((set) => ({
  isOpenKxChat: false,
  openChat: () => set({ isOpenKxChat: true }),
  closeChat: () => set({ isOpenKxChat: false }),
  toggleChat: () => set((state) => ({ isOpenKxChat: !state.isOpenKxChat })),
}));
