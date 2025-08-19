'use client';

import React from 'react';
import GithubRepos from './Components/Repos/GithubRepos';
import ApprovePending from './Components/ApprovePending/ApprovePending';

export default function ReposAndMore() {
  return (
    <div className="grid h-full min-h-0 grid-cols-2 gap-4 px-8 py-6">
      <GithubRepos className="h-full" />
      <ApprovePending className="h-full" />
    </div>
  );
}
