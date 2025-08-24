import React from 'react';

const MessageBubble = ({ message }) => {
  return (
    <div
      className={`flex ${message.isAdmin ? 'justify-start' : 'justify-end'}`}
    >
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          message.isAdmin
            ? 'bg-gray-200 text-gray-800'
            : 'bg-blue-500 text-white'
        } shadow-sm`}
      >
        <p className="text-sm">{message.text}</p>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-xs opacity-75">
            {message.timestamp?.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
          {!message.isAdmin && (
            <div className="flex space-x-1">
              <span className="text-xs opacity-75">
                {message.read ? '✓✓' : '✓'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;