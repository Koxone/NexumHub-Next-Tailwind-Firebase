// components/ProjectCard.js
'use client';

import React from 'react';
import MenuButton from './MenuButton';
import ProgressBar from './ProgressBar';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ProjectCard({
  imageUrl = '',
  color = '',
  path = '/projects/open',
  blockClick = false,
  className = '',
  alt = 'Project Logo',
}) {
  const router = useRouter();

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
        <MenuButton />
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
          <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
            No image
          </div>
        )}
      </div>

      <ProgressBar />
    </div>
  );
}
