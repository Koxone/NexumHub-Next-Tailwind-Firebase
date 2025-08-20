// comments in English
'use client';

import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { useAuth } from '@clerk/nextjs';

// --- Helpers: build logo urls ---
function buildPublicLogoUrl(owner, repo, branch, updatedAt) {
  const base = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/.github/logo.svg`;
  return updatedAt ? `${base}?t=${encodeURIComponent(updatedAt)}` : base;
}

function buildPrivateLogoUrl(owner, repo, ref) {
  const qs = new URLSearchParams({
    owner,
    repo,
    ref: ref || 'main',
  }).toString();
  return `/api/github/private-logo?${qs}`;
}

// --- Hook: fetch, enrich, paginate, auto-refresh, filter by visibility ---
export function useGithubRepos({
  pageSize = 4,
  refreshMs = 0,
  visibility = 'all',
} = {}) {
  const { isLoaded, isSignedIn } = useAuth();
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const timerRef = useRef(null);

  // Fetch once (and on auth or visibility change)
  const load = useCallback(async () => {
    try {
      setError('');
      setLoading(true);

      // sanitize visibility
      const vis =
        visibility === 'public' || visibility === 'private'
          ? visibility
          : 'all';

      // call your API with the filter
      const endpoint = `/api/github/repos?visibility=${vis}`;
      const res = await fetch(endpoint, { cache: 'no-store' });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();

      // Enrich with logo_url if API doesn't provide it
      const enriched = data.map((r) => {
        const owner = r.owner_login || r.owner?.login;
        const branch = r.default_branch || 'main';
        const logoUrl = r.private
          ? buildPrivateLogoUrl(owner, r.name, branch)
          : buildPublicLogoUrl(owner, r.name, branch, r.updated_at);
        return { ...r, logo_url: r.logo_url || logoUrl };
      });

      setRepos(enriched);
      // Keep user "show more" but clamp to length
      setVisibleCount((prev) =>
        Math.min(Math.max(prev, pageSize), enriched.length || pageSize)
      );
    } catch (e) {
      console.error(e);
      setError(
        isSignedIn
          ? 'Unable to load your repositories.'
          : 'Unable to load portfolio repositories.'
      );
    } finally {
      setLoading(false);
    }
  }, [isSignedIn, pageSize, visibility]);

  useEffect(() => {
    if (!isLoaded) return;

    load();
    if (refreshMs > 0) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(load, refreshMs);
      return () => clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isLoaded, isSignedIn, refreshMs, visibility, load]);

  // Pagination helpers
  const visibleRepos = useMemo(
    () => repos.slice(0, visibleCount),
    [repos, visibleCount]
  );
  const hasMore = visibleCount < repos.length;
  const showMore = () =>
    setVisibleCount((c) => Math.min(c + pageSize, repos.length));

  // Public API
  return {
    repos, // full list (already enriched with logo_url)
    visibleRepos, // paginated slice
    hasMore,
    showMore,
    loading,
    error,
    reload: load,
  };
}

// How to use it

// const { repos, loading, error } = useGithubRepos({ visibility: 'public' });
// const { repos, loading, error } = useGithubRepos({ visibility: 'private' });
// const { repos, loading, error } = useGithubRepos({ visibility: 'all' });

// if (loading) return <p>Loading…</p>;
// if (error) return <p>{error}</p>;
// if (!repos.length) return <p>No repos.</p>;
