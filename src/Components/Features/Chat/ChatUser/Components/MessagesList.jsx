import React from 'react';
import MessageBubble from './MessageBubble';

const MessagesList = ({ messages, messagesEndRef }) => {
  if (messages.length === 0) {
    return (
      <div className="flex-1 space-y-3 overflow-y-auto bg-gray-50 p-4">
        <div className="mt-8 text-center text-gray-500">
          <p>Hello 👋</p>
          <p>How can we help you?</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-3 overflow-y-auto bg-gray-50 p-4">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessagesList;