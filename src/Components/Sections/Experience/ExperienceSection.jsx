'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ExperienceSection() {
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation();

  return (
    <section className="mx-auto flex h-[100dvh] flex-col items-center justify-center gap-8 sm:max-w-[575px] md:max-w-full">
      <div>
        <h2 className="text-text-body mb-2 text-center text-4xl font-bold">
          {t('experienceSection.title')}
        </h2>
        <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-blue-400 to-blue-800" />
      </div>

      <div
        className={[
          'group relative flex w-full transform flex-col items-center justify-center overflow-hidden',
          'border-border-main hover:border-border-main rounded-2xl border sm:border-neutral-600',
          'bg-white/5 p-10 text-left text-base leading-relaxed text-neutral-200',
          'backdrop-blur-sm transition-all duration-500 ease-in-out hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]',
        ].join(' ')}
      >
        <span className="animate-spark hover:bg-accent-light absolute z-20 hidden h-2 w-2 rounded-full opacity-100 group-hover:block"></span>

        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/5 to-purple-600/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

        <div className="relative z-10 w-full">
          <div className="mb-6">
            <h3 className="mb-2 text-xl font-semibold text-blue-300">
              {t('experienceSection.role')}
            </h3>
            <p className="text-text-secondary text-sm">
              {t('experienceSection.company')}
            </p>
          </div>

          <div
            className={`overflow-hidden transition-all duration-500 md:max-h-none ${
              expanded ? 'max-h-[2000px]' : 'max-h-[200px]'
            }`}
          >
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="bg-accent-light mt-2 h-2 w-2 flex-shrink-0 rounded-full"></div>
                <span>
                  {t('experienceSection.points.point1_part1')}{' '}
                  <span className="text-accent font-medium">
                    {t('experienceSection.points.point1_highlight1')}
                  </span>{' '}
                  {t('experienceSection.points.point1_part2')}{' '}
                  <span className="text-accent font-medium">
                    {t('experienceSection.points.point1_highlight2')}
                  </span>
                  .
                </span>
              </li>

              <li className="flex items-start gap-3">
                <div className="bg-accent-light mt-2 h-2 w-2 flex-shrink-0 rounded-full"></div>
                <span>
                  {t('experienceSection.points.point2_part1')}{' '}
                  <span className="text-accent font-medium">
                    {t('experienceSection.points.point2_highlight')}
                  </span>
                  , {t('experienceSection.points.point2_part2')}
                </span>
              </li>

              <li className="flex items-start gap-3">
                <div className="bg-accent-light mt-2 h-2 w-2 flex-shrink-0 rounded-full"></div>
                <span>
                  <span className="text-accent font-medium">
                    {t('experienceSection.points.point3_part1')}
                  </span>{' '}
                  {t('experienceSection.points.point3_part2')}
                </span>
              </li>

              <li className="flex items-start gap-3">
                <div className="bg-accent-light mt-2 h-2 w-2 flex-shrink-0 rounded-full"></div>
                <span>
                  {t('experienceSection.points.point4_part1')}{' '}
                  <span className="text-accent font-medium">
                    {t('experienceSection.points.point4_highlight1')}
                  </span>
                  ,{' '}
                  <span className="text-accent font-medium">
                    {t('experienceSection.points.point4_highlight2')}
                  </span>
                  ,{' '}
                  <span className="text-accent font-medium">
                    {t('experienceSection.points.point4_highlight3')}
                  </span>{' '}
                  {t('experienceSection.points.point4_part2')}
                </span>
              </li>

              <li className="flex items-start gap-3">
                <div className="bg-accent-light mt-2 h-2 w-2 flex-shrink-0 rounded-full"></div>
                <span>
                  {t('experienceSection.points.point5_part1')}{' '}
                  <span className="text-accent font-medium">
                    {t('experienceSection.points.point5_highlight')}
                  </span>{' '}
                  {t('experienceSection.points.point5_part2')}
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-4 text-center md:hidden">
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-accent-light underline transition hover:text-blue-300"
            >
              {expanded
                ? t('experienceSection.showLess')
                : t('experienceSection.showMore')}
            </button>
          </div>

          <div className="border-border-strong mt-8 border-t pt-6">
            <div className="flex flex-wrap gap-3">
              {[
                { key: 'react', color: 'bg-accent-light/20 text-blue-300' },
                { key: 'next', color: 'bg-accent-light/20 text-blue-300' },
                { key: 'tailwind', color: 'bg-cyan-400/20 text-cyan-300' },
                { key: 'astro', color: 'bg-purple-400/20 text-purple-300' },
                { key: 'rest', color: 'bg-green-400/20 text-green-300' },
                { key: 'graphql', color: 'bg-indigo-400/20 text-indigo-300' },
                { key: 'firebase', color: 'bg-yellow-400/20 text-accent' },
                { key: 'shopify', color: 'bg-pink-400/20 text-pink-300' },
                { key: 'framer', color: 'bg-red-400/20 text-red-300' },
                { key: 'i18n', color: 'bg-teal-400/20 text-teal-300' },
                { key: 'vercel', color: 'bg-gray-400/20 text-text-subheading' },
                { key: 'github', color: 'bg-emerald-400/20 text-emerald-300' },
                { key: 'zustand', color: 'bg-lime-400/20 text-lime-300' },
                { key: 'context', color: 'bg-rose-400/20 text-rose-300' },
                { key: 'google', color: 'bg-amber-400/20 text-amber-300' },
                { key: 'apple', color: 'bg-pink-400/20 text-pink-300' },
              ].map((tag) => (
                <span
                  key={tag.key}
                  className={`rounded-full px-3 py-1 text-sm font-medium ${tag.color}`}
                >
                  {t(`experienceSection.tags.${tag.key}`)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
