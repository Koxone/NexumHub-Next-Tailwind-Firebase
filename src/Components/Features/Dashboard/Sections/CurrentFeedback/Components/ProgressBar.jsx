import React from 'react';

function ProgressBar() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-start gap-4 divide-x divide-white text-sm text-white md:text-[9px] lg:text-sm">
        <p className="pr-2">10 Tasks</p>
        <p>50%</p>
      </div>

      <div className="w-full rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className="rounded-full bg-blue-600 p-0.5 text-center text-xs leading-none font-medium text-blue-100 md:text-[9px] lg:text-sm"
          style={{ width: '45%' }}
        >
          45%
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
