'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

function ProjectImage({ src, urlGit, id, className = '' }) {
  const router = useRouter();

  return (
    <div className={`relative ${className} overflow-hidden flex items-center`}>
      {/* Imagen */}
      <img
        alt="Project Image"
        src={src}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-110"
      />

      {/* Contenedor del botón */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {/* View Project Button */}
        <button
          onClick={() => router.push(`/project/${id}`)}
          className={[
            'flex cursor-pointer items-center gap-3',
            'border-border-main rounded-2xl border bg-blue-900/90',
            'p-3 shadow-lg',
            'transition-colors duration-200',
            'group-hover:border-blue-300 hover:bg-blue-950/90',
          ].join(' ')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 transition-transform duration-200 group-hover:scale-110"
          >
            <polygon points="6 3 20 12 6 21 6 3" />
          </svg>

          <span className="font-semibold text-gray-200">View Project</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
          >
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
          </svg>
        </button>

        {/* View Code Button */}
        <a
          href={urlGit}
          target="_blank"
          className="border-border-main flex items-center gap-2 rounded-xl border bg-blue-900/90 px-4 py-2 shadow-md transition-colors duration-200 group-hover:border-blue-300 hover:bg-blue-950/90"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="white"
            className="text-accent-light h-4 w-4 transition-transform duration-200 group-hover:scale-110"
          >
            <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.87 10.95c.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.36-1.3-1.72-1.3-1.72-1.06-.73.08-.71.08-.71 1.18.08 1.8 1.22 1.8 1.22 1.04 1.79 2.72 1.27 3.39.97.1-.76.41-1.27.75-1.56-2.56-.29-5.26-1.28-5.26-5.68 0-1.25.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.04 11.04 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.18-1.18 3.18-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.84 1.19 3.09 0 4.41-2.7 5.39-5.28 5.67.42.37.8 1.09.8 2.2 0 1.59-.02 2.87-.02 3.26 0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5z" />
          </svg>

          <span className="text-sm font-medium text-gray-200">View Code</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
          >
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default ProjectImage;
