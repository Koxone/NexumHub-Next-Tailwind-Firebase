import React from 'react';
import { EyeIcon, ArrowUpRightIcon, GithubIcon } from '../Icons/LucideIcons';

const ProjectButtons = ({ demo, code }) => {
  return (
    <div className="flex flex-wrap gap-4">
      <a
        target="_blank"
        className="group text-text-primary flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-yellow-500 px-6 py-3 font-medium transition-all duration-300 hover:from-blue-600 hover:to-yellow-600 hover:shadow-lg hover:shadow-blue-500/25"
        href={demo}
      >
        <EyeIcon />
        View Live Project
        <ArrowUpRightIcon className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
      </a>
      <a
        target="_blank"
        className="backdrop-lg text-text-primary border-border-main/50 flex items-center gap-2 rounded-xl border px-6 py-3 font-medium transition-all duration-300 hover:bg-slate-700/50 hover:shadow-lg"
        href={code}
      >
        <GithubIcon />
        View Source Code
      </a>
    </div>
  );
};

export default ProjectButtons;
