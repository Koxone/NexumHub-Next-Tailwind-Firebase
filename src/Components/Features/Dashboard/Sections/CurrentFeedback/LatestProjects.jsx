import React from 'react';
import ProjectCard from './Components/ProjectCard';
import Title from '@/Components/Text/Title';

function LatestProjects() {
  return (
    <div className="flex flex-col gap-4 px-8">
      <Title title="Latest Projects" />
      <div className="grid w-full grid-cols-3 grid-rows-1 gap-2">
        <ProjectCard src="fws.svg" color="bg-red-500/30" />
        <ProjectCard src="TestigoMX.svg" color="bg-neutral-500/30" />
        <ProjectCard src="Learn-Frontend.svg" color="bg-blue-500/30" />
      </div>
    </div>
  );
}

export default LatestProjects;
