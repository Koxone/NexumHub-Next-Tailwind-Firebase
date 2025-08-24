import React from 'react';
import UserListItem from './UserListItem';

const UsersList = ({ chats, onUserSelect }) => {
  const userIds = Object.keys(chats);

  if (userIds.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
        <p className="mb-3 font-semibold text-gray-600">Active Users</p>
        <div className="mt-8 text-center text-gray-500">
          <p>No active conversations</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
      <p className="mb-3 font-semibold text-gray-600">Active Users</p>
      <ul className="space-y-2">
        {userIds.map((userId) => (
          <UserListItem
            key={userId}
            userId={userId}
            messages={chats[userId] || []}
            onClick={() => onUserSelect(userId)}
          />
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
