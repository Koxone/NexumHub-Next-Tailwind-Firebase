import { Menu } from 'lucide-react';
import React from 'react';

function MobileMenuButton() {
  return (
    <div className="flex md:hidden">
      <Menu className="cursor-pointer text-white" />
    </div>
  );
}

export default MobileMenuButton;
