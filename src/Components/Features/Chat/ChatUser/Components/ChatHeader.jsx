'use client';

// Zustand
import { useOpenChatButton } from '@/Stores/useOpenChatButton';

const ChatHeader = ({ title, onMouseDown, onClose }) => {
  // Zustand
  const { permitted } = useOpenChatButton();

  const handleClose = () => {
    onClose();
    permitted();
  };

  return (
    <div
      onMouseDown={onMouseDown}
      className="bg-bg-primary flex cursor-move items-center justify-between rounded-t-lg p-4 text-white"
    >
      <h3 className="font-semibold">{title}</h3>
      <button
        onClick={handleClose}
        className="cursor-pointer text-xl font-bold text-white hover:text-gray-200"
      >
        ×
      </button>
    </div>
  );
};

export default ChatHeader;
