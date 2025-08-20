'use client';
import React from 'react';
import MatrixText from '@/Components/UI/Text/MatrixText';

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
        <div className="">
          <h1 className="text-4xl font-bold tracking-tight text-white capitalize md:text-4xl lg:text-4xl">
            Carlos de Leon
          </h1>
          <MatrixText />
        </div>

        <p className="text-sm font-light text-neutral-400 sm:text-xl md:text-xl lg:text-xl xl:text-xl 2xl:text-xl">
          Specializing in React, Next.js & Firebase integrations
        </p>
      </SignedOut>
      <SignedIn>
        <h1 className="text-4xl font-bold tracking-tight text-white capitalize md:text-4xl lg:text-4xl">
          Hello {user?.externalAccounts?.[0]?.username || 'Not available'}!
        </h1>
        <p className="text-sm font-light text-neutral-400 sm:text-xl md:text-xl lg:text-xl xl:text-xl 2xl:text-xl">
          Today is {formattedDate}
        </p>
      </SignedIn>
    </div>
  );
}

export default Greeting;
