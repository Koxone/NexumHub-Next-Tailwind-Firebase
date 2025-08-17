import React from 'react';
import ProjectCard from './Components/ProjectCard';
import Title from '@/Components/Text/Title';

function LatestProjects() {
  return (
    <div className="flex flex-col gap-4 px-8">
      <Title title="Latest Projects" />
      <div className="no-scrollbar flex gap-2 overflow-x-auto">
        <ProjectCard src="fws.svg" color="bg-red-500/30" />
        <ProjectCard src="fws.svg" color="bg-red-500/30" />
        <ProjectCard src="TestigoMX.svg" color="bg-neutral-500/30" />
        <ProjectCard src="Learn-Frontend.svg" color="bg-blue-500/30" />
      </div>
    </div>
  );
}

export default LatestProjects;
