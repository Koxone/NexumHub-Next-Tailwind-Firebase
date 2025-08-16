'use client';

import React from 'react';
import Logo from './Components/Logo/Logo';
import Avatar from './Components/Avatar/Avatar';
import SidebarMenu from './Components/Menu/SidebarMenu';
import { useMobileMenu } from '@/Stores/useMobileMenu';
import MobileMenuButton from './Components/MobileButton/MobileMenuButton';

function SideBar() {
  const { isOpen } = useMobileMenu();

  return (
    <div
      id="mobile-menu"
      className={[
        'bg-bg-main absolute z-50 h-full max-h-[790px] w-fit md:relative md:max-h-full',
        'flex grid-cols-1 grid-rows-[auto_auto_1fr] flex-col gap-6 md:grid',
        'rounded-tl-lg rounded-bl-lg p-8',
        'before:absolute before:top-[20px] before:right-0 before:bottom-[20px] before:w-px before:bg-gray-400/40',
        'transition-all duration-200 ease-out',
        isOpen
          ? 'pointer-events-auto scale-100 opacity-100'
          : 'pointer-events-none scale-95 opacity-0',
        'md:pointer-events-auto md:scale-100 md:opacity-100',
      ].join(' ')}
    >
      <div className="grid w-full grid-cols-[auto_1fr] items-center gap-4">
        <MobileMenuButton />
        <Logo />
      </div>
      <Avatar />
      <SidebarMenu />
    </div>
  );
}

export default SideBar;
