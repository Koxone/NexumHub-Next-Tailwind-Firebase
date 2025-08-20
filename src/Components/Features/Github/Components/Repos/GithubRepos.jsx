import React from 'react';
import Title from '@/Components/UI/Text/Title';
import PendingCard from '../Cards/PendingCard';
import TasksAnimatedList from '@/Components/Features/Firebase/TasksAnimatedList';
import { useAuth } from '@clerk/nextjs';
import GitRepoAnimatedList from './Components/GitRepoAnimatedList/GitRepoAnimatedList';

function GithubRepos({padding}) {
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <div className="flex flex-col">
      <div className="flex justify-between"></div>
      <div className="grid h-full auto-rows-auto gap-2">
        <GitRepoAnimatedList padding={padding} showMore={true} pageSizeNumber={4} />
      </div>
    </div>
  );
}

export default GithubRepos;
