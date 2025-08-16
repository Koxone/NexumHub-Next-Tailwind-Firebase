import React from 'react';
import Title from '@/Components/Text/Title';
import PendingCard from '../Cards/PendingCard';

function ApprovePending() {
  return (
    <div className="flex flex-col gap-2">
      <Title title="Pending Approval" />
      <div className="flex h-full flex-col justify-between">
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
