// comments in English
'use client';

import { useGithubActivity } from '@/Hooks/Github/useGithubActivity';
import DevMessageCard from './Components/Repos/Components/DevMessageCard/DevMessageCard';

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
  const { activity, hasMore, showMore: onShowMore, loading, error } = useGithubActivity({
    owner, repo, pageSize, refreshMs,
  });

  return (
    <div className={`relative w-full ${className}`}>
      <DevMessageCard isLoaded={true} isSignedIn={true} loading={loading} setLoading={() => {}} />

      <div
        className={`${padding} ${
          displayScrollbar
            ? '[&::-webkit-scrollbar]:w-[8px] [&::-webkit-scrollbar-thumb]:rounded-[4px] [&::-webkit-scrollbar-thumb]:bg-[#222] [&::-webkit-scrollbar-track]:bg-[#060010]'
            : 'no-scrollbar'
        }`}
      >
        {loading && <div className="py-6 text-center text-sm text-neutral-400">Loading…</div>}
        {error && <div className="py-2 text-center text-sm text-red-400">{error}</div>}
        {!loading && !error && activity.length === 0 && (
          <div className="py-6 text-center text-sm text-neutral-400">No activity.</div>
        )}

        <ul className="space-y-3">
          {activity.map((item) => (
            <li key={item.id}>
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="group block rounded-xl border border-neutral-800 bg-[#0d1117] p-4 transition-all duration-200 ease-in-out hover:scale-105 hover:bg-[#161b22]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-wide text-blue-300">{item.type}</div>
                    <div className="truncate text-sm text-neutral-200">{item.message}</div>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-neutral-400">
                      <span>{item.author}</span>
                      <span>•</span>
                      <span className="font-mono">{item.sha?.slice(0, 7)}</span>
                    </div>
                  </div>
                  <div className="shrink-0 text-xs text-neutral-400">{timeAgo(item.date)}</div>
                </div>
              </a>
            </li>
          ))}
        </ul>

        {showMore && !loading && !error && hasMore && (
          <div className="flex justify-center py-4">
            <button
              onClick={onShowMore}
              className="group flex cursor-pointer items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:scale-105 hover:from-violet-500 hover:to-blue-500"
            >
              <span>Show more</span>
              <svg className="h-4 w-4 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
