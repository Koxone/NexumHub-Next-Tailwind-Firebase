// comments in English
'use client';

import React, { useMemo } from 'react';
import { useGithubRepos } from '@/Hooks/Github/useGithubRepos';
import GitProjectCard from '@/Components/Features/GitProjectCard/GitProjectCard';

// Images by Github Repositorie
const REPO_NAMES = [''];

// Images by URL
const IMAGE_URLS = [];

export default function GitFeatureProjects() {
  const { repos, loading, error } = useGithubRepos({ visibility: 'all' });

  const byName = useMemo(
    () => Object.fromEntries(repos.map((r) => [r.name, r.logo_url])),
    [repos]
  );

  if (loading) return <p>Loading…</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex gap-4">
      {REPO_NAMES.map((name) => {
        const logo = byName[name] || '';
        return (
          <GitProjectCard
            key={`repo:${name}`}
            imageUrl={logo}
            color="border-gray-700"
            path={`/projects/open?repo=${encodeURIComponent(name)}`}
            alt={name}
          />
        );
      })}

      {IMAGE_URLS.map((item, i) => {
        const url = typeof item === 'string' ? item : item.url;
        const alt =
          typeof item === 'string'
            ? `Image ${i + 1}`
            : item.alt || `Image ${i + 1}`;
        return (
          <GitProjectCard
            key={`url:${i}`}
            imageUrl={url}
            color="border-gray-700"
            path={`/projects/open?image=${encodeURIComponent(url)}`}
            alt={alt}
          />
        );
      })}
    </div>
  );
}
