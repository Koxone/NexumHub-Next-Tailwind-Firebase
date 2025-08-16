'use client';

import { useEffect, useRef } from 'react';
import { usePendingModal } from '@/Stores/usePendingModal';

export default function TaskAndPendingModal({
  onAccept,
  onDecline,
  staticBackdrop = true,
}) {
  const { isOpen, close } = usePendingModal();
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, close]);

  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => closeBtnRef.current?.focus(), 0);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = prev || '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdrop = () => {
    if (!staticBackdrop) close();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[1px]"
        onClick={handleBackdrop}
        aria-hidden="true"
      />

      {/* Modal root */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:inset-0"
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-pending-title"
      >
        <div className="relative w-full max-w-2xl">
          {/* Modal content */}
          <div className="bg-bg-main relative rounded-lg shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-600 p-4 md:p-5">
              <h3
                id="task-pending-title"
                className="text-xl font-semibold text-white"
              >
                Pending Approval
              </h3>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={close}
                className="ms-auto inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-sm text-gray-400 hover:bg-gray-600 hover:text-gray-900"
                aria-label="Close modal"
              >
                {/* Close icon */}
                <svg
                  className="h-3 w-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="space-y-4 p-4 md:p-5">
              <p className="text-base leading-relaxed text-gray-400">
                With less than a month to go before the European Union enacts
                new consumer privacy laws for its citizens, companies around the
                world are updating their terms of service agreements to comply.
              </p>
              <p className="text-base leading-relaxed text-gray-400">
                The European Union’s General Data Protection Regulation
                (G.D.P.R.) goes into effect on May 25 and is meant to ensure a
                common set of data rights in the European Union. It requires
                organizations to notify users as soon as possible of high-risk
                data breaches that could personally affect them.
              </p>
            </div>

            {/* Footer */}
            <div className="flex items-center rounded-b border-t border-gray-600 p-4 md:p-5">
              <button
                type="button"
                onClick={() => {
                  onAccept?.();
                  close(); // optional: close after accept
                }}
                className="cursor-pointer rounded-lg bg-green-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-900 focus:outline-none"
              >
                Mark as completed
              </button>
              <button
                type="button"
                onClick={() => {
                  onDecline?.();
                  close(); // optional: close after decline
                }}
                className="ms-3 cursor-pointer rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:z-10"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={close}
                className="ms-3 cursor-pointer rounded-lg border border-gray-600 bg-gray-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 focus:z-10"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
