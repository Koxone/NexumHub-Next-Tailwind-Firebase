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
import { useTaskModal } from '@/Stores/useTaskModal';
import { useProjectModal } from '@/Stores/useProjectModal';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from '@clerk/nextjs';
import ChatModal from '@/Components/Features/Modals/ChatModal';
import { useChatModal } from '@/Stores/useChatModal';

function SidebarMenu() {
  const router = useRouter();

  // Zustand
  const { openChatModal } = useChatModal();

  // clerk
  const { user } = useUser();

  // stores
  const { toggle } = useMobileMenu();
  const { openTask } = useTaskModal();
  const { openProject } = useProjectModal();

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

  // attention flag
  const [showHint, setShowHint] = useState(true); // initial hint

  // auto-hide
  useEffect(() => {
    const id = setTimeout(() => setShowHint(false), 14500);
    return () => clearTimeout(id);
  }, []);

  // projects click
  const handleProjects = () => {
    setShowHint(false); // stop hint
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

      {/* wrapper relative */}
      <div className="relative">
        {/* halo */}
        {showHint && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 animate-pulse rounded-lg shadow-[0_0_0_10px_rgba(59,130,246,0.07),0_0_35px_10px_rgba(59,130,246,0.35)] ring-2 ring-blue-400/70"
          />
        )}

        {/* button */}
        <MenuButton
          onClick={handleProjects}
          aria="Go to Projects Button"
          icon={Presentation}
          text="My Projects"
          textColor='text-emerald-400'
        />
      </div>

      <div className="relative">
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
          text="Chat with Me!"
          textColor='text-emerald-400'
        />
      </div>
      <MenuButton
        onClick={handleGithub}
        aria="Go to Projects Button"
        icon={Github}
        text="My Github"
      />
      <MenuButton
        aria="Go to User Account Button"
        icon={Linkedin}
        text="My Linkedin"
        onClick={handleLinkedIn}
      />
      <MenuButton
        aria="Go to Search Projects Button"
        icon={Download}
        text="My Resume"
        downloadResume
      />
      <MenuButton
        aria="Go to Search Projects Button"
        icon={Send}
        text="Contact"
        contact
      />
      <MenuButton
        aria="Go to Search Projects Button"
        icon={Languages}
        text="English"
        contact
      />
      <MenuButton
        aria="Go to Search Projects Button"
        icon={SunMoon}
        text="Dark Mode"
        contact
      />
    </div>
  );
}

export default SidebarMenu;
