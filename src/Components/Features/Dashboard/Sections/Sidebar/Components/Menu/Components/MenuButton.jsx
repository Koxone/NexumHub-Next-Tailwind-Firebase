import { Home, Presentation, Settings, User } from 'lucide-react';
import React from 'react';

function MenuButton({ icon: Icon, text, aria, onClick }) {
  return (
    <li className="h-fit list-none">
      <button
        onClick={onClick}
        aria-label={aria}
        className="group flex cursor-pointer items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
      >
        <Icon className="h-5 w-5" />
        <span className="ms-3 flex-1 whitespace-nowrap">{text}</span>
        <span className="ms-3 inline-flex h-3 w-3 items-center justify-center rounded-full bg-blue-100 p-3 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
          3
        </span>
      </button>
    </li>
  );
}

export default MenuButton;
