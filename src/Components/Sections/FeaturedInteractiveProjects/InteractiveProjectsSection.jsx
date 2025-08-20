'use client';

import { useState } from 'react';
import React from 'react';
import InteractiveProjectCard from '@/Components/Features/InteractiveProjectCard/InteractiveProjectCard';

function InteractiveProjectsSection({ className = '' }) {
  // state
  const [currentIndex, setCurrentIndex] = useState(0);

  // data
  const cards = ['fws', 'sacbe', 'couponGenerator'];

  // chunk by 2
  const frames = [];
  for (let i = 0; i < cards.length; i += 2) {
    frames.push(cards.slice(i, i + 2));
  }

  // handlers
  const handleNext = () => setCurrentIndex((i) => (i + 1) % frames.length);

  return (
    <div
      id="projects"
      className={`relative ${className} w-full gap-4 lg:flex lg:flex-col`}
    >
      {/* Card Slider for MD */}
      <div className="relative hidden md:block xl:hidden">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {frames.map((pair, idx) => (
              <div key={idx} className="min-w-full">
                <div className="grid grid-cols-2 justify-items-center gap-6">
                  <InteractiveProjectCard projectKey={pair[0]} />
                  {pair[1] ? (
                    <InteractiveProjectCard projectKey={pair[1]} />
                  ) : (
                    <div className="pointer-events-none opacity-0">
                      <InteractiveProjectCard projectKey={pair[0]} />
                    </div>
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
          className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer rounded-full bg-white/80 p-2 shadow-md transition hover:bg-blue-400 hover:text-white"
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

      {/* Cards Desktop */}
      <div className="hidden grid-cols-3 gap-10 lg:grid">
        <InteractiveProjectCard projectKey="testigoMX" />
        <InteractiveProjectCard projectKey="fws" />
        <InteractiveProjectCard projectKey="couponGenerator" />
        <InteractiveProjectCard projectKey="learn" />
      </div>
    </div>
  );
}

export default InteractiveProjectsSection;
