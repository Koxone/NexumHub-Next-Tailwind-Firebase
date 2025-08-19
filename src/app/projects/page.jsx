'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

import ProjectCard from '@/Components/Features/Dashboard/Sections/CurrentFeedback/Components/ProjectCard';
import TopBar from '@/Components/Features/Dashboard/Sections/Topbar/TopBar';
import Title from '@/Components/UI/Text/Title';

// Firebase
import { useProjects } from '@/Hooks/Firebase/Projects/useProjects';
import { db, storage } from '@/lib/firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { Plus } from 'lucide-react';
import { useProjectModal } from '@/Stores/useProjectModal';
import ProjectsSection from '@/Components/Features/Koxland/ProjectSection/ProjectsSection';

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
  if (loading) return <p className="text-gray-300">Loading projects…</p>;
  if (!data.length) {
    return (
      <div className="flex flex-col gap-4 overflow-hidden px-8">
        <Title title="Latest Projects" />
        <div className="flex h-[300px] items-center justify-start">
          <div
            onClick={toggleProject}
            className="flex aspect-square max-h-[300px] w-full max-w-[300px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-600 p-4 text-gray-400"
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
    <div className="flex min-h-0 w-full flex-col gap-4 justify-self-center overflow-hidden px-8">
      <TopBar padding="pt-8 pb-4" />

      <div className="no-scrollbar flex flex-col gap-4 overflow-y-auto [scroll-behavior:smooth]">
        <Title title="All Projects" />

        <div className="mx-auto grid w-full flex-1 grid-cols-1 gap-4 pb-8 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((p) => (
            <ProjectCard
              key={p.idDoc}
              imageUrl={p.imageUrl}
              color="border-gray-700"
              path={`/projects/${p.id || p.idDoc}`}
              alt={p.name}
              onDelete={() => handleDelete(p)}
            />
          ))}
          {/* <ProjectsSection /> */}
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
