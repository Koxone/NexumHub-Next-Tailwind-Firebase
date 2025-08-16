import React from 'react';

function PendingCard({ title, subtitle, type = 'task' }) {
  let bgClass = '';
  let borderClass = '';

  if (type === 'task') {
    bgClass = 'bg-white';
    borderClass = 'border-l-4 border-l-blue-500';
  } else if (type === 'approval') {
    bgClass = 'bg-yellow-50';
    borderClass = 'border-l-4 border-l-red-500';
  }

  return (
    <div
      className={`flex cursor-pointer flex-col gap-1 rounded-lg border border-neutral-200 px-4 py-2 shadow-sm transition-all duration-200 ease-in-out hover:scale-105 ${bgClass} ${borderClass}`}
    >
      <h4 className="text-base font-medium">{title}</h4>
      <p className="text-xs text-neutral-700">{subtitle}</p>
    </div>
  );
}

export default PendingCard;
