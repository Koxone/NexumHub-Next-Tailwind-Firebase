import StackSection from '@/Components/Features/Stack/StackSection';
import Avatar from '@/Components/UI/Avatar/Avatar';
import AboutMe from '@/Components/UI/Text/AboutMe';
import React from 'react';

function HeroSection() {
  return (
    <div className="flex gap-12">
      <div className="flex gap-15">
        <Avatar />
        <AboutMe />
      </div>
      <StackSection />
    </div>
  );
}

export default HeroSection;
