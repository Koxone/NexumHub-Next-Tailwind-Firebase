'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

import Title from '@/Components/UI/Text/Title';

// Firebase
import { useProjects } from '@/Hooks/Firebase/Projects/useProjects';
import { db, storage } from '@/lib/firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { Plus } from 'lucide-react';
import { useProjectModal } from '@/Stores/useProjectModal';
import InteractiveProjectsSection from '@/Components/Sections/FeaturedInteractiveProjects/InteractiveProjectsSection';
import GithubRepos from '@/Components/Features/Github/Components/Repos/GithubRepos';

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
  // Zustand
  const { toggleProject } = useProjectModal();

  // Firebase
  const { data, loading } = useProjects();
  if (loading) return <p className="text-text-subheading">Loading projects…</p>;
  if (!data.length) {
    return (
      <div className="flex flex-col gap-4 overflow-hidden px-8">
        <Title title="Latest Projects" />
        <div className="flex h-[300px] items-center justify-start">
          <div
            onClick={toggleProject}
            className={[
              'flex aspect-square max-h-[300px] w-full max-w-[300px] cursor-pointer',
              'flex-col items-center justify-center rounded-lg',
              'border-border-strong border border-dashed',
              'text-text-secondary p-4',
            ].join(' ')}
          >
            <span className="flex flex-col items-center text-lg font-medium">
              <Plus className="cursor-pointer" />
              Agrega un proyecto
            </span>
          </div>
        </div>
      </div>
    );
  }

  const handleDelete = async (project) => {
    try {
      await deleteDoc(doc(db, 'projects', project.idDoc || project.id));

      if (project.imageUrl) {
        const fileRef = ref(storage, project.imageUrl);
        await deleteObject(fileRef);
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div className="flex min-h-0 w-full flex-col gap-8 justify-self-center lg:pl-64">
      {/* Presentation */}
      <div>
        <h1 className="text-text-primary mb-4 text-4xl font-bold tracking-tight capitalize md:text-4xl lg:text-4xl">
          Projects
        </h1>
        <p className="text-text-secondary max-w-[1100px] text-sm font-light sm:text-xl md:text-xl lg:text-xl xl:text-xl 2xl:text-xl">
          Here you'll find my{' '}
          <span className="text-accent font-semibold">Featured Projects</span>,
          currently live in production but kept private on GitHub. Although the
          source code isn't public, you can still explore each project to
          discover its purpose, features, and technologies. You'll also see{' '}
          <span className="text-accent font-semibold">Real-time Updates</span>{' '}
          from all my public repositories, showcasing my latest commits,
          progress, and ongoing development work.
        </p>
      </div>

      <div className="no-scrollbar grid gap-8 [scroll-behavior:smooth] md:justify-center lg:grid-cols-[auto_1fr]">
        {/* Projects */}
        <div className="flex flex-col gap-5">
          <Title title="Featured Private Projects" />
          <InteractiveProjectsSection />
        </div>

        {/* Github Repos */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            {/* Title */}
            <Title title="Latest Github Updates" className="" />

            {/* State Indicator */}
            <div className="text-center">
              <span className="bg-button-primary text-text-body inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs">
                <span className="bg-bg-emerald h-2 w-2 rounded-full"></span>
                Real Time Updates
              </span>
            </div>
          </div>
          <GithubRepos padding="" />
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
