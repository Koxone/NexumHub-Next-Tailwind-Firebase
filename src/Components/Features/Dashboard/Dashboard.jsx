import React from 'react';
import SideBar from './Sections/Sidebar/SideBar';
import TopBar from './Sections/Topbar/TopBar';

function Dashboard() {
  return (
    <div className="grid h-full w-full grid-cols-[auto_1fr_auto] rounded-lg border">
      <SideBar />
      <div className="grid grid-rows-[auto_auto-1fr]">
        <TopBar />
        <div className="border">2</div>
        <div className="border">3</div>
      </div>
      <SideBar />
    </div>
  );
}

export default Dashboard;
