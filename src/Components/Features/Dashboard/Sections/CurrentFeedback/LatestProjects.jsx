import React from 'react';
import ProjectCard from './Components/ProjectCard';
import Title from '@/Components/Text/Title';

function LatestProjects() {
  return (
    <div className="flex flex-col gap-4 px-8">
      <Title title="Latest Projects" />
      <div className="grid w-full grid-cols-3 grid-rows-1 gap-2">
        <ProjectCard src="fws.svg" />
        <ProjectCard src="TestigoMX.svg" />
        <ProjectCard src="Learn-Frontend.svg" />
      </div>
    </div>
  );
}

export default LatestProjects;
