import ProjectCard from '@/Components/Features/Dashboard/Sections/CurrentFeedback/Components/ProjectCard';
import TopBar from '@/Components/Features/Dashboard/Sections/Topbar/TopBar';
import Title from '@/Components/Text/Title';
import React from 'react';

export default function Projects() {
  return (
    <div className="flex min-h-0 w-full max-w-[1200px] flex-col gap-4 justify-self-center overflow-hidden px-8">
      <TopBar padding="pt-8 pb-4" />
      <div className="flex flex-col gap-4 overflow-y-auto">
        <Title title="All Projects" />
        <div className="mx-auto grid w-full max-w-[1200px] flex-1 grid-cols-2 gap-4 pb-8 lg:grid-cols-3 xl:grid-cols-4">
          <ProjectCard src="fws.svg" color="bg-red-500/30" />
          <ProjectCard src="TestigoMX.svg" color="bg-neutral-500/30" />
          <ProjectCard src="Learn-Frontend.svg" color="bg-blue-500/30" />
          <ProjectCard src="fws.svg" color="bg-red-500/30" />
          <ProjectCard src="TestigoMX.svg" color="bg-neutral-500/30" />
          <ProjectCard src="Learn-Frontend.svg" color="bg-blue-500/30" />
          <ProjectCard src="fws.svg" color="bg-red-500/30" />
          <ProjectCard src="TestigoMX.svg" color="bg-neutral-500/30" />
          <ProjectCard src="Learn-Frontend.svg" color="bg-blue-500/30" />
          <ProjectCard src="fws.svg" color="bg-red-500/30" />
          <ProjectCard src="TestigoMX.svg" color="bg-neutral-500/30" />
          <ProjectCard src="Learn-Frontend.svg" color="bg-blue-500/30" />
          <ProjectCard src="fws.svg" color="bg-red-500/30" />
          <ProjectCard src="TestigoMX.svg" color="bg-neutral-500/30" />
          <ProjectCard src="Learn-Frontend.svg" color="bg-blue-500/30" />
          <ProjectCard src="fws.svg" color="bg-red-500/30" />
          <ProjectCard src="TestigoMX.svg" color="bg-neutral-500/30" />
          <ProjectCard src="Learn-Frontend.svg" color="bg-blue-500/30" />
        </div>
      </div>
    </div>
  );
}
