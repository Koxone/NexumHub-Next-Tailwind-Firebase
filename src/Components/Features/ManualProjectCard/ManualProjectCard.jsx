// components/ProjectCard.js
'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import GitPopoverButton from '@/Components/PopOver/GitPopoverButton';

export default function ManualProjectCard({
  src = '',
  color = '',
  path = '/projects/open',
  blockClick = false,
  className = '',
  alt = 'Project Logo',
  description,
  stack,
}) {
  const router = useRouter();

  const handleClick = () => {
    if (!blockClick) router.push(path);
  };

  return (
    <div
      onClick={handleClick}
      className={`border-border-main/50 flex aspect-square max-h-[300px] w-full max-w-[300px] shrink-0 flex-col justify-between rounded-lg border ${color} p-4 ${className}`}
    >
      <div
        data-nodrag="true"
        className="flex items-center justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-text-primary ml-2 inline-block rounded-full bg-green-600 px-2 py-0.5 text-xs font-medium uppercase">
          Production Ready
        </p>
      </div>
      <div
        data-nodrag="true"
        className="group relative w-full flex-1 cursor-pointer"
      >
        {src ? (
          <Image
            src={src}
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
      <div>
        <p className="mt-2 max-w-[28ch] text-center text-sm leading-snug tracking-tight text-gray-300">
          {description}
          <span className="text-gray text-sm-300 rounded-full bg-violet-500/15 px-2 py-0.5">
            {stack}
          </span>
        </p>
      </div>
    </div>
  );
}
