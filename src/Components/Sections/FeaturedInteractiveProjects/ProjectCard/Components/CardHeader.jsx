import React from 'react';

function CardHeader({ tags = [], date }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 md:flex-nowrap">
      {/* Tags */}
      <div className="flex gap-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="inline-flex items-center rounded-md border border-blue-500/20 bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-400 shadow-sm"
          >
            {tag}
          </div>
        ))}
      </div>

      {/* Fecha */}
      <div className="bg-muted/30 text-muted-foreground flex items-center rounded-full px-3 py-1 text-xs whitespace-nowrap">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-calendar mr-1 h-3 w-3"
        >
          <path d="M8 2v4" />
          <path d="M16 2v4" />
          <rect width="18" height="18" x="3" y="4" rx="2" />
          <path d="M3 10h18" />
        </svg>
        {date}
      </div>
    </div>
  );
}

export default CardHeader;
