'use client';

import React from 'react';
import Logo from './Components/Logo/Logo';
import Avatar from './Components/Avatar/Avatar';
import SidebarMenu from './Components/Menu/SidebarMenu';
import MobileSidebarToggleButton from './Components/MobileSidebarToggleButton/MobileSidebarToggleButton';

// Clerk
import { SignedIn, UserButton, useUser } from '@clerk/nextjs';
import OpenChatButton from '../Chat/ChatUser/Components/OpenChatButton';

function SideBar({ className }) {
  const { user } = useUser();

  return (
    <div
      className={[
        `${className}`,
        'fixed top-0 left-0 z-50 hidden h-screen w-64 flex-col gap-6 overflow-y-auto',
        'bg-bg-main p-8',
        'backdrop-blur-sm before:absolute before:top-0 before:right-0 before:bottom-0 before:w-px before:bg-gray-400/40',
        'rounded-none',
        'sm:',
        'md:',
        'lg:hidden',
        'xl:flex',
        '2xl:flex',
      ].join(' ')}
    >
      <div className="grid w-full grid-cols-[auto_1fr] items-center gap-4">
        <MobileSidebarToggleButton />
        <Logo />
      </div>

      <div className="flex flex-col gap-4">
        <Avatar />
      </div>

      {/* Clerk SignedIn */}
      <SignedIn>
        <div className="flex flex-col items-center gap-3">
          <UserButton />
          <div>
            <h3
              title="Username"
              className="text-text-primary text-center text-base font-medium capitalize"
            >
              {user?.externalAccounts?.[0]?.username || 'Not available'}
            </h3>
            <p
              title="User Email Address"
              className="text-text-secondary text-xs"
            >
              {user?.primaryEmailAddress?.emailAddress || ''}
            </p>
          </div>
        </div>
      </SignedIn>

      {/* Sidebar Menu */}
      <SidebarMenu />
      <OpenChatButton />
    </div>
  );
}

export default SideBar;
