import React from 'react';

function ProgressBar({ tasks = 10, percent = 45, pending = 5 }) {
  const pct = Math.max(0, Math.min(100, percent));

  const barColor =
    pct < 25 ? 'bg-red-500' : pct < 75 ? 'bg-orange-500' : 'bg-green-500';

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-start divide-x divide-white text-sm text-white md:text-[9px] lg:text-sm">
        <p className="pr-2">{tasks} Tasks</p>
        <p className="pl-2">{pending} Pending Approval</p>
      </div>

      <div
        className="w-full rounded-full bg-gray-200 dark:bg-gray-700"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progress"
      >
        <div
          className={`rounded-full ${barColor} p-0.5 text-center text-xs leading-none font-medium text-white transition-[width] duration-300 md:text-[9px] lg:text-sm`}
          style={{ width: `${pct}%` }}
        >
          {pct}%
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
