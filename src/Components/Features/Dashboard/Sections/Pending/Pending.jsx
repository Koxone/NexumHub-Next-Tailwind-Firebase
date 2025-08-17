'use client';

import React from 'react';
import Tasks from './Components/Tasks/Tasks';
import ApprovePending from './Components/ApprovePending/ApprovePending';

function Pending() {
  return (
    <div className="grid h-full min-h-0 grid-cols-2 gap-4 px-8 py-6">
      <Tasks className="h-full" />
      <ApprovePending className="h-full" />
    </div>
  );
}

export default Pending;
