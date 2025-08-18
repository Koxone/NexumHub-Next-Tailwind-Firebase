'use client';

import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@clerk/nextjs';

import GitRepoCard from './GitRepoCard/GitRepoCard';
import DevMessageCard from '../DevMessageCard/DevMessageCard';

export default function GitRepoAnimatedList({
  refreshMs = 1500000,
  displayScrollbar = false,
  showGradients = false,
  className = '',
}) {
  const { isSignedIn, isLoaded } = useAuth();
  const listRef = useRef(null);
  const [repos, setRepos] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  // Pagination: show 3
  const PAGE_SIZE = 3;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const [topOpacity, setTopOpacity] = useState(0);
  const [bottomOpacity, setBottomOpacity] = useState(1);

  const handleScroll = (e) => {
    if (!showGradients) return;
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    setTopOpacity(Math.min(scrollTop / 50, 1));
    const bottomDistance = scrollHeight - (scrollTop + clientHeight);
    setBottomOpacity(
      scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1)
    );
  };

  const load = async () => {
    try {
      setErr('');
      const res = await fetch('/api/github/repos', { cache: 'no-store' });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setRepos(data);
      // Clamp visible count to current data length while preserving user "see more" state
      setVisibleCount((prev) =>
        Math.min(Math.max(prev, PAGE_SIZE), data.length || PAGE_SIZE)
      );
    } catch (e) {
      console.error(e);
      setErr(
        isSignedIn
          ? 'Unable to load your repositories.'
          : 'Unable to load portfolio repositories.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoaded) return;

    load();
    if (refreshMs > 0) {
      const t = setInterval(load, refreshMs);
      return () => clearInterval(t);
    }
  }, [isSignedIn, isLoaded, refreshMs]);

  const scrollStyle = displayScrollbar
    ? {}
    : { scrollbarWidth: 'none', msOverflowStyle: 'none' };

  const visibleRepos = repos.slice(0, visibleCount);
  const hasMore = visibleCount < repos.length;

  const onShowMore = () => {
    setVisibleCount((c) => Math.min(c + PAGE_SIZE, repos.length));
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Developer Message */}
      <DevMessageCard
        isLoaded={isLoaded}
        isSignedIn={isSignedIn}
        loading={loading}
        setLoading={setLoading}
      />

      <div
        ref={listRef}
        className={`overflow-y-auto ${
          displayScrollbar
            ? '[&::-webkit-scrollbar]:w-[8px] [&::-webkit-scrollbar-thumb]:rounded-[4px] [&::-webkit-scrollbar-thumb]:bg-[#222] [&::-webkit-scrollbar-track]:bg-[#060010]'
            : 'no-scrollbar'
        }`}
        style={scrollStyle}
        onScroll={handleScroll}
      >
        {!displayScrollbar && (
          <style>{`.no-scrollbar::-webkit-scrollbar{display:none}`}</style>
        )}

        {loading && (
          <div className="py-6 text-center text-sm text-neutral-400">
            {isSignedIn
              ? 'Loading your repositories…'
              : 'Loading developer portfolio…'}
          </div>
        )}

        {err && (
          <div className="py-2 text-center text-sm text-red-400">{err}</div>
        )}

        {!loading && !err && visibleRepos.length === 0 && (
          <div className="py-6 text-center text-sm text-neutral-400">
            {isSignedIn
              ? 'No repositories found.'
              : 'No repositories to display.'}
          </div>
        )}

        {visibleRepos.map((repo, index) => (
          <GitRepoCard
            key={repo.id}
            repo={repo}
            index={index}
            setSelectedIndex={setSelectedIndex}
          />
        ))}

        {/* Show More Button */}
        {!loading && !err && hasMore && (
          <div className="flex justify-center py-4">
            <button
              onClick={onShowMore}
              className="group flex cursor-pointer items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:scale-105 hover:from-violet-500 hover:to-blue-500"
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
