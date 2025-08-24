import React from 'react';

const UserListItem = ({ userId, messages, onClick }) => {
  const unreadCount = messages.filter((m) => !m.isAdmin && !m.read).length;
  const lastMessage = messages[messages.length - 1];
  const username = messages[0]?.username || `User ${userId.slice(0, 6)}…`;

  // Hora del último mensaje
  const lastMessageTime = lastMessage?.timestamp
    ? lastMessage.timestamp.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  return (
    <li>
      <button
        onClick={onClick}
        className="border-border-main bg-accent/20 hover:bg-accent/40 flex w-full cursor-pointer items-center justify-between rounded-lg border px-4 py-2 text-left shadow"
      >
        <div className="flex flex-col">
          <span className="font-medium">{username}</span>
          {messages.length > 0 && (
            <span className="truncate text-xs text-gray-500">
              {lastMessage?.text || 'No messages'}
            </span>
          )}
        </div>

        <div className="flex flex-col items-end">
          {/* ✅ hora del último mensaje */}
          {lastMessageTime && (
            <span className="mb-1 text-[10px] text-gray-400">
              {lastMessageTime}
            </span>
          )}

          {unreadCount > 0 && (
            <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
              {unreadCount}
            </span>
          )}
        </div>
      </button>
    </li>
  );
};

export default UserListItem;
