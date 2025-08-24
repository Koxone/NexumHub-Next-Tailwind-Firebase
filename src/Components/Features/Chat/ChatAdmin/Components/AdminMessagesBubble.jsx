import React from 'react';

const AdminMessageBubble = ({ message }) => {
  return (
    <div
      className={`flex ${message.isAdmin ? 'justify-start' : 'justify-end'}`}
    >
      <div
        className={`max-w-[80%] rounded-lg p-3 shadow-sm ${
          message.isAdmin
            ? 'bg-gray-200 text-gray-800'
            : 'bg-blue-500 text-white'
        }`}
      >
        {!message.isAdmin && message.username && (
          <p className="text-xs opacity-75 mb-1 font-medium">
            {message.username}
          </p>
        )}
        <p className="text-sm">{message.text}</p>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-xs opacity-75">
            {message.timestamp?.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
          {!message.isAdmin && (
            <span className="text-xs opacity-75 ml-2">
              {message.read ? '✓✓' : '✓'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMessageBubble;