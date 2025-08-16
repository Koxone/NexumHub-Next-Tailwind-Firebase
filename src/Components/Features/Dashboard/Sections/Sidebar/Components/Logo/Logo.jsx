import Image from 'next/image';
import React from 'react';

function Logo() {
  return (
    <div className="relative h-[60px] max-w-[150px]">
      <Image
        alt="Logo Image"
        src="/Images/Logos/Nexum-Logo-White.svg"
        fill
        className="h-auto w-full object-contain"
        priority
      />
    </div>
  );
}

export default Logo;
