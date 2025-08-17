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
      className={`aspect-square h-full rounded-lg border bg-white p-4 shadow-sm ${className}`}
    >
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

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
              <span className="text-base font-medium text-gray-700">
                {label}
              </span>
            </div>
            <span className="text-sm font-semibold text-gray-900">{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
