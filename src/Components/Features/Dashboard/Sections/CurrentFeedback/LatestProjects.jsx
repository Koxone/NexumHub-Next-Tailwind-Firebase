'use client';

import React, { useRef, useState } from 'react';
import ProjectCard from './Components/ProjectCard';
import Title from '@/Components/Text/Title';

// Zustand
import { useProjectModal } from '@/Stores/useProjectModal';

// Firebase
import { useProjects } from '@/Hooks/Firebase/Projects/useProjects';
import { db, storage } from '@/lib/firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { Plus } from 'lucide-react';

export default function LatestProjects() {
  const scrollerRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [blockClick, setBlockClick] = useState(false);

  // Zustand
  const { toggleProject } = useProjectModal();

  const drag = useRef({
    id: null,
    active: false,
    startX: 0,
    startLeft: 0,
    moved: false,
    threshold: 6,
  });

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

  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse') return;
    if (e.target.closest('[data-nodrag="true"]')) return;
    const el = scrollerRef.current;
    drag.current.active = true;
    drag.current.id = e.pointerId;
    drag.current.startX = e.clientX;
    drag.current.startLeft = el.scrollLeft;
    drag.current.moved = false;
    setBlockClick(false);
    el.setPointerCapture?.(e.pointerId);
    setDragging(true);
  };

  const onPointerMove = (e) => {
    if (!drag.current.active) return;
    const el = scrollerRef.current;
    const dx = e.clientX - drag.current.startX;
    if (!drag.current.moved && Math.abs(dx) <= drag.current.threshold) return;
    if (!drag.current.moved) {
      drag.current.moved = true;
      setBlockClick(true);
    }
    el.scrollLeft = drag.current.startLeft - dx;
    e.preventDefault();
  };

  const endDrag = () => {
    const el = scrollerRef.current;
    if (drag.current.id != null) el.releasePointerCapture?.(drag.current.id);
    drag.current.active = false;
    drag.current.id = null;
    setDragging(false);
    if (!drag.current.moved) setBlockClick(false);
  };

  return (
    <div className="flex flex-col gap-4 overflow-hidden px-8">
      <Title title="Latest Projects" />
      <div
        ref={scrollerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        onDragStart={(e) => e.preventDefault()}
        className={`no-scrollbar flex h-[300px] [touch-action:pan-x] gap-4 overflow-x-auto overflow-y-hidden select-none [scrollbar-gutter:stable] ${
          dragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
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
      </div>
    </div>
  );
}
