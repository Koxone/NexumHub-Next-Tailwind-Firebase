'use client';

import React, { useEffect } from 'react';
import { useKxChat } from '@/Stores/useKxChat';
import { useOpenChatButton } from '@/Stores/useOpenChatButton';

function MenuButton({
  icon: Icon,
  text,
  aria,
  onClick,
  notification,
  disabled = false,
  contact,
  textColor = '',
  downloadResume = false,
  openChatButton = false,
}) {
  const { hydrate } = useOpenChatButton();
  useEffect(() => {
    hydrate();
  }, [hydrate]);

  // Zustand
  const { isOpenKxChat, openChat, toggleChat } = useKxChat();
  const { isPermitted, permitted } = useOpenChatButton();

  const handleClick = (e) => {
    if (disabled) return;

    if (contact) {
      const subject = encodeURIComponent('Contacto desde el portafolio');
      const body = encodeURIComponent(
        'Hola Kox, me gustaría ponerme en contacto contigo.'
      );
      window.location.href = `mailto:admin@koxland.net?subject=${subject}&body=${body}`;
      return;
    }

    // Resume
    if (downloadResume) {
      const link = document.createElement('a');
      link.href = '/resume.docx';
      link.download = 'resume.docx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    // Chat
    if (openChatButton) {
      toggleChat();
      openChat();
      permitted();
      return;
    }

    if (typeof onClick === 'function') {
      onClick(e);
    }
  };
  if (openChatButton && !isPermitted) {
    return null;
  }

  return (
    <li
      onClick={handleClick}
      className="hover:bg-gray-dark h-fit w-full cursor-pointer list-none rounded-lg"
    >
      <button
        aria-label={aria}
        disabled={disabled}
        title={disabled ? 'Coming Soon' : ''}
        className={`group flex items-center rounded-lg p-2 ${
          disabled
            ? 'text-text-secondary cursor-not-allowed opacity-50 dark:text-gray-500'
            : 'dark:text-text-primary text-bg-secondary dark:hover:bg-gray-dark hover:bg-brand-100 cursor-pointer'
        }`}
      >
        <Icon className="h-5 w-5" />
        <span className={`ms-3 ${textColor} flex-1 whitespace-nowrap`}>
          {text}
        </span>
        {notification && !disabled && (
          <span className="ms-3 inline-flex h-3 w-3 items-center justify-center rounded-full bg-blue-100 p-3 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            3
          </span>
        )}
      </button>
    </li>
  );
}

export default MenuButton;
