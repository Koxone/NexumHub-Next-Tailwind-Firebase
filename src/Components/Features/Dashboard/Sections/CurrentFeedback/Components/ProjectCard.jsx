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
      // onClick={() => router.push(`/projects/${path}`)}
      className={`grid aspect-square grid-cols-1 grid-rows-[auto_1fr_auto] rounded-lg border ${color} p-4`}
    >
      {/* Avatars and Menu Button */}
      <div className="flex h-fit items-center justify-between">
        <Avatars />
        <MenuButton />
      </div>

      {/* Project Image */}
      <div className="group relative h-full w-full max-w-[200px] cursor-pointer justify-self-center">
        <Image
          src={`/Images/Logos/${src}`}
          alt="Project Logo"
          fill
          sizes="100px"
          priority
          className="object-contain transition-all duration-300 ease-in-out group-hover:scale-110"
        />
      </div>

      {/* Progress Bar */}
      <ProgressBar />
    </div>
  );
}
