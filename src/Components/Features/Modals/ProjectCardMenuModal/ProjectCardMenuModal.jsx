'use client';

import { useProjectCardMenu } from '@/Stores/useProjectCardMenu';
import React from 'react';

function ProjectCardMenuModal() {
  const { isOpen, closeProjectMenu } = useProjectCardMenu();
  return (
    <div className="border">
      <button>Delete Project</button>
    </div>
  );
}

export default ProjectCardMenuModal;
