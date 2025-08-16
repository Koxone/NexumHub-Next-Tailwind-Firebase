import React from 'react';

function PendingCard({ title, subtitle, type = 'task', project }) {
  let bgClass = '';
  let borderClass = '';

  if (type === 'task') {
    bgClass = 'bg-white';
  } else if (type === 'approval') {
    bgClass = 'bg-yellow-50';
  }

  if (project === 'fws') {
    borderClass = 'border-l-4 border-l-red-600';
  } else if (project === 'testigo') {
    borderClass = 'border-l-4 border-l-neutral-600';
  } else if (project === 'learn') {
    borderClass = 'border-l-4 border-l-blue-600';
  }

  return (
    <div
      className={`flex cursor-pointer flex-col gap-1 rounded-lg border border-neutral-200 px-4 py-1 shadow-sm transition-all duration-200 ease-in-out hover:scale-105 ${bgClass} ${borderClass}`}
    >
      <h4 className="text-base font-medium">{title}</h4>
      <p className="text-xs text-neutral-700">{subtitle}</p>
    </div>
  );
}

export default PendingCard;
