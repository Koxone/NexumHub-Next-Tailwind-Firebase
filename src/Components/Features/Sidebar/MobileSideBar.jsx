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
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-[1px] lg:hidden"
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
        className={`bg-bg-main fixed top-0 left-0 z-40 h-screen w-fit overflow-y-auto p-8 transition-transform lg:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        tabIndex={-1}
        onClickCapture={onLinkClick}
      >
        <div className="grid w-full grid-cols-[auto_1fr] items-center gap-4">
          <MobileSidebarToggleButton />
          <Logo />
        </div>

        {/* <button
          ref={closeBtnRef}
          type="button"
          onClick={toggle}
          aria-controls="mobile-menu"
          className="absolute end-2.5 top-2.5 inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-text-secondary hover:bg-gray-200 hover:text-bg-secondary dark:hover:bg-gray-600 dark:hover:text-text-primary"
        >
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close menu</span>
        </button> */}

        <div className="overflow-y-auto py-4">
          <ul className="space-y-2 font-medium">
            <SidebarMenu />
          </ul>
        </div>
      </div>
    </>
  );
}
