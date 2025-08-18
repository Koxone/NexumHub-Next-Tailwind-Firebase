import React from 'react';
import AnimatedItem from '@/Components/AnimatedItem/AnimatedItem';

function GitRepoCard({ repo, index, setSelectedIndex }) {
  // comments in English
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
        className="group block rounded-xl border border-neutral-800 bg-[#0d1117] p-4 transition-colors duration-200 hover:bg-[#161b22]"
      >
        <div className="mb-2 flex items-center justify-between">
          {/* Repo Name */}
          <h4 className="truncate text-base font-semibold text-white">
            {repo.name}
          </h4>

          <div>
            {/* Code Language */}
            {repo.language && (
              <span className="rounded-full bg-blue-500 px-2 py-0.5 text-xs">
                {repo.language}
              </span>
            )}

            {/* Visibility */}
            <span
              className={`ml-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                repo.private
                  ? 'bg-pink-600 text-white'
                  : 'bg-emerald-500 text-black'
              }`}
            >
              {repo.private ? 'private' : 'public'}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="line-clamp-2 text-sm text-neutral-300">
          {repo.description || 'No description available'}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-neutral-400">
          {/* Stars and Forks */}
          <div>
            <span>⭐ {repo.stargazers_count}</span>
            <span>🍴 {repo.forks_count}</span>
          </div>

          {/* topics */}
          {Array.isArray(repo.topics) &&
            repo.topics.slice(0, 6).map((t) => (
              <span
                key={t}
                className="rounded-full bg-violet-500/15 px-2 py-0.5 text-violet-300 capitalize"
              >
                {t}
              </span>
            ))}

          {repo.topics?.length > 6 && (
            <span className="rounded-full bg-white/10 px-2 py-0.5">
              +{repo.topics.length - 6}
            </span>
          )}

          {/* Updated */}
          <span className="ml-auto text-[11px]">
            Updated {new Date(repo.updated_at).toLocaleDateString()}
          </span>
        </div>
      </a>
    </AnimatedItem>
  );
}

export default GitRepoCard;
