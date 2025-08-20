import StackSection from '@/Components/Features/Stack/StackSection';
import Avatar from '@/Components/UI/Avatar/Avatar';
import AboutMe from '@/Components/UI/Text/AboutMe';
import React from 'react';

function HeroSection() {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] justify-between">
      <div className="flex gap-15">
        <Avatar />
        <AboutMe />
      </div>
      <StackSection />
    </div>
  );
}

export default HeroSection;
