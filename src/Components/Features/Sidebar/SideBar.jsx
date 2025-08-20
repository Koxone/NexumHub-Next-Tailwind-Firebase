'use client';

import React from 'react';
import Logo from './Components/Logo/Logo';
import Avatar from './Components/Avatar/Avatar';
import SidebarMenu from './Components/Menu/SidebarMenu';
import { useMobileMenu } from '@/Stores/useMobileMenu';
import MobileSidebarToggleButton from './Components/MobileSidebarToggleButton/MobileSidebarToggleButton';
import PulseSignInButton from '../../UI/Buttons/PulseSignInButton';

// Clerk
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from '@clerk/nextjs';

function SideBar({ className }) {
  const { isOpen } = useMobileMenu();
  const { user } = useUser();

  return (
    <div
      id="mobile-menu"
      className={[
        `${className}`,
        // visible solo en desktop
        'hidden lg:flex',
        // fixed sidebar
        'fixed top-0 left-0 z-50 h-screen w-64 flex-col gap-6 overflow-y-auto',
        // skin
        'bg-bg-main p-8',
        // divider
        'backdrop-blur-sm before:absolute before:top-0 before:right-0 before:bottom-0 before:w-px before:bg-gray-400/40',
        // reset
        'rounded-none',
      ].join(' ')}
    >
      <div className="grid w-full grid-cols-[auto_1fr] items-center gap-4">
        <MobileSidebarToggleButton />
        <Logo />
      </div>

      {/* Clerk SignedOut */}
      {/* <SignedOut>
        <SignInButton mode="modal"> */}
      <div className="flex flex-col gap-4">
        <Avatar />
        {/* <PulseSignInButton>
              <button className="w-full cursor-pointer rounded-md bg-[#4d74b8] px-3 py-2 text-sm text-text-primary transition-all duration-200 ease-in-out hover:bg-[#2a3f61]">
                Sign In
              </button>
            </PulseSignInButton> */}
      </div>
      {/* </SignInButton>
      </SignedOut> */}

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
    </div>
  );
}

export default SideBar;
