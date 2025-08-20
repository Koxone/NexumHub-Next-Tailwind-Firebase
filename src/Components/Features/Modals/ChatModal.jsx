'use client';

import { useEffect, useRef } from 'react';
import { useChatModal } from '@/Stores/useChatModal';

export default function ChatModal({
  onAccept,
  onDecline,
  staticBackdrop = true,
}) {
  const { isOpen, closeChatModal } = useChatModal();
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);

  // Esc Key
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === 'Escape' && closeChatModal();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, closeChatModal]);

  // Focus + Lock Scroll
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
    if (!staticBackdrop) closeChatModal();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-[1px]"
        onClick={handleBackdrop}
        aria-hidden="true"
      />

      {/* Modal root */}
      <div
        className="fixed inset-0 z-50 grid place-items-center p-3"
        role="dialog"
        aria-modal="true"
        aria-labelledby="chat-approval-title"
      >
        <div ref={modalRef} className="relative w-full max-w-lg sm:max-w-xl">
          {/* Shell */}
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0b1020] shadow-2xl ring-1 ring-white/10">
            <div className="max-h-fit overflow-y-auto px-4 py-4">
              <div className="mb-4 flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                  <svg
                    className="h-4 w-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-white">
                    Live Chat System
                  </h3>
                  <p className="text-xs text-gray-400">
                    Real-time demonstration platform
                  </p>
                </div>
              </div>

              {/* What you're about to experience */}
              <div className="mb-4 rounded-lg border border-blue-400/20 bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500">
                    <svg
                      className="h-3 w-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <h4 className="mb-1 text-sm font-medium text-blue-300">
                      What You're About to Experience
                    </h4>
                    <p className="text-xs leading-relaxed text-gray-300">
                      This isn't just another contact form. You're about to
                      interact with a{' '}
                      <strong>
                        custom-built, production-grade chat engine
                      </strong>{' '}
                      I developed from scratch using Firebase Firestore as the
                      backbone.
                    </p>
                  </div>
                </div>
              </div>

              {/* Features List */}
              <div className="mb-4 space-y-3">
                <div className="flex items-start gap-2">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500">
                    <svg
                      className="h-3 w-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <h5 className="mb-0.5 text-sm font-medium text-white">
                      Real-Time Architecture
                    </h5>
                    <p className="text-xs text-gray-400">
                      Messages are delivered instantly using Firestore's
                      real-time listeners, providing a WhatsApp-like experience
                      with sub-second latency.
                    </p>
                  </div>
                </div>

                {/* Security */}
                <div className="flex items-start gap-2">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500">
                    <svg
                      className="h-3 w-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <h5 className="mb-0.5 text-sm font-medium text-white">
                      Enterprise-Grade Security
                    </h5>
                    <p className="text-xs text-gray-400">
                      All communications are encrypted using SHA-256 hashing and
                      designed to be completely anonymous, ensuring privacy and
                      data protection.
                    </p>
                  </div>
                </div>

                {/* Dev status */}
                <div className="flex items-start gap-2">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500">
                    <svg
                      className="h-3 w-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <h5 className="mb-0.5 text-sm font-medium text-white">
                      Active Development Showcase
                    </h5>
                    <p className="text-xs text-gray-400">
                      While the core functionality is production-ready, I'm
                      continuously refining the UI/UX. You're seeing my
                      development process in real-time.
                    </p>
                  </div>
                </div>
              </div>

              {/* recruit card - Reduced padding */}
              <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                <div className="flex items-start gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-blue-500">
                    <svg
                      className="h-3 w-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v18a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1h2z"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <h4 className="mb-1 text-sm font-medium text-green-400">
                      Why This Matters for Recruiters
                    </h4>
                    <p className="mb-2 text-xs leading-relaxed text-gray-300">
                      Rather than just describing my technical abilities, I've
                      embedded this interactive system directly into my
                      portfolio. This demonstrates my capacity to:
                    </p>
                    <ul className="ml-3 space-y-0.5 text-xs text-gray-400">
                      <li>• Design and architect scalable real-time systems</li>
                      <li>
                        • Implement robust security practices in web
                        applications
                      </li>
                      <li>
                        • Create intuitive user experiences with modern
                        technologies
                      </li>
                      <li>
                        • Deploy and maintain production-level applications
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* note - Smaller text */}
              <div className="pt-3 text-center">
                <p className="text-xs text-gray-400">
                  <strong className="text-white">Personal Commitment:</strong> I
                  will respond to your messages as promptly as possible. This is
                  a direct line to discuss opportunities, technical questions,
                  or project collaborations.
                </p>
              </div>
            </div>

            {/* Footer - Reduced padding and button sizes */}
            <div className="sticky bottom-0 flex flex-col gap-2 border-t border-white/10 bg-[#0b1020]/95 px-4 py-3 backdrop-blur sm:flex-row sm:justify-end">
              <button
              title='Coming Soon'
                disabled
                type="button"
                onClick={() => {
                  onAccept?.();
                  closeChatModal();
                }}
                className="cursor-not-allowed rounded-md bg-gray-800 px-4 py-2 text-xs font-medium text-white hover:bg-green-800 focus:ring-2 focus:ring-green-500 focus:outline-none"
              >
                Lets Chat!
              </button>
              <button
                type="button"
                onClick={closeChatModal}
                className="cursor-pointer rounded-md border border-white/10 bg-neutral-500 px-4 py-2 text-xs font-medium text-white hover:bg-white/10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
          {/* /Shell */}
        </div>
      </div>
    </>
  );
}
