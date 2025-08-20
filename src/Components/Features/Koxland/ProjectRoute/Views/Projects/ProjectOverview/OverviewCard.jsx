import React from 'react';
import { FileTextIcon } from '../../../Icons/LucideIcons';

const OverviewCard = ({ overview, tOverview }) => {
  return (
    <section>
      <div className="backdrop-lg text-text-primary border-border-main/50 rounded-xl border shadow backdrop-blur-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h2 className="text-text-primary flex items-center gap-3 text-2xl font-bold">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20">
              <FileTextIcon className="text-blue-400" />
            </div>
            {tOverview}
          </h2>
        </div>
        <div className="p-6 pt-0">
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-lg leading-relaxed text-slate-300">{overview}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OverviewCard;
