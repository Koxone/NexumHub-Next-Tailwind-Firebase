import React from 'react';
import { useAuth } from '@clerk/nextjs';
import GitRepoAnimatedList from './Components/GitRepoAnimatedList/GitRepoAnimatedList';

function GithubRepos({ padding }) {
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <div className="flex flex-col">
      <div className="flex justify-between"></div>
      <div className="grid h-full auto-rows-auto gap-2">
        <GitRepoAnimatedList
          padding={padding}
          showMore={true}
          pageSizeNumber={4}
        />
      </div>
    </div>
  );
}

export default GithubRepos;
