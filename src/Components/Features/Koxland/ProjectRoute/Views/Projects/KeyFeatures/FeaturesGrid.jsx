import React from 'react';
import { ZapIcon, CircleCheckBigIcon } from '../../../Icons/LucideIcons';

const FeatureCard = ({ title, description }) => (
  <div className="flex items-start gap-4 rounded-2xl border border-blue-400/50 p-6 backdrop-blur-lg transition-all duration-300 hover:border-slate-600/50 hover:bg-slate-700/30">
    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-500/20">
      <CircleCheckBigIcon className="text-blue-400" />
    </div>
    <div>
      <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
      <p className="leading-relaxed text-slate-300">{description}</p>
    </div>
  </div>
);

const FeaturesGrid = ({ tFeatures, projectFeatures }) => {
  return (
    <section className='b backdrop-blur-sm'>
      <div className="rounded-xl border border-blue-400/50 text-white shadow backdrop-blur-lg">
        <div className="flex flex-col space-y-1.5 p-6">
          <h2 className="flex items-center gap-3 text-2xl font-bold text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20">
              <ZapIcon className="text-blue-400" />
            </div>
            {tFeatures}
          </h2>
        </div>
        <div className="p-6 pt-0">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {Array.isArray(projectFeatures)
              ? projectFeatures.map((feature, index) => (
                  <FeatureCard key={index} {...feature} />
                ))
              : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
