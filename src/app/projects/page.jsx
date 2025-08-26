//Projects Page
'use client';

import Title from '@/Components/UI/Text/Title';

// Firebase
import { useProjects } from '@/Hooks/Firebase/Projects/useProjects';
import { Plus } from 'lucide-react';
import { useProjectModal } from '@/Stores/useProjectModal';
import InteractiveProjectsSection from '@/Components/Sections/FeaturedInteractiveProjects/InteractiveProjectsSection';
import GithubRepos from '@/Components/Features/Github/Components/Repos/GithubRepos';
import { useTranslation } from 'react-i18next';
import MobileSidebarToggleButton from '@/Components/Features/Sidebar/Components/MobileSidebarToggleButton/MobileSidebarToggleButton';

export default function Projects() {
  // Language
  const { t } = useTranslation();

  // Zustand
  const { toggleProject } = useProjectModal();

  // Firebase
  const { data, loading } = useProjects();
  if (loading) return <p className="text-text-subheading">Loading projects…</p>;
  if (!data.length) {
    return (
      <div className="flex h-[100dvh] flex-col gap-4 overflow-hidden px-8">
        <Title title="Latest Projects" />
        <div className="flex h-[300px] items-center justify-start">
          <div
            onClick={toggleProject}
            className={[
              'flex aspect-square max-h-[300px] w-full max-w-[300px] cursor-pointer',
              'flex-col items-center justify-center rounded-lg',
              'border-border-strong border border-dashed',
              'text-text-secondary p-4',
            ].join(' ')}
          >
            <span className="flex flex-col items-center text-lg font-medium">
              <Plus className="cursor-pointer" />
              Agrega un proyecto
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={[
        'mobile flex min-h-0 w-full flex-col gap-8 justify-self-center',
        'sm:',
        'md:',
        'lg:',
        'xl:px-12 xl:py-10',
        '2xl:px-16 2xl:py-10',
      ].join(' ')}
    >
      {/* Presentation */}
      <div>
        <div className="flex gap-4">
          <MobileSidebarToggleButton />
          <h1 className="text-text-primary mb-4 text-4xl font-bold tracking-tight capitalize md:text-4xl lg:text-4xl">
            {t('projectsRoute.title')}
          </h1>
        </div>
        <p
          className={[
            'mobile text-text-secondary max-w-[370px] text-sm font-light',
            'sm:text-xl',
            'md:max-w-[700px] md:text-xl',
            'lg:max-w-[1100px] lg:text-xl',
            'xl:text-xl',
            '2xl:text-xl',
          ].join(' ')}
        >
          {t('projectsRoute.presentation.1')}{' '}
          <span className="text-accent font-semibold">
            {t('projectsRoute.presentation.2')}
          </span>
          ,{t('projectsRoute.presentation.3')}{' '}
          <span className="text-accent font-semibold">
            {t('projectsRoute.presentation.4')}
          </span>{' '}
          {t('projectsRoute.presentation.5')}
        </p>
      </div>

      {/* Main Content */}
      <div
        className={[
          'mobile no-scrollbar flex [scroll-behavior:smooth]',
          'md:grid md:justify-center md:gap-8',
          'lg:grid-cols-[auto_1fr]',
        ].join(' ')}
      >
        {/* Projects */}
        <div className="flex flex-col gap-5">
          <Title title={t('projectsRoute.featured')} />
          <InteractiveProjectsSection />
        </div>

        {/* Github Repos */}
        <div className={['mobile hidden flex-col gap-5', 'md:flex'].join(' ')}>
          <div className="flex items-center gap-4">
            {/* Title */}
            <Title title={t('projectsRoute.latest')} className="" />

            {/* State Indicator */}
            <div className="text-center">
              <span className="bg-button-primary text-text-body inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs">
                <span className="bg-bg-emerald h-2 w-2 rounded-full"></span>
                {t('projectsRoute.realTime')}
              </span>
            </div>
          </div>
          <GithubRepos padding="" />
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
