'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

export default function AboutMe() {
  const { t } = useTranslation();

  return (
    <div
      className={[
        'relative z-40 flex flex-col items-center gap-10',
        'sm:max-w-[575px]',
        'md:h-full md:max-h-fit md:max-w-[450px] md:text-sm',
        'lg:max-h-full lg:max-w-lg lg:text-base',
        'xl',
      ].join(' ')}
    >
      {/* Title */}
      <div className="2xl:hidden">
        <h2 className="text-text-body mb-2 text-center text-4xl font-bold">
          {t('aboutMe.title')}
        </h2>
        <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-blue-400 to-blue-800" />
      </div>

      {/* Main Container */}
      <div
        className={[
          'group relative z-50 flex h-fit w-full flex-col gap-4 overflow-hidden',
          'border-border-main rounded-2xl border bg-white/5 p-8 text-left leading-relaxed text-neutral-200 backdrop-blur-sm',
          'transition-all duration-500 ease-in-out',
          'hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]',
          'sm:hover:border-border-main sm:max-w-[575px] sm:border-neutral-500',
        ].join(' ')}
      >
        <span className="animate-spark hover:bg-accent-light absolute z-20 hidden h-2 w-2 rounded-full opacity-100 group-hover:block"></span>
        <p
          className={['sm:', 'md:', 'lg:text-sm', 'xl:', '2xl:text-base'].join(
            ' '
          )}
        >
          {t('aboutMeSection.hi')}{' '}
          <span className="text-accent font-semibold">
            {t('aboutMeSection.name')}
          </span>
          , {t('aboutMeSection.a')}{' '}
          <span className="text-accent font-semibold">
            {t('aboutMeSection.student')}
          </span>{' '}
          {t('aboutMeSection.currently')}{' '}
          <span className="text-accent font-semibold">
            {t('aboutMeSection.internship')}
          </span>{' '}
          {t('aboutMeSection.atCompany')}{' '}
          <span className="text-accent font-semibold">
            {t('aboutMeSection.company')}
          </span>
          . {t('aboutMeSection.transition')}{' '}
          <span className="text-accent font-semibold">
            {t('aboutMeSection.experience')}
          </span>
          , {t('aboutMeSection.where')}{' '}
          <span className="text-accent font-semibold">
            {t('aboutMeSection.teams')}
          </span>{' '}
          {t('aboutMeSection.andManaged')}{' '}
          <span className="text-accent font-semibold">
            {t('aboutMeSection.operations')}
          </span>
          .
          <br />
          <br />
          {t('aboutMeSection.today')}{' '}
          <span className="text-accent font-semibold">
            {t('aboutMeSection.stack')}
          </span>
          , {t('aboutMeSection.focusing')}{' '}
          <span className="text-accent font-semibold">
            {t('aboutMeSection.focus')}
          </span>
          . {t('aboutMeSection.background')}{' '}
          <span className="text-accent font-semibold">
            {t('aboutMeSection.skills')}
          </span>{' '}
          {t('aboutMeSection.end')}
        </p>
      </div>
    </div>
  );
}
