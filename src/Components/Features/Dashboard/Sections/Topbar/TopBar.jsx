import React from 'react';
import Greeting from './Components/Greeting';
import { Search } from 'lucide-react';
import AddProjectButton from './Components/AddProjectButton';
import MobileSidebarToggleButton from '../Sidebar/Components/MobileSidebarToggleButton/MobileSidebarToggleButton';
import NotificationBell from './Components/NotificationBell';

function TopBar({ padding = 'p-8' }) {
  return (
    <div className={`grid h-fit grid-cols-[1fr_auto] grid-rows-1 ${padding}`}>
      <div className="flex items-center gap-6">
        <MobileSidebarToggleButton />
        <Greeting />
      </div>
      <NotificationBell />
    </div>
  );
}

export default TopBar;
