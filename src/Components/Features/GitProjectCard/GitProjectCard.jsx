// components/ProjectCard.js
'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import GitPopoverButton from '@/Components/PopOver/GitPopoverButton';

// Github
import { useGithubRepos } from '@/Hooks/Github/useGithubRepos';

export default function GitProjectCard({
  imageUrl = '',
  color = '',
  path = '/projects/open',
  blockClick = false,
  className = '',
  alt = 'Project Logo',
  onDelete,
}) {
  const router = useRouter();

  // Github
  const { repos, loading, error } = useGithubRepos();

  if (loading) return <p>Loading…</p>;
  if (error) return <p>{error}</p>;
  if (!repos.length) return <p>No repos.</p>;

  const handleClick = () => {
    if (!blockClick) router.push(path);
  };

  return (
    <div
      onClick={handleClick}
      className={`flex aspect-square max-h-[300px] w-full max-w-[300px] shrink-0 flex-col justify-between rounded-lg border ${color} p-4 ${className}`}
    >
      <div
        data-nodrag="true"
        className="flex items-center justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <GitPopoverButton onClick={onDelete} />
      </div>

      <div
        data-nodrag="true"
        className="group relative w-full flex-1 cursor-pointer"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={alt}
            fill
            sizes="320px"
            priority
            draggable={false}
            className="object-contain transition-all duration-300 ease-in-out group-hover:scale-110"
          />
        ) : (
          <div className="text-text-secondary flex h-full w-full items-center justify-center text-xs">
            No image
          </div>
        )}
      </div>
    </div>
  );
}
