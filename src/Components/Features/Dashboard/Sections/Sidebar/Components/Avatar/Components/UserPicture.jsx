'use client';

import OwnerLastLogin from '@/Components/Features/Dashboard/Custom/OwnerLastLogin';
import { AlarmClock } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

function UserPicture() {
  const [isOnline, setIsOnline] = useState(false);
  const [isInactive, setIsInactive] = useState(true);

  return (
    <div className="relative z-10 h-[60px] w-[60px] rounded-full">
      {/* Imagen */}
      <div className="relative h-10 w-10 overflow-hidden rounded-full sm:h-12 sm:w-12 md:h-14 md:w-14">
        <Image
          alt="User avatar picture"
          src="/FotoPerfil.png"
          fill
          sizes="(max-width: 640px) 40px, (max-width: 768px) 48px, 56px"
          className="object-cover"
          priority
        />
      </div>

      {/* Badge de estado */}
      <div
        title="User Online State"
        className="border-bg absolute -bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1 rounded-full border bg-white px-2 py-0.5"
      >
        {isOnline && !isInactive && (
          <>
            {/* circulito verde + texto Online */}
            <span className="h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500"></span>
            <p className="text-[10px] text-green-600">Online</p>
          </>
        )}

        {isInactive && !isOnline && (
          <>
            <OwnerLastLogin />
          </>
        )}
      </div>
    </div>
  );
}

export default UserPicture;
