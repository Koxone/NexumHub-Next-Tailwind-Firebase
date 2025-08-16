import React from 'react';
import Title from '@/Components/Text/Title';
import PendingCard from '../Cards/PendingCard';
import AnimatedList from '@/Components/Features/Dashboard/Custom/AnimatedList';

function Tasks() {
  return (
    <div className="flex flex-col gap-2">
      <Title title="Tasks For Today" />
      <div className="grid h-full auto-rows-auto gap-2">
        <AnimatedList
          type="task"
          project="fws"
          title="Tasks For Today"
          subtitle="Manage your tasks efficiently"
          showGradients={false}
          enableArrowNavigation={true}
          displayScrollbar={false}
        />
      </div>
    </div>
  );
}

export default Tasks;
