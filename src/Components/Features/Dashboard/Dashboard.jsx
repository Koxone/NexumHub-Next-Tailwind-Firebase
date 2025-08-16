import React from 'react';
import SideBar from './Sections/Sidebar/SideBar';

function Dashboard() {
  return (
    <div className="grid w-full h-full grid-cols-[auto_1fr_auto] border rounded-lg">
      <SideBar />
      <SideBar />
      <SideBar />
    </div>
  );
}

export default Dashboard;
