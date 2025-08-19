'use client';

import { Menu } from 'lucide-react';
import React, { useRef } from 'react';
import { useMobileMenu } from '@/Stores/useMobileMenu';

function MobileSidebarToggleButton() {
  const { isOpen, toggle } = useMobileMenu();
  const btnRef = useRef(null);

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={() => {
        toggle();
        btnRef.current?.blur();
      }}
      aria-label={isOpen ? 'Close mobile menu' : 'Open mobile menu'}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      className="flex cursor-pointer rounded p-2 text-white outline-none focus-visible:ring-2 focus-visible:ring-white/60 lg:hidden"
    >
      <Menu className="h-5 w-5" />
    </button>
  );
}

export default MobileSidebarToggleButton;
