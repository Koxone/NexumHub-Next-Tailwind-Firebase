'use client';

import React from 'react';

export default function StatsCard({
  title = 'Stats',
  linkText,
  onLinkClick,
  items = [],
  className = '',
}) {
  return (
    <div
      className={`aspect-square h-full rounded-lg border shadow-sm md:p-5 xl:p-7 ${className}`}
    >
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-text-primary text-lg font-semibold">{title}</h3>

        {/* Render link only if provided */}
        {linkText && (
          <button
            type="button"
            onClick={onLinkClick}
            className="text-sm font-medium text-indigo-600 hover:underline"
          >
            {linkText}
          </button>
        )}
      </div>

      {/* Items */}
      <ul className="space-y-3">
        {items.map(({ label, value, color = 'bg-blue-600' }, idx) => (
          <li
            key={`${label}-${idx}`}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              {/* Color dot */}
              <span className={`h-2 w-2 rounded-full ${color}`}></span>
              <span className="text-text-primary text-base font-medium">
                {label}
              </span>
            </div>
            <span className="text-text-primary text-sm font-semibold">
              {value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
