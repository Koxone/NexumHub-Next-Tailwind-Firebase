import React from 'react';
import CurrentFeedbackCard from './Components/CurrentFeedbackCard';
import Title from '@/Components/Text/Title';

function CurrentFeedback() {
  return (
    <div className="flex flex-col gap-4 px-8">
      <Title title="Latest Projects" />
      <div className="grid w-full grid-cols-3 grid-rows-1 gap-2">
        <CurrentFeedbackCard />
        <CurrentFeedbackCard />
        <CurrentFeedbackCard />
      </div>
    </div>
  );
}

export default CurrentFeedback;
