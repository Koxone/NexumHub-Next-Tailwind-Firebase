import { BellRing } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

function NotificationBell() {
  return (
    <div className="flex w-fit cursor-pointer items-center justify-center rounded-lg border bg-neutral-700 px-3 py-2 text-white transition-all duration-200 ease-in-out hover:bg-neutral-600">
      <BellRing />
    </div>
  );
}

export default NotificationBell;
