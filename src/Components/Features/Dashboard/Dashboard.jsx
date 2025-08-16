import React from 'react';
import SideBar from './Sections/Sidebar/SideBar';
import TopBar from './Sections/Topbar/TopBar';
import LatestProjects from './Sections/CurrentFeedback/LatestProjects';
import Pending from './Sections/Pending/Pending';

function Dashboard() {
  return (
    <div className="bg-bg-main grid h-full w-full rounded-lg border border-neutral-700/40 shadow-2xl md:grid-cols-[auto_1fr]">
      <SideBar />
      <div className="grid min-h-full grid-rows-[auto_auto_1fr]">
        <TopBar />
        <LatestProjects />
        <Pending />
      </div>
    </div>
  );
}

export default Dashboard;
