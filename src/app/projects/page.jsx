'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

import ProjectCard from '@/Components/Features/Dashboard/Sections/CurrentFeedback/Components/ProjectCard';
import TopBar from '@/Components/Features/Dashboard/Sections/Topbar/TopBar';
import Title from '@/Components/Text/Title';

function AnimatedItem({ children, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.35, once: false });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.7, opacity: 0, y: 8 }}
      animate={
        inView
          ? { scale: 1, opacity: 1, y: 0 }
          : { scale: 0.7, opacity: 0, y: 8 }
      }
      transition={{
        duration: 0.22,
        delay: 0.01 * index,
        ease: 'easeOut',
      }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
}

export default function Projects() {
  const cards = [
    { src: 'fws.svg', color: 'bg-red-500/30' },
    { src: 'TestigoMX.svg', color: 'bg-neutral-500/30' },
    { src: 'Learn-Frontend.svg', color: 'bg-blue-500/30' },
    { src: 'fws.svg', color: 'bg-red-500/30' },
    { src: 'TestigoMX.svg', color: 'bg-neutral-500/30' },
    { src: 'Learn-Frontend.svg', color: 'bg-blue-500/30' },
    { src: 'fws.svg', color: 'bg-red-500/30' },
    { src: 'TestigoMX.svg', color: 'bg-neutral-500/30' },
    { src: 'Learn-Frontend.svg', color: 'bg-blue-500/30' },
    { src: 'fws.svg', color: 'bg-red-500/30' },
    { src: 'TestigoMX.svg', color: 'bg-neutral-500/30' },
    { src: 'Learn-Frontend.svg', color: 'bg-blue-500/30' },
    { src: 'fws.svg', color: 'bg-red-500/30' },
    { src: 'TestigoMX.svg', color: 'bg-neutral-500/30' },
    { src: 'Learn-Frontend.svg', color: 'bg-blue-500/30' },
    { src: 'fws.svg', color: 'bg-red-500/30' },
    { src: 'TestigoMX.svg', color: 'bg-neutral-500/30' },
    { src: 'Learn-Frontend.svg', color: 'bg-blue-500/30' },
  ];

  return (
    <div className="flex min-h-0 w-full flex-col gap-4 justify-self-center overflow-hidden px-8">
      <TopBar padding="pt-8 pb-4" />

      <div className="no-scrollbar flex flex-col gap-4 overflow-y-auto [scroll-behavior:smooth]">
        <Title title="All Projects" />

        <div className="mx-auto grid w-full flex-1 grid-cols-1 gap-4 pb-8 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {cards.map((c, i) => (
            <AnimatedItem key={`${c.src}-${i}`} index={i}>
              <ProjectCard src={c.src} color={c.color} />
            </AnimatedItem>
          ))}
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
