'use client';

import React from 'react';
import MenuButton from './Components/MenuButton';
import {
  Home,
  Presentation,
  Search,
  Settings,
  User,
  SquareCheck,
  ClipboardList,
  CheckCircle,
  Menu,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMobileMenu } from '@/Stores/useMobileMenu';
import { useTaskModal } from '@/Stores/useTaskModal';
import { usePendingModal } from '@/Stores/usePendingModal';

function SidebarMenu() {
  const router = useRouter();

  const { toggle } = useMobileMenu();
  const { open } = useTaskModal();
  const { open: openPending } = usePendingModal();
  const onLinkClick = (path) => {
    router.push(path);
    toggle();
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
      <MenuButton
        aria="Go to Tasks Button"
        icon={SquareCheck}
        text="Pending Tasks"
      />
      <MenuButton
        aria="Create a new Task Button"
        icon={ClipboardList}
        text="Create Task"
        onClick={open}
      />
      <MenuButton
        aria="Go to Approval Button"
        icon={CheckCircle}
        text="Pending Approval"
        onClick={openPending}
      />
      <MenuButton
        aria="Go to Search Projects Button"
        icon={Search}
        text="Search"
      />
      <MenuButton
        aria="Go to Settings Button"
        icon={Settings}
        text="Settings"
      />
      <MenuButton aria="Go to User Account Button" icon={User} text="User" />
    </div>
  );
}

export default SidebarMenu;
