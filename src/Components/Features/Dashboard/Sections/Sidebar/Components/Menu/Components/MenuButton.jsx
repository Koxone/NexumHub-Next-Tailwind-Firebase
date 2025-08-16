import { Home, Presentation, Settings, User } from 'lucide-react';
import React from 'react';

function MenuButton({ icon: Icon, text, title }) {
  return (
    <button
      title={title}
      className="flex w-full cursor-pointer items-center justify-start gap-2 rounded-lg border border-transparent p-2 text-neutral-600 transition-all duration-100 ease-in-out hover:border-[#c0b9af] hover:text-black"
    >
      <Icon className="h-5 w-5" />
      {text}
    </button>
  );
}

export default MenuButton;
