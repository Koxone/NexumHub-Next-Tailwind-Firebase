import React from 'react';

function StateBadge({ completed }) {
  return (
    <div className="absolute top-4 right-4 z-20">
      <div
        className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold shadow-lg backdrop-blur-sm ${
          completed
            ? 'bg-bg-emerald/60 border-emerald-500/20 text-emerald-950'
            : 'text-text-primary border-blue-500/20 bg-blue-500/60'
        }`}
      >
        {completed ? 'Completed' : 'In Progress'}
      </div>
    </div>
  );
}

export default StateBadge;
