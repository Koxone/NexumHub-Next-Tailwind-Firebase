'use client';

import React from 'react';

// Clerk
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from '@clerk/nextjs';

function Greeting() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long', // Friday
    day: 'numeric', // 15
    month: 'long', // August
    year: 'numeric', // 2025
  });

  // Clerk
  const { user } = useUser();

  return (
    <div>
      <SignedOut>
        <h1 className="text-h1 font-bold text-white">
          Hello, I'am Carlos, Frontend Engineer
        </h1>
        <p className="text-base text-neutral-500">
          Specializing in React, Next.js & Firebase integrations
        </p>
      </SignedOut>
      <SignedIn>
        <h1 className="text-h1 font-bold text-white capitalize">
          Hello {user?.externalAccounts?.[0]?.username || 'Not available'}!
        </h1>
        <p className="text-xs text-neutral-500">Today is {formattedDate}</p>
      </SignedIn>
    </div>
  );
}

export default Greeting;
