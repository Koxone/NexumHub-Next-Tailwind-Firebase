import React from 'react';
import Avatars from './Avatars';
import MenuButton from './MenuButton';
import Title from './Title';
import ProgressBar from './ProgressBar';

function CurrentFeedbackCard() {
  return (
    <div className="grid aspect-square grid-cols-1 grid-rows-[1fr_1fr_auto] rounded-lg border bg-blue-400/50 p-4">
      <div className="flex h-fit items-center justify-between">
        <Avatars />
        <MenuButton />
      </div>
      <Title title="Mobile Web App" />
      <ProgressBar />
    </div>
  );
}

export default CurrentFeedbackCard;
