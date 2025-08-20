// comments in English
'use client';

import GitRepoCard from './GitRepoCard/GitRepoCard';
import DevMessageCard from '../DevMessageCard/DevMessageCard';
import { useGithubRepos } from '@/Hooks/Github/useGithubRepos';

export default function GitRepoAnimatedList({
  refreshMs = 1500000,
  displayScrollbar = false,
  padding,
  className = '',
  showMore,
  pageSizeNumber,
}) {
  const {
    visibleRepos,
    hasMore,
    showMore: onShowMore,
    loading,
    error: err,
  } = useGithubRepos({ pageSize: pageSizeNumber, refreshMs });

  return (
    <div className={`relative w-full ${className}`}>
      <DevMessageCard
        isLoaded={true}
        isSignedIn={true}
        loading={loading}
        setLoading={() => {}}
      />

      <div
        className={`${padding} ${
          displayScrollbar
            ? '[&::-webkit-scrollbar]:w-[8px] [&::-webkit-scrollbar-thumb]:rounded-[4px] [&::-webkit-scrollbar-thumb]:bg-[#222] [&::-webkit-scrollbar-track]:bg-[#060010]'
            : 'no-scrollbar'
        }`}
      >
        {loading && (
          <div className="text-text-secondary py-6 text-center text-sm">
            Loading…
          </div>
        )}
        {err && (
          <div className="py-2 text-center text-sm text-red-400">{err}</div>
        )}
        {!loading && !err && visibleRepos.length === 0 && (
          <div className="text-text-secondary py-6 text-center text-sm">
            No repositories.
          </div>
        )}
        {visibleRepos.map((repo, index) => (
          <GitRepoCard key={repo.id} repo={repo} index={index} />
        ))}
        {showMore && !loading && !err && hasMore && (
          <div className="flex justify-center py-4">
            <button
              onClick={onShowMore}
              className="group text-text-primary flex cursor-pointer items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-2.5 text-sm font-medium transition-all duration-200 hover:scale-105 hover:from-violet-500 hover:to-blue-500"
            >
              <span>Show more</span>
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
