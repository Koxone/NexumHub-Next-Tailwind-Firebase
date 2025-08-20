import React from 'react';
import {
  ExternalLinkIcon,
  GlobeIcon,
  GithubIcon,
  ArrowUpRightIcon,
} from '../../../Icons/LucideIcons';

const LinkCard = ({ href, icon: Icon, title, subtitle, iconBg, iconColor }) => (
  <a
    href={href}
    target="_blank"
    className="group flex items-center gap-3 rounded-lg p-3 transition-all duration-200 ease-in-out hover:scale-105 hover:bg-slate-700/30"
  >
    <div
      className={`h-8 w-8 rounded-lg ${iconBg} flex items-center justify-center`}
    >
      <Icon className={iconColor} />
    </div>
    <div className="flex-1">
      <p className="text-text-primary font-medium">{title}</p>
      <p className="text-sm text-slate-400">{subtitle}</p>
    </div>
    <ArrowUpRightIcon className="group-hover:text-text-primary text-slate-500 transition-colors" />
  </a>
);

const ProjectLinksCard = ({ url, urlGit }) => {
  const links = [
    {
      href: url,
      icon: GlobeIcon,
      title: 'Live Demo',
      subtitle: url ? url.split('/').filter(Boolean).pop() : '',
      iconBg: 'bg-blue-500/20',
      iconColor: 'text-blue-400',
    },
    {
      href: urlGit,
      icon: GithubIcon,
      title: 'Source Code',
      subtitle: urlGit ? urlGit.split('/').slice(4).join('/') : '',
      iconBg: 'bg-slate-700/50',
      iconColor: 'text-slate-300',
    },
  ];

  return (
    <div className="backdrop-lg text-text-primary border-border-main/50 rounded-xl border shadow backdrop-blur-sm">
      <div className="flex flex-col space-y-1.5 pt-6 pb-3 pl-6">
        <h3 className="text-text-primary flex items-center gap-3 text-xl font-bold">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20">
            <ExternalLinkIcon className="text-blue-400" />
          </div>
          Links
        </h3>
      </div>
      <div className="space-y-3 p-6 pt-0">
        {links.map((link, index) => (
          <LinkCard key={index} {...link} />
        ))}
      </div>
    </div>
  );
};

export default ProjectLinksCard;
