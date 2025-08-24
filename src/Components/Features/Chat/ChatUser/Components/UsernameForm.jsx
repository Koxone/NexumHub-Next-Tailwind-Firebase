import React from 'react';

const UsernameForm = ({ username, setUsername, onContinue }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onContinue();
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-gray-50 p-6">
      <p className="font-semibold text-gray-600">Enter your Username</p>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Your name..."
        className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        autoFocus
      />
      <button
        onClick={onContinue}
        disabled={!username.trim()}
        className="bg-bg-primary cursor-pointer rounded-lg px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
};

export default UsernameForm;