import { Home, Presentation, Settings, User } from 'lucide-react';
import React from 'react';

function MenuButton({ icon: Icon, text, aria, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={aria}
      className="flex w-full cursor-pointer items-center justify-start gap-2 rounded-lg border border-transparent p-2 text-white transition-all duration-75 ease-in-out hover:border-[#c0b9af] hover:text-neutral-300"
    >
      <Icon className="h-5 w-5" />
      {text}
    </button>
  );
}

export default MenuButton;
