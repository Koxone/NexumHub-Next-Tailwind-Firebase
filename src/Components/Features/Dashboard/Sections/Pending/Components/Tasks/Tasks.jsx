import React from 'react';
import Title from '@/Components/Text/Title';
import PendingCard from '../Cards/PendingCard';

function Tasks() {
  return (
    <div className="flex flex-col gap-2">
      <Title title="Tasks For Today" />
      <div className="grid h-full auto-rows-auto gap-2">
        <PendingCard
          type="task"
          project="fws"
          title="FitWorld Shop"
          subtitle="Revisar Inventario"
        />
        <PendingCard
          type="task"
          project="testigo"
          title="TestigoMX"
          subtitle="Revisar Inventario"
        />
        <PendingCard
          type="task"
          project="testigo"
          title="TestigoMX"
          subtitle="Revisar Inventario"
        />
        <PendingCard
          type="task"
          project="learn"
          title="Learn-Frontend"
          subtitle="Revisar Inventario"
        />
        <PendingCard
          type="task"
          project="learn"
          title="Learn-Frontend"
          subtitle="Revisar Inventario"
        />
      </div>
    </div>
  );
}

export default Tasks;
