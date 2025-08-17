'use client';

import React, { useRef, useState } from 'react';
import ProjectCard from './Components/ProjectCard';
import Title from '@/Components/Text/Title';

export default function LatestProjects() {
  const scrollerRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [blockClick, setBlockClick] = useState(false);

  const drag = useRef({
    id: null,
    active: false,
    startX: 0,
    startLeft: 0,
    moved: false,
    threshold: 6,
  });

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
        <ProjectCard
          src="fws.svg"
          color="bg-red-500/30"
          blockClick={blockClick}
        />
        <ProjectCard
          src="fws.svg"
          color="bg-red-500/30"
          blockClick={blockClick}
        />
        <ProjectCard
          src="TestigoMX.svg"
          color="bg-neutral-500/30"
          blockClick={blockClick}
        />
        <ProjectCard
          src="Learn-Frontend.svg"
          color="bg-blue-500/30"
          blockClick={blockClick}
        />
        <ProjectCard
          src="fws.svg"
          color="bg-red-500/30"
          blockClick={blockClick}
        />
        <ProjectCard
          src="fws.svg"
          color="bg-red-500/30"
          blockClick={blockClick}
        />
        <ProjectCard
          src="TestigoMX.svg"
          color="bg-neutral-500/30"
          blockClick={blockClick}
        />
        <ProjectCard
          src="Learn-Frontend.svg"
          color="bg-blue-500/30"
          blockClick={blockClick}
        />
        <ProjectCard
          src="fws.svg"
          color="bg-red-500/30"
          blockClick={blockClick}
        />
        <ProjectCard
          src="fws.svg"
          color="bg-red-500/30"
          blockClick={blockClick}
        />
        <ProjectCard
          src="TestigoMX.svg"
          color="bg-neutral-500/30"
          blockClick={blockClick}
        />
        <ProjectCard
          src="Learn-Frontend.svg"
          color="bg-blue-500/30"
          blockClick={blockClick}
        />
        <ProjectCard
          src="fws.svg"
          color="bg-red-500/30"
          blockClick={blockClick}
        />
        <ProjectCard
          src="fws.svg"
          color="bg-red-500/30"
          blockClick={blockClick}
        />
        <ProjectCard
          src="TestigoMX.svg"
          color="bg-neutral-500/30"
          blockClick={blockClick}
        />
        <ProjectCard
          src="Learn-Frontend.svg"
          color="bg-blue-500/30"
          blockClick={blockClick}
        />
        <ProjectCard
          src="fws.svg"
          color="bg-red-500/30"
          blockClick={blockClick}
        />
        <ProjectCard
          src="fws.svg"
          color="bg-red-500/30"
          blockClick={blockClick}
        />
        <ProjectCard
          src="TestigoMX.svg"
          color="bg-neutral-500/30"
          blockClick={blockClick}
        />
        <ProjectCard
          src="Learn-Frontend.svg"
          color="bg-blue-500/30"
          blockClick={blockClick}
        />
        <ProjectCard
          src="fws.svg"
          color="bg-red-500/30"
          blockClick={blockClick}
        />
        <ProjectCard
          src="fws.svg"
          color="bg-red-500/30"
          blockClick={blockClick}
        />
        <ProjectCard
          src="TestigoMX.svg"
          color="bg-neutral-500/30"
          blockClick={blockClick}
        />
        <ProjectCard
          src="Learn-Frontend.svg"
          color="bg-blue-500/30"
          blockClick={blockClick}
        />
      </div>
    </div>
  );
}
