import React from 'react';
import AnimatedItem from '@/Components/AnimatedItem/AnimatedItem';
import RepoName from './Components/RepoName';
import RepoLanguage from './Components/RepoLanguage';
import RepoVisibility from './Components/RepoVisibility';
import RepoDescription from './Components/RepoDescription';
import RepoStarsAndForks from './Components/RepoStarsAndForks';
import RepoTopics from './Components/RepoTopics';
import RepoDate from './Components/RepoDate';

function GitRepoCard({ repo, index, setSelectedIndex }) {
  const handleEnter = () => setSelectedIndex?.(index);
  const handleClick = () => setSelectedIndex?.(index);

  return (
    <AnimatedItem
      index={index}
      onMouseEnter={handleEnter}
      onClick={handleClick}
    >
      <a
        href={repo.html_url}
        target="_blank"
        rel="noreferrer"
        className={[
          'mobile group border-border-main/50 block max-w-[350px] rounded-xl border p-4 transition-all duration-200 ease-in-out hover:scale-105 hover:bg-slate-700/30',
          'sm:max-w-[340px]',
          'xl:max-w-[340px]',
          '2xl:max-w-none',
        ].join(' ')}
      >
        <div className="mb-2 flex items-center justify-between">
          {/* Repo Name */}
          <RepoName repo={repo} />

          <div className="flex items-center gap-2">
            {/* Code Language */}
            <RepoLanguage repo={repo} />

            {/* Visibility */}
            <RepoVisibility repo={repo} />
          </div>
        </div>

        {/* Description */}
        <RepoDescription repo={repo} />

        <div className="text-text-secondary mt-4 flex flex-wrap items-center gap-2 text-xs">
          {/* Stars and Forks */}
          <RepoStarsAndForks repo={repo} />

          {/* topics */}
          <RepoTopics repo={repo} />

          {/* Updated */}
          <RepoDate repo={repo} />
        </div>
      </a>
    </AnimatedItem>
  );
}

export default GitRepoCard;
