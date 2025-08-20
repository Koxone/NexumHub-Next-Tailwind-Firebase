import React from 'react';
import TechStackCard from './TechStackCard';
import ProjectLinksCard from './ProjectLinksCard';
import GitRepoAnimatedList from '@/Components/Features/Github/Components/Repos/Components/GitRepoAnimatedList/GitRepoAnimatedList';

const ProjectSidebar = ({ technologies, url, urlGit, pageSize }) => {
  return (
    <div className="grid grid-rows-[auto_auto_1fr] space-y-8 ">
      <TechStackCard technologies={technologies} />
      <ProjectLinksCard url={url} urlGit={urlGit} />
      <GitRepoAnimatedList pageSizeNumber={pageSize} showMore />
    </div>
  );
};

export default ProjectSidebar;
