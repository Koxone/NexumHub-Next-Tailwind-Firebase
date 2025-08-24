import { create } from 'zustand';

export const useOpenChatButton = create((set) => ({
  isPermitted: false,
  hasAcceptedChat: false,

  hydrate: () => {
    if (typeof window !== 'undefined') {
      set({
        isPermitted: localStorage.getItem('isPermitted') === 'true',
        hasAcceptedChat: localStorage.getItem('hasAcceptedChat') === 'true',
      });
    }
  },

  permitted: () => {
    set({ isPermitted: true });
    if (typeof window !== 'undefined') {
      localStorage.setItem('isPermitted', 'true');
    }
  },

  notPermitted: () => {
    set({ isPermitted: false });
    if (typeof window !== 'undefined') {
      localStorage.setItem('isPermitted', 'false');
    }
  },

  toggleChat: () =>
    set((state) => {
      const newVal = !state.isPermitted;
      if (typeof window !== 'undefined') {
        localStorage.setItem('isPermitted', newVal ? 'true' : 'false');
      }
      return { isPermitted: newVal };
    }),

  acceptChat: () => {
    set({ hasAcceptedChat: true });
    if (typeof window !== 'undefined') {
      localStorage.setItem('hasAcceptedChat', 'true');
    }
  },
}));
