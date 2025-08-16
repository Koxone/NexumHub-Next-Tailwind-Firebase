import React from 'react';
import Title from '@/Components/Text/Title';
import PendingCard from '../Cards/PendingCard';

function Tasks() {
  return (
    <div className="flex flex-col gap-2">
      <Title title="Tasks For Today" />
      <div className="flex h-full flex-col justify-between">
        <PendingCard
          type="task"
          title="FitWorld Shop"
          subtitle="Revisar Inventario"
        />
        <PendingCard
          type="task"
          title="FitWorld Shop"
          subtitle="Revisar Inventario"
        />
        <PendingCard
          type="task"
          title="FitWorld Shop"
          subtitle="Revisar Inventario"
        />
        <PendingCard
          type="task"
          title="FitWorld Shop"
          subtitle="Revisar Inventario"
        />
        <PendingCard
          type="task"
          title="FitWorld Shop"
          subtitle="Revisar Inventario"
        />
      </div>
    </div>
  );
}

export default Tasks;
