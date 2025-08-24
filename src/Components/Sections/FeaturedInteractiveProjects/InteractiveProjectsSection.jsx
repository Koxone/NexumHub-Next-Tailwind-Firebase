'use client';

import { useState, useEffect } from 'react';
import React from 'react';
import InteractiveProjectCard from '@/Components/Features/InteractiveProjectCard/InteractiveProjectCard';

function InteractiveProjectsSection({ className = '' }) {
  // state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [chunkSize, setChunkSize] = useState(2);

  // detectar breakpoint
  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth >= 1536) {
        setChunkSize(2);
      } else if (window.innerWidth >= 1280) {
        setChunkSize(2);
      } else if (window.innerWidth >= 1024) {
        setChunkSize(1);
      } else if (window.innerWidth >= 768) {
        setChunkSize(2);
      } else {
        setChunkSize(1);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // data
  const cards = ['fws', 'testigoMX', 'couponGenerator', 'testigoMX'];

  // frames dinámicos
  const frames = [];
  for (let i = 0; i < cards.length; i += chunkSize) {
    frames.push(cards.slice(i, i + chunkSize));
  }

  // handlers
  const handleNext = () => setCurrentIndex((i) => (i + 1) % frames.length);

  return (
    <div
      id="projects"
      className={[
        'mobile relative w-full gap-4 transition-all duration-300 ease-in-out',
        className,
        'sm:',
        'md:',
        'lg:flex lg:flex-col',
        'xl:',
        '2xl:',
      ].join(' ')}
    >
      {/* Card Slider for XL/2XL */}
      <div
        className={[
          'mobile relative hidden',
          'sm:',
          'md:grid md:grid-cols-[1fr_40px]',
          'lg:grid lg:grid-cols-[1fr_40px]',
          'xl:grid xl:grid-cols-[1fr_40px]',
          'gap-2 2xl:grid 2xl:grid-cols-[1fr_40px]',
        ].join(' ')}
      >
        {/* Cards visibles */}
        <div
          className={[
            'mobile grid justify-items-center gap-6',
            'sm:',
            'md:grid-cols-2',
            'lg:grid-cols-1',
            'xl:grid-cols-2',
            '2xl:grid-cols-2',
          ].join(' ')}
        >
          {frames[currentIndex].map((project) => (
            <InteractiveProjectCard key={project} projectKey={project} />
          ))}

          {/* relleno si faltan para completar frame */}
          {Array.from({
            length: chunkSize - frames[currentIndex].length,
          }).map((_, idx) => (
            <div key={idx} className="pointer-events-none opacity-0">
              <InteractiveProjectCard projectKey={frames[currentIndex][0]} />
            </div>
          ))}
        </div>

        {/* Chevron */}
        <button
          onClick={handleNext}
          aria-label="Next projects"
          className={[
            'mobile hover:text-text-primary hover:bg-accent-light absolute top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white/80 p-2 shadow-md transition-all duration-200 ease-in-out',
            'sm:',
            'md:',
            'lg:',
            'xl: right-0',
            '2xl: right-0',
          ].join(' ')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default InteractiveProjectsSection;
