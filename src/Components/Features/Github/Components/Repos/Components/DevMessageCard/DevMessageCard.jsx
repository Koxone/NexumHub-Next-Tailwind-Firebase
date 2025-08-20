import React, { useState } from 'react';

// Clerk
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from '@clerk/nextjs';
import PulseSignInButton from '@/Components/UI/Buttons/PulseSignInButton';

function DevMessageCard({ isSignedIn, isLoaded, loading, setLoading }) {
  return (
    <div>
      {/* Developer Message */}
      {!isSignedIn && !loading && (
        <PulseSignInButton>
          <div className="mb-4 rounded-lg border border-violet-500/20 bg-gradient-to-r from-violet-500/5 to-blue-500/5 p-4 text-center">
            {/* State Indicator  */}
            <div className="mb-4 text-center">
              <span className="bg-bg-secondary text-text-body inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs">
                {isSignedIn ? (
                  <>
                    <span className="bg-bg-emerald h-2 w-2 rounded-full"></span>
                    Your repositories
                  </>
                ) : (
                  <>
                    <span className="h-2 w-2 rounded-full bg-violet-500"></span>
                    Developer's showcase
                  </>
                )}
              </span>
            </div>
            <div className="mb-2 flex items-center justify-center gap-2">
              <span className="text-lg">👋</span>
              <span className="text-sm font-medium text-violet-300">
                Welcome to my Developer Portfolio
              </span>
            </div>
            <p className="text-text-body mb-3 text-sm">
              You're currently viewing{' '}
              <span className="font-semibold text-violet-400">
                my projects and repositories
              </span>
              . Each one represents hours of passion, learning, and
              problem-solving.
            </p>
            <div className="text-text-secondary flex items-center justify-center gap-1 text-xs">
              <span>Want to showcase your own work?</span>

              <SignedOut>
                <SignInButton mode="modal">
                  <button className="cursor-pointer font-medium text-violet-400 underline underline-offset-2 transition-colors hover:text-violet-300">
                    Sign in
                  </button>
                </SignInButton>
              </SignedOut>
              <span>
                to connect your GitHub and see your repositories here.
              </span>
            </div>
          </div>
        </PulseSignInButton>
      )}
    </div>
  );
}

export default DevMessageCard;
