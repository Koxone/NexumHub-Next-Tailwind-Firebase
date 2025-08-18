'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { useAuth } from '@clerk/nextjs';

// Clerk
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from '@clerk/nextjs';
import PulseSignInButton from './Features/Dashboard/Custom/PulseSignInButton';

// comments in English
function AnimatedItem({ children, index, onMouseEnter, onClick }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5, triggerOnce: false });

  return (
    <motion.div
      ref={ref}
      data-index={index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
      transition={{ duration: 0.2, delay: 0.05 }}
      className="mb-4 cursor-pointer"
    >
      {children}
    </motion.div>
  );
}

export default function GitHubReposList({
  refreshMs = 1500000, // polling interval
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

  // Pagination: show 5 and add 5 per click
  const PAGE_SIZE = 5;
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
    if (!isLoaded) return; // Esperar a que Clerk cargue

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
      {/* State Indicator */}
      {isSignedIn && (
        <div className="mb-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-300">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            Your repositories
          </span>
        </div>
      )}

      {/* Mensaje informativo para visitantes */}
      {!isSignedIn && !loading && (
        <PulseSignInButton>
          <div className="mb-4 rounded-lg border border-violet-500/20 bg-gradient-to-r from-violet-500/5 to-blue-500/5 p-4 text-center">
            {/* State Indicator */}
            <div className="mb-4 text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-300">
                {isSignedIn ? (
                  <>
                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                    Your repositories
                  </>
                ) : (
                  <>
                    <span className="h-2 w-2 rounded-full bg-violet-500"></span>
                    Developer's showcase
                  </>
                )}
              </span>
            </div>
            <div className="mb-2 flex items-center justify-center gap-2">
              <span className="text-lg">👋</span>
              <span className="text-sm font-medium text-violet-300">
                Welcome to my developer portfolio
              </span>
            </div>
            <p className="mb-3 text-sm text-neutral-300">
              You're currently viewing{' '}
              <span className="font-semibold text-violet-400">
                my projects and repositories
              </span>
              . Each one represents hours of passion, learning, and
              problem-solving.
            </p>
            <div className="flex items-center justify-center gap-1 text-xs text-neutral-400">
              <span>Want to showcase your own work?</span>

              <SignedOut>
                <SignInButton mode="modal">
                  <button className="cursor-pointer font-medium text-violet-400 underline underline-offset-2 transition-colors hover:text-violet-300">
                    Sign in
                  </button>
                </SignInButton>
              </SignedOut>
              <span>
                to connect your GitHub and see your repositories here.
              </span>
            </div>
          </div>
        </PulseSignInButton>
      )}

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
          <AnimatedItem
            key={repo.id}
            index={index}
            onMouseEnter={() => setSelectedIndex(index)}
            onClick={() => setSelectedIndex(index)}
          >
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="group block rounded-xl border border-neutral-800 bg-[#0d1117] p-4 transition-colors duration-200 hover:bg-[#161b22]"
            >
              <div className="mb-2 flex items-center justify-between">
                <h4 className="truncate text-base font-semibold text-white">
                  {repo.name}
                </h4>
                <span
                  className={`ml-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium uppercase ${
                    repo.private
                      ? 'bg-pink-600 text-white'
                      : 'bg-emerald-500 text-black'
                  }`}
                >
                  {repo.private ? 'private' : 'public'}
                </span>
              </div>

              <p className="line-clamp-2 text-sm text-neutral-300">
                {repo.description || 'No description available'}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-neutral-400">
                <span>⭐ {repo.stargazers_count}</span>
                <span>🍴 {repo.forks_count}</span>
                {repo.language && (
                  <span className="rounded-full bg-white/10 px-2 py-0.5">
                    {repo.language}
                  </span>
                )}
                <span className="ml-auto text-[11px]">
                  Updated {new Date(repo.updated_at).toLocaleDateString()}
                </span>
              </div>
            </a>
          </AnimatedItem>
        ))}

        {/* Show More Button */}
        {!loading && !err && hasMore && (
          <div className="flex justify-center py-4">
            <button
              onClick={onShowMore}
              className="group flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:scale-105 hover:from-violet-500 hover:to-blue-500 hover:shadow-lg hover:shadow-violet-500/25"
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
