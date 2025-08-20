import React from 'react';
import TechStackCard from './TechStackCard';
import ProjectLinksCard from './ProjectLinksCard';
import GitRepoAnimatedList from '@/Components/Features/Github/Components/Repos/Components/GitRepoAnimatedList/GitRepoAnimatedList';
import GitRepoActivityList from '@/Components/Features/Github/GitRepoActivityList';
import repoMap from '@/Data/Projects/repoMap';

const ProjectSidebar = ({ technologies, projectId, url, urlGit, pageSize }) => {
  return (
    <div className="grid grid-rows-[auto_auto_1fr] space-y-8">
      <TechStackCard technologies={technologies} />
      <ProjectLinksCard url={url} urlGit={urlGit} />
      {/* <GitRepoAnimatedList pageSizeNumber={pageSize} showMore /> */}
      <GitRepoActivityList
        owner="Koxone"
        pageSize={5}
        refreshMs={300000}
        showMore
        repo={repoMap[projectId]}
        padding="py-3"
      />
    </div>
  );
};

export default ProjectSidebar;
