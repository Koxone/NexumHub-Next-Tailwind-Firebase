'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

export default function AboutMe() {
  const { t } = useTranslation();

  return (
    <div
      className={[
        'relative z-50 mx-auto mt-10 flex max-w-[300px] flex-col items-center gap-10',
        'sm:max-w-[575px]',
        'md:mt-0 md:h-full md:max-h-fit md:max-w-[450px] md:text-sm',
        'lg:mt-0 lg:max-h-full lg:max-w-lg lg:text-base',
        'xl:mt-0',
      ].join(' ')}
    >
      {/* title */}
      <div>
        <h2 className="mb-2 text-center text-4xl font-bold text-[#c2c6da]">
          About Me
        </h2>
        <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-blue-400 to-blue-800" />
      </div>
      <div
        className={[
          'group relative z-50 flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden',
          'rounded-2xl border border-blue-400 bg-white/5 p-8 text-left leading-relaxed text-neutral-200 backdrop-blur-sm',
          'transition-all duration-500 ease-in-out',
          'hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]',
          'sm:max-w-[575px] sm:border-neutral-500 sm:hover:border-blue-400',
        ].join(' ')}
      >
        <span className="animate-spark absolute z-20 hidden h-2 w-2 rounded-full opacity-100 group-hover:block hover:bg-blue-400"></span>
        <p>
          {t('aboutMeSection.hi')}{' '}
          <span className="font-semibold text-[#1E90FF]">
            {t('aboutMeSection.name')}
          </span>
          , {t('aboutMeSection.a')}{' '}
          <span className="font-semibold text-[#1E90FF]">
            {t('aboutMeSection.student')}
          </span>{' '}
          {t('aboutMeSection.currently')}{' '}
          <span className="font-semibold text-[#1E90FF]">
            {t('aboutMeSection.internship')}
          </span>{' '}
          {t('aboutMeSection.atCompany')}{' '}
          <span className="font-semibold text-[#1E90FF]">
            {t('aboutMeSection.company')}
          </span>
          . {t('aboutMeSection.transition')}{' '}
          <span className="font-semibold text-[#1E90FF]">
            {t('aboutMeSection.experience')}
          </span>
          , {t('aboutMeSection.where')}{' '}
          <span className="font-semibold text-[#1E90FF]">
            {t('aboutMeSection.teams')}
          </span>{' '}
          {t('aboutMeSection.andManaged')}{' '}
          <span className="font-semibold text-[#1E90FF]">
            {t('aboutMeSection.operations')}
          </span>
          .
          <br />
          <br />
          {t('aboutMeSection.today')}{' '}
          <span className="font-semibold text-[#1E90FF]">
            {t('aboutMeSection.stack')}
          </span>
          , {t('aboutMeSection.focusing')}{' '}
          <span className="font-semibold text-[#1E90FF]">
            {t('aboutMeSection.focus')}
          </span>
          . {t('aboutMeSection.background')}{' '}
          <span className="font-semibold text-[#1E90FF]">
            {t('aboutMeSection.skills')}
          </span>{' '}
          {t('aboutMeSection.end')}
        </p>
      </div>
    </div>
  );
}
