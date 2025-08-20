// comments in English
'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export function useGithubActivity({ owner, repo, pageSize = 10, refreshMs = 1_500_000 }) {
  // state
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const timerRef = useRef(null);

  // fetch page
  const fetchPage = useCallback(async (p) => {
    if (!owner || !repo) return;
    setLoading(true); setErr('');
    try {
      const url = `/api/github/activity?owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(repo)}&per_page=${pageSize}&page=${p}`;
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) throw new Error(await res.text());
      const json = await res.json();
      const list = Array.isArray(json.items) ? json.items : [];
      setItems((prev) => (p === 1 ? list : [...prev, ...list]));
      setHasMore(!!json.has_next);
    } catch (e) {
      console.error(e);
      setErr('Failed to load activity.');
    } finally {
      setLoading(false);
    }
  }, [owner, repo, pageSize]);

  // init + refresh
  useEffect(() => {
    setPage(1);
    fetchPage(1);
  }, [fetchPage]);

  useEffect(() => {
    if (!refreshMs) return;
    timerRef.current = setInterval(() => {
      setPage(1);
      fetchPage(1);
    }, refreshMs);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [fetchPage, refreshMs]);

  // show more
  const showMore = useCallback(() => {
    if (!hasMore || loading) return;
    const next = page + 1;
    setPage(next);
    fetchPage(next);
  }, [page, hasMore, loading, fetchPage]);

  // memo
  const value = useMemo(() => ({
    activity: items,
    hasMore,
    showMore,
    loading,
    error: err,
  }), [items, hasMore, showMore, loading, err]);

  return value;
}
