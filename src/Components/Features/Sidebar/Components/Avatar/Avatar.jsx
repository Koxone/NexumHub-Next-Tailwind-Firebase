import React from 'react';
import UserPicture from './Components/UserPicture';
import UserData from './Components/UserData';

function Avatar() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <UserPicture />
      <UserData />
    </div>
  );
}

export default Avatar;
