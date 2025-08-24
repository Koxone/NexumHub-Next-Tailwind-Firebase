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
        setChunkSize(3); // 2xl → 3 cards
      } else {
        setChunkSize(2); // xl y menor → 2 cards
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // data
  const cards = ['testigoMX', 'fws', 'couponGenerator', 'testigoMX'];

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
        'mobile relative w-full gap-4 overflow-visible overflow-x-auto',
        className,
        'sm:',
        'md:',
        'lg:flex lg:flex-col',
        'xl:',
        '2xl:',
      ].join(' ')}
    >
      {/* Card Slider for XL */}
      <div
        className={[
          'mobile relative hidden',
          'sm:',
          'md:block',
          'lg:',
          'xl:grid xl:grid-cols-[1fr_40px]',
          '2xl:grid 2xl:grid-cols-[1fr_40px] gap-2',
        ].join(' ')}
      >
        {/* Cards Container */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {frames.map((frame, idx) => (
              <div key={idx} className="min-w-full">
                {/* Cards Quantity Rendered */}
                <div
                  className={[
                    'mobile grid justify-items-center gap-6',
                    'sm:',
                    'md:',
                    'lg:',
                    'xl:grid-cols-2',
                    '2xl:grid-cols-3',
                  ].join(' ')}
                >
                  {frame.map((project) => (
                    <InteractiveProjectCard
                      key={project}
                      projectKey={project}
                    />
                  ))}

                  {/* relleno si faltan para completar frame */}
                  {Array.from({ length: chunkSize - frame.length }).map(
                    (_, idx) => (
                      <div key={idx} className="pointer-events-none opacity-0">
                        <InteractiveProjectCard projectKey={frame[0]} />
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chevron */}
        <button
          onClick={handleNext}
          aria-label="Next projects"
          className={[
            'mobile hover:text-text-primary hover:bg-accent-light absolute top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white/80 p-2 shadow-md transition',
            'sm:',
            'md:',
            'lg:',
            'xl:',
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
