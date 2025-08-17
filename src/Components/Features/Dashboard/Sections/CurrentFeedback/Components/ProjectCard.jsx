'use client';

import React from 'react';
import Avatars from './Avatars';
import MenuButton from './MenuButton';
import ProgressBar from './ProgressBar';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ProjectCard({ src = '', color = '', path }) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/projects/open`)}
      className={`flex aspect-square max-h-[300px] w-full max-w-[300px] shrink-0 flex-col justify-between rounded-lg border ${color} p-4`}
    >
      {/* Avatars and Menu Button */}
      <div className="flex items-center justify-between">
        {/* <Avatars /> */}
        <MenuButton />
      </div>

      {/* Project Image */}
      <div className="group relative w-full flex-1 cursor-pointer">
        <Image
          src={`/Images/Logos/${src}`}
          alt="Project Logo"
          fill
          sizes="200px"
          priority
          className="object-contain transition-all duration-300 ease-in-out group-hover:scale-110"
        />
      </div>

      {/* Progress Bar */}
      <ProgressBar />
    </div>
  );
}
