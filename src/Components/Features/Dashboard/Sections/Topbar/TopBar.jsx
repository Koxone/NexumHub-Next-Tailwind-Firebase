import React from 'react';
import Greeting from './Components/Greeting';
import { Search } from 'lucide-react';
import AddProjectButton from './Components/AddProjectButton';
import MobileMenuButton from '../Sidebar/Components/MobileButton/MobileMenuButton';

function TopBar() {
  return (
    <div className="grid h-fit grid-cols-[1fr_auto] grid-rows-1 p-8">
      <div className="flex items-center gap-6">
        <MobileMenuButton />
        <Greeting />
      </div>
      <AddProjectButton />
    </div>
  );
}

export default TopBar;
