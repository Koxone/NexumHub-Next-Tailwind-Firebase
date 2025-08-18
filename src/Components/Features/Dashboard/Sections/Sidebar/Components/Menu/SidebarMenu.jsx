'use client';

import React from 'react';
import MenuButton from './Components/MenuButton';
import {
  Home,
  Presentation,
  Search,
  FileUser,
  Settings,
  ClipboardPlus,
  User,
  Linkedin,
  FolderPlus,
  Download,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMobileMenu } from '@/Stores/useMobileMenu';
import { useTaskModal } from '@/Stores/useTaskModal';
import { usePendingModal } from '@/Stores/usePendingModal';
import { useProjectModal } from '@/Stores/useProjectModal';

function SidebarMenu() {
  const router = useRouter();

  const { toggle } = useMobileMenu();
  const { openTask } = useTaskModal();
  const { openProject } = useProjectModal();
  const onLinkClick = (path) => {
    router.push(path);
    toggle();
  };

  const handleLinkedIn = () => {
    const url = 'https://www.linkedin.com/in/carlos-d-leon/';
    const win = window.open(url, '_blank', 'noopener,noreferrer');
    if (win) win.opener = null; 
  };
  return (
    <div className="flex flex-col items-start gap-4">
      <MenuButton
        onClick={() => onLinkClick('/')}
        aria="Go to Home Button"
        icon={Home}
        text="Home"
      />
      <MenuButton
        onClick={() => onLinkClick('/projects')}
        aria="Go to Projects Button"
        icon={Presentation}
        text="Projects"
      />

      {/* <MenuButton
        onClick={openProject}
        aria="Create New Project Button"
        icon={FolderPlus}
        text="New Project"
      />
      <MenuButton
        aria="Go to Tasks Button"
        icon={SquareCheck}
        text="Pending Tasks"
      />
      <MenuButton
        aria="Create a new Task Button"
        icon={ClipboardPlus}
        text="Create Task"
        onClick={openTask}
      />
      <MenuButton
        aria="Go to Approval Button"
        icon={CheckCircle}
        text="Pending Approval"
        onClick={openPending}
      /> */}

      <MenuButton
        aria="Go to Search Projects Button"
        icon={Download}
        text="Resume"
        downloadResume
      />
      <MenuButton
        aria="Go to User Account Button"
        icon={Linkedin}
        text="My Linkedin"
        onClick={handleLinkedIn}
      />
      <MenuButton
        aria="Go to Settings Button"
        icon={Settings}
        text="Settings"
        disabled
      />
    </div>
  );
}

export default SidebarMenu;
