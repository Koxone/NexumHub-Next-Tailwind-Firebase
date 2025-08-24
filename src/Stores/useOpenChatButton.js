import { create } from 'zustand';

export const useOpenChatButton = create((set) => ({
  isPermitted:
    typeof window !== 'undefined'
      ? localStorage.getItem('isPermitted') === 'true'
      : false,
  hasAcceptedChat:
    typeof window !== 'undefined'
      ? localStorage.getItem('hasAcceptedChat') === 'true'
      : false,

  permitted: () =>
    set(() => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('isPermitted', 'true');
      }
      return { isPermitted: true };
    }),

  notPermitted: () =>
    set(() => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('isPermitted', 'false');
      }
      return { isPermitted: false };
    }),

  toggleChat: () =>
    set((state) => {
      const newValue = !state.isPermitted;
      if (typeof window !== 'undefined') {
        localStorage.setItem('isPermitted', newValue.toString());
      }
      return { isPermitted: newValue };
    }),

  acceptChat: () =>
    set(() => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('hasAcceptedChat', 'true');
        localStorage.setItem('isPermitted', 'true');
      }
      return { hasAcceptedChat: true, isPermitted: true };
    }),
}));
