'use client';

import React, { useRef, useState } from 'react';
import Title from '@/Components/Text/Title';
import RegularProjectCard from './Components/RegularProjectCard/RegularProjectCard';

// Zustand
import { useProjectModal } from '@/Stores/useProjectModal';

// Lucide
import { Plus } from 'lucide-react';

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
    <div className="mb-6 flex flex-col gap-4 overflow-hidden px-8">
      <Title title="Featured Projects" />
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
        <RegularProjectCard
          description="Humanitarian full-stack platform for Mexico’s missing persons crisis."
          stack="Next.js · Tailwind CSS · Firebase · Clerk"
          src="/Images/ProjectCards/testigo.svg"
        />

        <RegularProjectCard
          description="Full-stack Headless Shopify e-commerce with a fast, modern storefront."
          stack="Next.js · Tailwind CSS · Firebase · Shopify · Storefront API"
          src="/Images/ProjectCards/fws.svg"
        />

        <RegularProjectCard
          description="Full-stack coupon generator with Apple and Google Wallet passes."
          stack="React · Tailwind CSS · API · Apple Wallet · Google Wallet"
          src="/Images/ProjectCards/sacbe.svg"
        />
      </div>
    </div>
  );
}
