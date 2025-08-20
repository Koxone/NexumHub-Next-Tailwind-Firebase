// comments in English
'use client';

import { useGithubActivity } from '@/Hooks/Github/useGithubActivity';
import DevMessageCard from './Components/Repos/Components/DevMessageCard/DevMessageCard';
import { Github } from 'lucide-react';

function timeAgo(iso) {
  if (!iso) return 'N/A';
  const t = new Date(iso).getTime();
  const s = Math.floor((Date.now() - t) / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d`;
  const mo = Math.floor(d / 30);
  if (mo < 12) return `${mo}mo`;
  const y = Math.floor(mo / 12);
  return `${y}y`;
}

export default function GitRepoActivityList({
  owner,
  repo,
  pageSize = 10,
  refreshMs = 1_500_000,
  displayScrollbar = false,
  padding,
  className = '',
  showMore,
}) {
  const {
    activity,
    hasMore,
    showMore: onShowMore,
    loading,
    error,
  } = useGithubActivity({
    owner,
    repo,
    pageSize,
    refreshMs,
  });

  return (
    <div className={`relative w-full max-w-[462px] ${className}`}>
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
        {error && (
          <div className="py-2 text-center text-sm text-red-400">{error}</div>
        )}
        {!loading && !error && activity.length === 0 && (
          <div className="text-text-secondary py-6 text-center text-sm">
            No activity.
          </div>
        )}

        <ul className="backdrop-lg text-text-primary border-border-main/50 space-y-4 rounded-xl border p-6 shadow backdrop-blur-sm">
          <h3 className="cur text-text-primary flex items-center gap-3 text-xl font-bold">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20">
              <Github className="text-blue-400" />
            </div>
            Project Real Time Activity
          </h3>
          {activity.map((item) => (
            <li key={item.id}>
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="group border-border-main/50 block rounded-xl border p-4 transition-all duration-200 ease-in-out hover:scale-105 hover:bg-blue-500/20"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-xs tracking-wide text-blue-300 uppercase">
                      {item.type}
                    </div>
                    <div className="truncate text-sm text-neutral-200">
                      {item.message}
                    </div>
                    <div className="text-text-secondary mt-1 flex flex-wrap items-center gap-2 text-xs">
                      <span>{item.author}</span>
                      <span>•</span>
                      <span className="font-mono">{item.sha?.slice(0, 7)}</span>
                    </div>
                  </div>
                  <div className="text-text-secondary shrink-0 text-xs">
                    {timeAgo(item.date)}
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>

        {showMore && !loading && !error && hasMore && (
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
