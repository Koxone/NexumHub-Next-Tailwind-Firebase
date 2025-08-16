import React from 'react';
import SideBar from './Sections/Sidebar/SideBar';
import TopBar from './Sections/Topbar/TopBar';
import CurrentFeedback from './Sections/CurrentFeedback/CurrentFeedback';
import Pending from './Sections/Pending/Pending';

function Dashboard() {
  return (
    <div className="bg-bg-secondary grid h-full w-full grid-cols-[auto_1fr_auto] rounded-lg border border-neutral-700/40 shadow-2xl">
      <SideBar />
      <div className="grid grid-rows-[auto_auto_1fr]">
        <TopBar />
        <CurrentFeedback />
        <Pending />
      </div>
      <SideBar />
    </div>
  );
}

export default Dashboard;
