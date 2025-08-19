import React from 'react';
import { CalendarIcon } from '../../Icons/LucideIcons';
import StatsGrid from '../../Views/Projects/ProjectStats/StatsGrid';
import ProjectButtons from '../../Buttons/ProjectButtons';
import ProjectShowcase from '../../Views/Projects/ProjectImage/ProjectShowcase';

const HeroSection = ({
  tags,
  date,
  titleKey,
  descriptionKey,
  status,
  teamSize,
  technologies,
  demo,
  code,
  src,
  alt,
  gallery,
  slideshow,
  srcSlide,
}) => {
  return (
    <section className="relative max-w-[1200px] justify-self-center overflow-hidden py-10">
      <div className="relative container mx-auto px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center rounded-md border border-blue-500/20 bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-400 shadow-sm"
                    >
                      {tag}
                    </div>
                  ))}
                </div>

                {/* Date */}
                <div className="flex items-center text-sm text-slate-400">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date}
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl leading-tight font-bold tracking-tight lg:text-3xl">
                <span className="bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent">
                  {titleKey}
                </span>
              </h1>
              <p className="text-base leading-relaxed text-slate-300">
                {descriptionKey}
              </p>
            </div>

            {/* Stats */}
            <StatsGrid
              status={status}
              teamSize={teamSize}
              technologies={technologies}
            />

            {/* Action Buttons */}
            <ProjectButtons code={code} demo={demo} />
          </div>

          <ProjectShowcase
            src={src}
            alt={alt}
            gallery={gallery}
            slideshow={slideshow}
            srcSlide={srcSlide}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
