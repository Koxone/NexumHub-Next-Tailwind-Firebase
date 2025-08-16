import React from 'react';
import MenuButton from './Components/MenuButton';
import {
  Home,
  Presentation,
  Search,
  Settings,
  User,
  ClipboardList,
  CheckCircle,
} from 'lucide-react';

function Menu() {
  return (
    <div className="flex flex-col items-start gap-4">
      <MenuButton aria="Go to Home Button" icon={Home} text="Home" />
      <MenuButton
        aria="Go to Projects Button"
        icon={Presentation}
        text="Projects"
      />
      <MenuButton
        aria="Go to Tasks Button"
        icon={ClipboardList}
        text="Pending Tasks"
      />
      <MenuButton
        aria="Go to Approval Button"
        icon={CheckCircle}
        text="Pending Approval"
      />
      <MenuButton
        aria="Go to Search Projects Button"
        icon={Search}
        text="Search"
      />
      <MenuButton
        aria="Go to Settings Button"
        icon={Settings}
        text="Settings"
      />
      <MenuButton aria="Go to User Account Button" icon={User} text="User" />
    </div>
  );
}

export default Menu;
