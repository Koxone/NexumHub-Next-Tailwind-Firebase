import React from 'react';
import { useTranslation } from 'react-i18next';

function Technologies({ technologies = [] }) {
  const { t } = useTranslation();

  return (
    <div className="space-y-3">
      <div className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
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
          className="lucide lucide-sparkles h-4 w-4"
        >
          <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
          <path d="M20 3v4" />
          <path d="M22 5h-4" />
          <path d="M4 17v2" />
          <path d="M5 18H3" />
        </svg>
        <span>{t('projects.fws.techUsed')}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
          <div
            key={index}
            className="text-text-primary bg-accent-light/60 inline-flex items-center rounded-md border border-blue-500/20 px-2.5 py-0.5 text-xs font-semibold shadow-sm transition-all duration-300 hover:scale-105 hover:bg-blue-500/20"
          >
            {tech}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Technologies;
