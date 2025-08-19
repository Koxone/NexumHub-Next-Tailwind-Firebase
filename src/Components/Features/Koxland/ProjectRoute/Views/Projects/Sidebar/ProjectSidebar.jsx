import React from 'react';
import TechStackCard from './TechStackCard';
import ProjectLinksCard from './ProjectLinksCard';

const ProjectSidebar = ({ technologies, url, urlGit }) => {
  return (
    <div className="space-y-8">
      <TechStackCard technologies={technologies} />
      <ProjectLinksCard url={url} urlGit={urlGit} />
    </div>
  );
};

export default ProjectSidebar;
