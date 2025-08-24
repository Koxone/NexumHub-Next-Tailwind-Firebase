import { create } from 'zustand';

export const useOpenChatButton = create((set) => ({
  isPermitted: false,
  permitted: () => set({ isPermitted: true }),
  notPermitted: () => set({ isPermitted: false }),
  toggleChat: () => set((state) => ({ isPermitted: !state.isPermitted })),
}));
