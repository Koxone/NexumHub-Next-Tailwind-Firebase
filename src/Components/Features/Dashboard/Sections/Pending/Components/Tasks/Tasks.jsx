import React from 'react';
import Title from '@/Components/Text/Title';
import PendingCard from '../Cards/PendingCard';
import TasksAnimatedList from '@/Components/Features/Dashboard/Custom/TasksAnimatedList';
import GitHubReposList from '@/Components/GitHubReposList';

function Tasks() {
  return (
    <div className="flex flex-col gap-2">
      <Title title="Github Repositories" />
      <div className="grid h-full auto-rows-auto gap-2">
        <GitHubReposList refreshMs={15000} showGradients />
      </div>
    </div>
  );
}

export default Tasks;
