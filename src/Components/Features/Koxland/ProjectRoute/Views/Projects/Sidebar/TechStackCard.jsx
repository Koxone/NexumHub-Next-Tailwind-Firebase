import React from 'react';
import { LayersIcon } from '../../../Icons/LucideIcons';

const TechBadge = ({ name, color }) => (
  <span
    className={`inline-flex items-center rounded-md border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none ${color}`}
  >
    {name}
  </span>
);

const TechStackCard = ({ technologies }) => {
  return (
    <div className="backdrop-lg text-text-primary border-border-main/50 rounded-xl border shadow backdrop-blur-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="cur text-text-primary flex items-center gap-3 text-xl font-bold">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20">
            <LayersIcon className="text-blue-400" />
          </div>
          Tech Stack
        </h3>
      </div>
      <div className="p-6 pt-0">
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <TechBadge
              key={index}
              name={tech}
              color="inline-flex items-center cursor-auto rounded-md border border-blue-500/20 bg-accent-light/60 px-2.5 py-0.5 text-xs font-semibold text-text-primary shadow-sm transition-all duration-300 hover:scale-105 hover:bg-blue-500/20"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStackCard;
