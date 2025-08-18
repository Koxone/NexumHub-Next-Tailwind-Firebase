'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';

// Clerk
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from '@clerk/nextjs';

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
  refreshMs = 15000,
  displayScrollbar = false,
  showGradients = false,
  className = '',
}) {
  const listRef = useRef(null);
  const [repos, setRepos] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  // Pagination: show 5 and add 5 per click
  // comments in English
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
      setErr('No se pudieron cargar los repos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    if (refreshMs > 0) {
      const t = setInterval(load, refreshMs);
      return () => clearInterval(t);
    }
  }, [refreshMs]);

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
            Cargando repos…
          </div>
        )}

        {err && (
          <div className="py-2 text-center text-sm text-red-400">{err}</div>
        )}

        {!loading && !err && visibleRepos.length === 0 && (
          <div className="py-6 text-center text-sm text-neutral-400">
            No hay repos para mostrar
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
                {repo.description || 'Sin descripción'}
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
                  Actualizado {new Date(repo.updated_at).toLocaleDateString()}
                </span>
              </div>
            </a>
          </AnimatedItem>
        ))}

        {/* Ver más */}
        {!loading && !err && hasMore && (
          <div className="flex justify-center py-3">
            <button
              onClick={onShowMore}
              className="cursor-pointer rounded-md bg-[#354f7c] px-4 py-2 text-sm text-white hover:bg-[#2a3f61]"
            >
              More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
