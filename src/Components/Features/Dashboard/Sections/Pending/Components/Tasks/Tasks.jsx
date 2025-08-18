import React from 'react';
import Title from '@/Components/Text/Title';
import PendingCard from '../Cards/PendingCard';
import TasksAnimatedList from '@/Components/Features/Dashboard/Custom/TasksAnimatedList';
import GitHubReposList from '@/Components/GitHubReposList';

function Tasks() {
  return (
    <div className="flex flex-col gap-2">
      <Title title="Public Repositories" />
      <p className="text-xs text-neutral-400">
        In order to show your own repositories, please sign in
      </p>
      <div className="grid h-full auto-rows-auto gap-2">
        <GitHubReposList refreshMs={15000} showGradients />
      </div>
    </div>
  );
}

export default Tasks;
