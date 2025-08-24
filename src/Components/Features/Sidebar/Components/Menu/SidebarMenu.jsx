'use client';

import React, { useEffect, useState } from 'react';
import MenuButton from './Components/MenuButton';
import {
  Home,
  Presentation,
  Languages,
  SunMoon,
  Github,
  Send,
  MessageCircleMoreIcon,
  Linkedin,
  Download,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMobileMenu } from '@/Stores/useMobileMenu';
import { useChatModal } from '@/Stores/useChatModal';
import LanguageButton from './Components/LanguageButton';
import { useTranslation } from 'react-i18next';

function SidebarMenu() {
  const router = useRouter();

  //Language
  const { t } = useTranslation();

  // Zustand
  const { openChatModal } = useChatModal();

  // stores
  const { toggle } = useMobileMenu();

  // nav helper
  const onLinkClick = (path) => {
    router.push(path);
    toggle();
  };

  // external links
  const handleLinkedIn = () => {
    const url = 'https://www.linkedin.com/in/carlos-d-leon/';
    const win = window.open(url, '_blank', 'noopener,noreferrer');
    if (win) win.opener = null;
  };
  const handleGithub = () => {
    const url = 'https://github.com/Koxone';
    const win = window.open(url, '_blank', 'noopener,noreferrer');
    if (win) win.opener = null;
  };

  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => setShowHint(false), 14500);
    return () => clearTimeout(id);
  }, []);

  const handleProjects = () => {
    setShowHint(false);
    onLinkClick('/projects');
  };

  return (
    <div className="flex flex-col items-start gap-4">
      <MenuButton
        onClick={() => onLinkClick('/')}
        aria="Go to Home Button"
        icon={Home}
        text="Home"
      />

      <div className="relative w-full">
        {showHint && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 animate-pulse rounded-lg shadow-[0_0_0_10px_rgba(59,130,246,0.07),0_0_35px_10px_rgba(59,130,246,0.35)] ring-2 ring-blue-400/70"
          />
        )}

        <MenuButton
          onClick={handleProjects}
          aria="Go to Projects Button"
          icon={Presentation}
          text={t('sidebarMenu.projects')}
          textColor="text-emerald-400"
        />
      </div>

      <div className="relative w-full">
        {showHint && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 animate-pulse rounded-lg shadow-[0_0_0_10px_rgba(59,130,246,0.07),0_0_35px_10px_rgba(59,130,246,0.35)] ring-2 ring-blue-400/70"
          />
        )}

        <MenuButton
          onClick={openChatModal}
          aria="Go to Projects Button"
          icon={MessageCircleMoreIcon}
          text={t('sidebarMenu.chat')}
          textColor="text-emerald-400"
        />
      </div>
      <MenuButton
        onClick={handleGithub}
        aria="Go to Projects Button"
        icon={Github}
        text={t('sidebarMenu.github')}
      />
      <MenuButton
        aria="Go to User Account Button"
        icon={Linkedin}
        text={t('sidebarMenu.linkedin')}
        onClick={handleLinkedIn}
      />
      <MenuButton
        aria="Go to Search Projects Button"
        icon={Download}
        text={t('sidebarMenu.resume')}
        downloadResume
      />
      <MenuButton
        aria="Go to Search Projects Button"
        icon={Send}
        text={t('sidebarMenu.contact')}
        contact
      />
      <LanguageButton
        aria="Go to Search Projects Button"
        icon={Languages}
        text="English"
        contact
      />
      <MenuButton
        aria="Go to Search Projects Button"
        icon={SunMoon}
        text="Dark Mode"
        disabled
      />
    </div>
  );
}

export default SidebarMenu;
