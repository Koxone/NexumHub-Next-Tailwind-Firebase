import React from 'react';
import Greeting from './Components/Greeting';
import { Search } from 'lucide-react';
import AddProjectButton from './Components/AddProjectButton';
import NotificationBell from './Components/NotificationBell';
import MobileSidebarToggleButton from '@/Components/Features/Sidebar/Components/MobileSidebarToggleButton/MobileSidebarToggleButton';

function TopBar({ padding = 'p-8', className }) {
  return (
    <div
      className={`grid h-fit grid-cols-[1fr_auto] grid-rows-1 ${padding} ${className}`}
    >
      <div className="flex items-center gap-6">
        <MobileSidebarToggleButton />
        <Greeting />
      </div>
      {/* <NotificationBell /> */}
    </div>
  );
}

export default TopBar;
