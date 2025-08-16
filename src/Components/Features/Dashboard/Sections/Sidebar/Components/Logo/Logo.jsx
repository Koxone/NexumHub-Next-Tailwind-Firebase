import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

function Logo() {
  const router = useRouter();
  return (
    <div className="relative h-[60px] w-[200px] max-w-[150px]">
      <Image
        onClick={() => router.push('/')}
        alt="Logo Image"
        src="/Images/Logos/Nexum-Logo-White.svg"
        fill
        className="h-auto w-full cursor-pointer object-contain"
        priority
      />
    </div>
  );
}

export default Logo;
