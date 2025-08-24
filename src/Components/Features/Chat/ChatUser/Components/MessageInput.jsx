import React from 'react';
import SendIcon from './SendIcon';

const MessageInput = ({ value, onChange, onSend, loading, disabled }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSend(e);
    }
  };

  return (
    <div className="rounded-b-lg border-t border-gray-200 bg-white p-4">
      <div className="flex space-x-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
          disabled={loading}
        />
        <button
          onClick={onSend}
          disabled={disabled}
          className="bg-bg-primary cursor-pointer rounded-lg p-2 text-white transition-colors duration-200 hover:bg-blue-600 disabled:bg-gray-300"
        >
          {loading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
          ) : (
            <SendIcon />
          )}
        </button>
      </div>
    </div>
  );
};

export default MessageInput;