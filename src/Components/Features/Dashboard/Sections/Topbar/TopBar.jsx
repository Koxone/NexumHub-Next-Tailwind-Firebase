import React from 'react';
import Greeting from './Components/Greeting';
import { Search } from 'lucide-react';
import AddProjectButton from './Components/AddProjectButton';

function TopBar() {
  return (
    <div className="grid h-fit grid-cols-[1fr_auto] grid-rows-1 p-8">
      <Greeting />
      <AddProjectButton />
    </div>
  );
}

export default TopBar;
