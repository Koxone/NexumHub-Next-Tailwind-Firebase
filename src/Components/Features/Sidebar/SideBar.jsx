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
        'hidden md:grid lg:relative lg:flex',
        'absolute z-50 flex grid-cols-1 grid-rows-[auto_auto_1fr] flex-col gap-6',
        'bg-bg-main before:bg-gray-400/40',
        'h-full max-h-[790px] w-fit p-8 md:max-h-full',
        'rounded-tl-lg rounded-bl-lg',
        'pointer-events-auto scale-100 opacity-100 transition-all duration-200 ease-out md:pointer-events-auto md:scale-100 md:opacity-100',
        'before:absolute before:top-[20px] before:right-0 before:bottom-[20px] before:w-px',
      ].join(' ')}
    >
      <div className="grid w-full grid-cols-[auto_1fr] items-center gap-4">
        <MobileSidebarToggleButton />
        <Logo />
      </div>

      {/* Clerk SignedOut */}
      <SignedOut>
        <SignInButton mode="modal">
          <div className="flex flex-col gap-4">
            <Avatar />
            <PulseSignInButton>
              <button className="w-full cursor-pointer rounded-md bg-[#4d74b8] px-3 py-2 text-sm text-white transition-all duration-200 ease-in-out hover:bg-[#2a3f61]">
                Sign In
              </button>
            </PulseSignInButton>
          </div>
        </SignInButton>
      </SignedOut>

      {/* Clerk SignedIn */}
      <SignedIn>
        <div className="flex flex-col items-center gap-3">
          <UserButton />
          <div>
            <h3
              title="Username"
              className="text-center text-base font-medium text-white capitalize"
            >
              {user?.externalAccounts?.[0]?.username || 'Not available'}
            </h3>
            <p title="User Email Address" className="text-xs text-neutral-400">
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
