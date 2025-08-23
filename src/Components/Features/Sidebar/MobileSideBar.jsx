'use client';

import { useEffect, useRef } from 'react';
import { useMobileMenu } from '@/Stores/useMobileMenu';
import Logo from '@/Components/Features/Sidebar/Components/Logo/Logo';
import SidebarMenu from '@/Components/Features/Sidebar/Components/Menu/SidebarMenu';
import MobileSidebarToggleButton from '@/Components/Features/Sidebar/Components/MobileSidebarToggleButton/MobileSidebarToggleButton';

export default function MobileSideBar() {
  const { isOpen, toggle } = useMobileMenu();
  const closeBtnRef = useRef(null);
  const openerBtnRef = useRef(null);
  const drawerRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && isOpen) toggle();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, toggle]);

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => closeBtnRef.current?.focus(), 0);
      return () => clearTimeout(t);
    } else {
      openerBtnRef.current?.focus?.();
    }
  }, [isOpen]);

  useEffect(() => {
    const opener = document.querySelector('[aria-controls="mobile-menu"]');
    if (opener) {
      openerBtnRef.current = opener;
    }
  }, []);

  const onLinkClick = (e) => {
    const a = e.target.closest('a[href]');
    if (a) toggle();
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={toggle}
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-[1px] 2xl:hidden"
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-navigation-label"
        className={`bg-bg-primary 2xl::hidden fixed top-0 left-0 z-40 h-screen w-fit overflow-y-auto p-8 transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        tabIndex={-1}
        onClickCapture={onLinkClick}
      >
        <div className="grid w-full grid-cols-[auto_1fr] items-center gap-4">
          <MobileSidebarToggleButton />
          <Logo />
        </div>

        <div className="overflow-y-auto py-4">
          <ul className="space-y-2 font-medium">
            <SidebarMenu />
          </ul>
        </div>
      </div>
    </>
  );
}
