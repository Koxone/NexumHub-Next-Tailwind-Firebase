import React from 'react';

const AdminChatHeader = ({ title, selectedUser, onBack, onClose }) => {
  return (
    <div className="bg-bg-primary flex items-center justify-between rounded-t-lg p-4 text-white">
      {selectedUser && (
        <button
          onClick={onBack}
          className="cursor-pointer text-sm font-bold text-white hover:text-gray-200"
        >
          ← Back
        </button>
      )}
      <h3 className="font-semibold">{title}</h3>

      <button
        onClick={onClose}
        className="cursor-pointer text-xl font-bold text-white hover:text-gray-200"
      >
        ×
      </button>
    </div>
  );
};

export default AdminChatHeader;
