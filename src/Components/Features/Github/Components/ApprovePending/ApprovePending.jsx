import React from 'react';
import Title from '@/Components/UI/Text/Title';
import PendingAnimatedList from '@/Components/Features/Firebase/PendingAnimatedList';

function ApprovePending() {
  return (
    <div className="flex flex-col gap-2">
      <Title title="Pending Approval" />
      <div className="grid h-full auto-rows-auto gap-2">
        <PendingAnimatedList
          collectionNames={['objects', 'reportLost', 'reportMissing']}
          showGradients={false}
          enableArrowNavigation={true}
          displayScrollbar={false}
        />
      </div>
    </div>
  );
}

export default ApprovePending;
