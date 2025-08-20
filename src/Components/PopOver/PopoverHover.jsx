// components/PopoverHover.js
'use client';

import { useRef, useState } from 'react';

export default function PopoverHover({
  buttonLabel = 'Hover popover',
  title = 'Popover hover',
  children,
}) {
  // Keep popover open while pointer is over trigger or panel
  const [open, setOpen] = useState(false);
  const timer = useRef(null);

  // /* Simple hover intent to avoid flicker */
  const openNow = () => {
    clearTimeout(timer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onMouseEnter={openNow}
        onMouseLeave={closeSoon}
        aria-describedby="popover-hover"
        className="text-text-primary me-3 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {buttonLabel}
      </button>

      {/* Panel */}
      <div
        id="popover-hover"
        role="tooltip"
        onMouseEnter={openNow}
        onMouseLeave={closeSoon}
        className={`dark:border-border-strong dark:text-text-secondary absolute z-10 inline-block w-64 rounded-lg border bg-white text-sm text-gray-500 shadow-xs transition-opacity duration-200 dark:bg-gray-800 ${open ? 'visible opacity-100' : 'invisible opacity-0'}`}
      >
        <div className="dark:border-border-strong rounded-t-lg border-b bg-gray-100 px-3 py-2 dark:bg-gray-700">
          <h3 className="dark:text-text-primary text-bg-secondary font-semibold">
            {title}
          </h3>
        </div>
        <div className="px-3 py-2">{children}</div>

        {/* Arrow */}
        <div className="dark:border-border-strong pointer-events-none absolute -top-2 right-6 h-3 w-3 rotate-45 border-t border-l bg-white dark:bg-gray-800" />
      </div>
    </div>
  );
}
