'use client';

import StackSection from '@/Components/Features/Stack/StackSection';
import TopBar from '@/Components/Features/Topbar/TopBar';
import Avatar from '@/Components/UI/Avatar/Avatar';
import AboutMe from '@/Components/UI/Text/AboutMe';
import React from 'react';
import ExperienceSection from '../Experience/ExperienceSection';
import { useTranslation } from 'react-i18next';

function HeroSection() {
  const { t } = useTranslation();
  return (
    <div className="grid justify-between">
      <div className="flex flex-col gap-10">
        <TopBar />
        <div
          className={[
            'lg:grid lg:grid-cols-[auto_1fr] lg:space-y-20',
            'xl:',
            '2xl:grid 2xl:grid-cols-[auto_1fr_1fr] 2xl:gap-15 2xl:space-y-0',
          ].join(' ')}
        >
          <div className="lg:mr-10 2xl:mr-0">
            <Avatar />
          </div>

          {/* About Me */}
          <div
            className={[
              'h-full',
              'sm:',
              'md:',
              'lg:',
              'xl:',
              '2xl:grid 2xl:grid-rows-[auto_1fr] 2xl:gap-10',
            ].join(' ')}
          >
            <div className="hidden 2xl:block">
              <h2 className="text-text-body mb-2 text-center text-4xl font-bold">
                {t('aboutMe.title')}
              </h2>
              <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-blue-400 to-blue-800" />
            </div>
            <AboutMe />
          </div>

          {/* Experience */}
          <div
            className={[
              'hidden h-full',
              'sm:',
              'md:',
              'lg:',
              'xl:',
              '2xl:grid 2xl:grid-rows-[auto_1fr] 2xl:gap-10',
            ].join(' ')}
          >
            <div className="hidden 2xl:block">
              <h2 className="text-text-body mb-2 text-center text-4xl font-bold">
                {t('experienceSection.title')}
              </h2>
              <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-blue-400 to-blue-800" />
            </div>
            <ExperienceSection />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
