import React from 'react';
import Title from '@/Components/Text/Title';
import PendingCard from '../Cards/PendingCard';
import TasksAnimatedList from '@/Components/Features/Dashboard/Custom/TasksAnimatedList';

function Tasks() {
  return (
    <div className="flex flex-col gap-2">
      <Title title="Tasks For Today" />
      <div className="grid h-full auto-rows-auto gap-2">
        <TasksAnimatedList
          showGradients={false}
          enableArrowNavigation={true}
          displayScrollbar={false}
        />
      </div>
    </div>
  );
}

export default Tasks;
