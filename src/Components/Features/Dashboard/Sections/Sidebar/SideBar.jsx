import React from 'react';
import Logo from './Components/Logo/Logo';
import Avatar from './Components/Avatar/Avatar';
import Menu from './Components/Menu/Menu';

function SideBar() {
  return (
    <div className="relative hidden md:grid h-full w-fit grid-cols-1 grid-rows-[auto_auto_1fr] gap-6 rounded-tl-lg rounded-bl-lg p-8 before:absolute before:top-[20px] before:right-0 before:bottom-[20px] before:w-px before:bg-gray-400/40">
      <Logo />
      <Avatar />
      <Menu />
    </div>
  );
}

export default SideBar;
