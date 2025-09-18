'use client';

import React from 'react';
import FeatureBadge from './Components/FeatureBadge';
import StateBadge from './Components/StateBadge';
import ProjectImage from './Components/ProjectImage';
import CardHeader from './Components/CardHeader';
import ProjectText from './Components/ProjectText';
import Technologies from './Components/Technologies';
import Activity from './Components/Activity';
import data from '@/Data/Projects/data.json';
import { useTranslation } from 'react-i18next';

export default function InteractiveProjectCard({
  projectKey,
  className,
  threadhive,
}) {
  const { t } = useTranslation();
  const project = data.projects[projectKey];

  if (!project) return null;

  return (
    <div className="group relative w-full max-w-[350px]">
      <div
        className={[
          `${className}`,
          'relative h-full cursor-pointer overflow-hidden rounded-xl backdrop-blur-sm',
          'border-border-main/50 border backdrop-blur-xl',
          'transition-all duration-500 ease-in-out',
          'hover:border-border-main hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]',
        ].join(' ')}
      >
        <span className="animate-spark hover:bg-accent-light absolute z-20 hidden h-2 w-2 rounded-full opacity-100 group-hover:block"></span>

        <div className="absolute inset-0 bg-gradient-to-br via-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

        {/* Featured Badge */}
        <FeatureBadge featured={project.featured} />

        {/* Completed Badge */}
        <StateBadge completed={project.completed} />

        {/* Image Section */}
        <ProjectImage
          src={project.logo}
          url={project.url}
          urlGit={project.urlGit}
          id={project.id}
          threadhive={threadhive}
          className="aspect-square w-full max-w-[200px] justify-self-center"
        />

        {/* Card Content */}
        <div className="text-text-primary space-y-6 p-6">
          {/* Header */}
          <CardHeader date={t(project.date)} tags={project.tags} />

          {/* Project Text */}
          <ProjectText
            title={t(project.titleKey)}
            description={t(project.descriptionKey)}
          />

          {/* Technologies */}
          <Technologies technologies={project.technologies} />

          {/* Activity */}
          <Activity active={project.active} updated={t(project.updated)} />
        </div>
      </div>
    </div>
  );
}
