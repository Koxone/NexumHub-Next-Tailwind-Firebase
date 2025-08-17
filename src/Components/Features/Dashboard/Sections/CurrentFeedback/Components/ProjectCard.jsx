'use client';

import React from 'react';
import MenuButton from './MenuButton';
import ProgressBar from './ProgressBar';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ProjectCard({
  src = '',
  color = '',
  path,
  blockClick = false,
  className = '',
}) {
  const router = useRouter();

  const handleClick = () => {
    if (!blockClick) router.push('/projects/open');
  };

  return (
    <div
      onClick={handleClick}
      className={`flex aspect-square w-full max-w-[300px] max-h-[300px] shrink-0 flex-col justify-between rounded-lg border ${color} p-4 ${className} `}
    >
      <div data-nodrag="true" className="flex items-center justify-between">
        <MenuButton />
      </div>

      <div
        data-nodrag="true"
        className="group relative w-full flex-1 cursor-pointer"
      >
        <Image
          src={`/Images/Logos/${src}`}
          alt="Project Logo"
          fill
          sizes="320px"
          priority
          draggable={false}
          className="object-contain transition-all duration-300 ease-in-out group-hover:scale-110"
        />
      </div>

      <ProgressBar />
    </div>
  );
}
