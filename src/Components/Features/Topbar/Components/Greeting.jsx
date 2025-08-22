'use client';
import React from 'react';
import MatrixText from '@/Components/UI/Text/MatrixText';

//Language
import { useTranslation } from 'react-i18next';

// Clerk
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs';

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

  //Language
  const { t } = useTranslation();

  return (
    <div>
      <SignedOut>
        <div className="">
          <h1 className="text-text-primary text-4xl font-bold tracking-tight capitalize md:text-4xl lg:text-4xl">
            Carlos de Leon
          </h1>
          <MatrixText />
        </div>

        <p className="text-text-secondary text-sm font-light sm:text-xl md:text-xl lg:text-xl xl:text-xl 2xl:text-xl">
          {t('greeting.subtitle')}
        </p>
      </SignedOut>
      <SignedIn>
        <h1 className="text-text-primary text-4xl font-bold tracking-tight capitalize md:text-4xl lg:text-4xl">
          Hello {user?.externalAccounts?.[0]?.username || 'Not available'}!
        </h1>
        <p className="text-text-secondary text-sm font-light sm:text-xl md:text-xl lg:text-xl xl:text-xl 2xl:text-xl">
          Today is {formattedDate}
        </p>
      </SignedIn>
    </div>
  );
}

export default Greeting;
