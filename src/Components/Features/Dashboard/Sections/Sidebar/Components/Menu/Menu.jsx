import React from 'react';
import MenuButton from './Components/MenuButton';
import { Home, Presentation, Settings, User } from 'lucide-react';

function Menu() {
  return (
    <div className="flex flex-col items-start gap-4">
      <MenuButton title="Go to Home Button" icon={Home} text="Home" />
      <MenuButton
        title="Go to Projects Button"
        icon={Presentation}
        text="Projects"
      />
      <MenuButton
        title="Go to Settings Button"
        icon={Settings}
        text="Settings"
      />
      <MenuButton title="Go to User Account Button" icon={User} text="User" />
    </div>
  );
}

export default Menu;
