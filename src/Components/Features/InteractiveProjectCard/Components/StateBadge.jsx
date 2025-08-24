import React from 'react';

function StateBadge({ completed }) {
  let styles = '';
  let label = '';

  if (completed === true) {
    styles = 'bg-bg-emerald/60 border-emerald-500/20 text-emerald-950';
    label = 'Completed';
  } else if (completed === false) {
    styles = 'text-text-primary border-blue-500/20 bg-blue-500/60';
    label = 'In Progress';
  } else {
    styles = 'bg-yellow-500/60 border-yellow-500/20 text-white/80';
    label = 'Early Access';
  }

  return (
    <div className="absolute top-4 right-4 z-20">
      <div
        className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold shadow-lg backdrop-blur-sm ${styles}`}
      >
        {label}
      </div>
    </div>
  );
}

export default StateBadge;
