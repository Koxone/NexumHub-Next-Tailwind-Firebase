'use client';

import { useKxChat } from '@/Stores/useKxChat';
import { useOpenChatButton } from '@/Stores/useOpenChatButton';

function OpenChatButton() {
  // Zustand
  const { isPermitted } = useOpenChatButton();
  const { isOpenKxChat, openChat, toggleChat } = useKxChat();

  const handleClick = () => {
    toggleChat();
    openChat();
  };

  if (!isPermitted || isOpenKxChat) {
    return null;
  }

  return (
    <div className="fixed right-4 bottom-4 z-50">
      <button
        onClick={handleClick}
        className="flex cursor-pointer items-center space-x-2 rounded-full bg-blue-500 px-6 py-3 text-white shadow-lg transition-all duration-200 hover:bg-blue-600"
      >
        <span>Open Chat</span>
      </button>
    </div>
  );
}

export default OpenChatButton;
