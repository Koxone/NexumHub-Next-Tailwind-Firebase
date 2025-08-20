import { BellRing } from 'lucide-react';
import React from 'react';

export default function NotificationBell() {
  return (
    <div className="group text-text-primary flex h-fit cursor-pointer items-center justify-center rounded-lg border bg-neutral-700 px-3 py-3 transition-colors duration-200 ease-in-out hover:bg-neutral-600">
      <BellRing className="bell-swing h-5 w-5" />
    </div>
  );
}
