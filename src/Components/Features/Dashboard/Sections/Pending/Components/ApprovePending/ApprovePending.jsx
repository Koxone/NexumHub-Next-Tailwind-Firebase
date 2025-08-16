import React from 'react';
import Title from '@/Components/Text/Title';
import PendingCard from '../Cards/PendingCard';

function ApprovePending() {
  return (
    <div className="flex flex-col gap-2">
      <Title title="Pending Approval" />
      <div className="grid h-full auto-rows-auto gap-2">
        <PendingCard
          type="approval"
          title="FitWorld Shop"
          subtitle="Revisar Inventario"
        />
        <PendingCard
          type="approval"
          title="FitWorld Shop"
          subtitle="Revisar Inventario"
        />
        <PendingCard
          type="approval"
          title="FitWorld Shop"
          subtitle="Revisar Inventario"
        />
        <PendingCard
          type="approval"
          title="FitWorld Shop"
          subtitle="Revisar Inventario"
        />
        <PendingCard
          type="approval"
          title="FitWorld Shop"
          subtitle="Revisar Inventario"
        />
      </div>
    </div>
  );
}

export default ApprovePending;
