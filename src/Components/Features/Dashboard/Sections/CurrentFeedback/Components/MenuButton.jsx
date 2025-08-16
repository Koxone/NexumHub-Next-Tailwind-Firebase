import { EllipsisVertical } from 'lucide-react';
import React from 'react';

function MenuButton() {
  return (
    <button
      aria-label="Project feedback menu (already submitted)"
      className="cursor-pointer"
    >
      <EllipsisVertical className="text-white" />
    </button>
  );
}

export default MenuButton;
