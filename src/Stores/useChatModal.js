import { create } from 'zustand';

export const useChatModal = create((set) => ({
  isOpen: false,
  openChatModal: () => set({ isOpen: true }),
  closeChatModal: () => set({ isOpen: false }),
  toggleChatModal: () => set((s) => ({ isOpen: !s.isOpen })),
}));
