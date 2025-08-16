import React from 'react';
import CurrentFeedbackCard from './Components/CurrentFeedbackCard';

function CurrentFeedback() {
  return (
    <div className="flex flex-col gap-4 px-8 pb-8">
      <p className="text-lg font-medium">Latest Projects</p>
      <div className="grid w-full grid-cols-3 grid-rows-1 gap-2">
        <CurrentFeedbackCard />
        <CurrentFeedbackCard />
        <CurrentFeedbackCard />
      </div>
    </div>
  );
}

export default CurrentFeedback;
