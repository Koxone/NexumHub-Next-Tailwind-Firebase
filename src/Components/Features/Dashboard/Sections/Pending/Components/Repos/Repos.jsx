import React from 'react';
import Title from '@/Components/Text/Title';
import PendingCard from '../Cards/PendingCard';
import TasksAnimatedList from '@/Components/Features/Dashboard/Custom/TasksAnimatedList';
import GitRepoAnimatedList from '@/Components/Features/Dashboard/Sections/Pending/Components/Repos/GitRepoAnimatedList/GitRepoAnimatedList';
import { useAuth } from '@clerk/nextjs';

function GithubRepos() {
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        {/* Title */}
        <Title title="Github Repositories" />

        {/* State Indicator */}
        {isSignedIn && (
          <div className="mb-4 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-300">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              Your repositories
            </span>
          </div>
        )}
      </div>
      <div className="grid h-full auto-rows-auto gap-2">
        <GitRepoAnimatedList refreshMs={1500000} showGradients />
      </div>
    </div>
  );
}

export default GithubRepos;
