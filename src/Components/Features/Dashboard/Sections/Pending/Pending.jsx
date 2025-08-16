import React from 'react';
import Tasks from './Components/Tasks/Tasks';
import ApprovePending from './Components/ApprovePending/ApprovePending';

function Pending() {
  return (
    <div className="grid grid-cols-2 gap-4 p-8">
      <Tasks />
      <ApprovePending />
    </div>
  );
}

export default Pending;
