import React from 'react';
import AdminMessageBubble from './AdminMessagesBubble';

const AdminMessagesList = ({ messages, messagesEndRef }) => {
  if (messages.length === 0) {
    return (
      <div className="flex-1 space-y-3 overflow-y-auto bg-gray-50 p-4">
        <div className="mt-8 text-center text-gray-500">
          <p>No messages yet</p>
          <p>Start the conversation!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-3 overflow-y-auto bg-gray-50 p-4">
      {messages.map((message) => (
        <AdminMessageBubble key={message.id} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default AdminMessagesList;