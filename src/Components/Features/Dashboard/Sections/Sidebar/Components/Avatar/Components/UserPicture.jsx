'use client';

import { AlarmClock } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

function UserPicture() {
  const [isOnline, setIsOnline] = useState(false);
  const [isInactive, setIsInactive] = useState(true);

  return (
    <div className="relative z-10 h-[60px] w-[60px] rounded-full">
      {/* Imagen */}
      <div className="absolute inset-0 overflow-hidden rounded-full">
        <Image
          alt="User avatar picture"
          src="/FotoPerfil.png"
          fill
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
            {/* icono de reloj + texto horas */}
            <AlarmClock className="h-3 w-3 text-orange-500" />
            <p className="text-[10px] text-orange-500">20hrs</p>
          </>
        )}
      </div>
    </div>
  );
}

export default UserPicture;
