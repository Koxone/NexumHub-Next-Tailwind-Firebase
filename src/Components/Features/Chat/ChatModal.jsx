'use client';

import { useEffect, useRef } from 'react';
import { useChatModal } from '@/Stores/useChatModal';
import { useTranslation } from 'react-i18next';

// Zustand
import { useKxChat } from '@/Stores/useKxChat';
import { useOpenChatButton } from '@/Stores/useOpenChatButton';

export default function ChatModal({ onAccept }) {
  const { isOpen, closeChatModal } = useChatModal();
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);
  const { t } = useTranslation();

  // Zustand
  const { isOpenKxChat, openChat, closeChat, toggleChat } = useKxChat();
  const { acceptChat, permitted } = useOpenChatButton();

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
    const tmo = setTimeout(() => closeBtnRef.current?.focus(), 0);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      clearTimeout(tmo);
      document.documentElement.style.overflow = prev || '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-[1px]"
        onClick={closeChatModal}
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
                    className="text-text-primary h-4 w-4"
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
                  <h3 className="text-text-primary text-lg font-semibold">
                    {t('chatModal.title')}
                  </h3>
                  <p className="text-text-secondary text-xs">
                    {t('chatModal.subtitle')}
                  </p>
                </div>
              </div>

              {/* What you're about to experience */}
              <div className="border-border-main/20 mb-4 hidden rounded-lg border bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-3 md:block">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500">
                    <svg
                      className="text-text-primary h-3 w-3"
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
                      {t('chatModal.experienceTitle')}
                    </h4>
                    <p className="text-text-subheading text-xs leading-relaxed">
                      {t('chatModal.experienceText')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Features List */}
              <div className="mb-4 space-y-3">
                <div className="flex items-start gap-2">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500">
                    <svg
                      className="text-text-primary h-3 w-3"
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
                    <h5 className="text-text-primary mb-0.5 text-sm font-medium">
                      {t('chatModal.featureRealtimeTitle')}
                    </h5>
                    <p className="text-text-secondary text-xs">
                      {t('chatModal.featureRealtimeText')}
                    </p>
                  </div>
                </div>

                {/* Security */}
                {/* <div className="flex items-start gap-2">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500">
                    <svg
                      className="text-text-primary h-3 w-3"
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
                    <h5 className="text-text-primary mb-0.5 text-sm font-medium">
                      {t('chatModal.featureSecurityTitle')}
                    </h5>
                    <p className="text-text-secondary text-xs">
                      {t('chatModal.featureSecurityText')}
                    </p>
                  </div>
                </div> */}

                {/* Dev status */}
                <div className="flex items-start gap-2">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500">
                    <svg
                      className="text-text-primary h-3 w-3"
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
                    <h5 className="text-text-primary mb-0.5 text-sm font-medium">
                      {t('chatModal.featureDevTitle')}
                    </h5>
                    <p className="text-text-secondary text-xs">
                      {t('chatModal.featureDevText')}
                    </p>
                  </div>
                </div>
              </div>

              {/* For Recruiters */}
              <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                <div className="flex items-start gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-blue-500">
                    <svg
                      className="text-text-primary h-3 w-3"
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
                      {t('chatModal.recruitersTitle')}
                    </h4>
                    <p className="text-text-subheading mb-2 text-xs leading-relaxed">
                      {t('chatModal.recruitersText')}
                    </p>
                    <ul className="text-text-secondary ml-3 space-y-0.5 text-xs">
                      {t('chatModal.recruitersList', {
                        returnObjects: true,
                      }).map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Personal Commitment */}
              <div className="hidden pt-3 text-center md:block">
                <p className="text-text-secondary text-xs">
                  {t('chatModal.commitment')}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 flex flex-col gap-2 border-t border-white/10 bg-[#0b1020]/95 px-4 py-3 backdrop-blur sm:flex-row sm:justify-end">
              <div className="group relative flex items-center">
                <button
                  type="button"
                  onClick={() => {
                    openChat();
                    permitted();
                    closeChatModal();
                    acceptChat();
                  }}
                  className={[
                    'mobile text-text-primary w-full cursor-pointer rounded-md bg-gray-800 px-4 py-2 text-xs font-medium hover:bg-green-800 focus:ring-2 focus:ring-green-500 focus:outline-none',
                    'sm:',
                    'md:w-fit',
                    'lg:',
                    'xl:',
                    '2xl:',
                  ].join(' ')}
                >
                  {t('chatModal.buttonChat')}
                </button>
              </div>

              <button
                type="button"
                onClick={closeChatModal}
                className="text-text-primary cursor-pointer rounded-md border border-white/10 bg-neutral-500 px-4 py-2 text-xs font-medium hover:bg-white/10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {t('chatModal.buttonClose')}
              </button>
            </div>
          </div>
          {/* /Shell */}
        </div>
      </div>
    </>
  );
}
