'use client';

import { useState, useRef, useEffect } from 'react';
import { EllipsisVertical } from 'lucide-react';

export default function PopoverButton({ onClick }) {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef(null);

  // close popover if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative z-50 inline-block" ref={popoverRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Project feedback menu (already submitted)"
        className="bg-bg-secondary z-50 cursor-pointer rounded-sm border border-neutral-500/40 px-1"
      >
        <EllipsisVertical className="md:auto w-4 text-white" />
      </button>

      {/* Popover */}
      {open && (
        <div className="absolute left-0 z-50 mt-2 w-64 rounded-lg border border-gray-600 bg-[#171e29] shadow-lg">
          <div className="rounded-t-lg border-b border-gray-600 bg-[#11151d] px-3 py-2">
            <h3 className="font-semibold text-white">Project Menu</h3>
          </div>
          <div className="px-3 py-2 text-sm text-gray-200">
            <p>
              Do you want to delete this project? This action cannot be undone.
            </p>
          </div>

          {/* Ejemplo de botones de acción */}
          <div className="flex gap-2 border-t border-gray-600 p-2">
            <button
              onClick={onClick}
              className="cursor-pointer rounded bg-red-600 px-3 py-1 text-xs text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
