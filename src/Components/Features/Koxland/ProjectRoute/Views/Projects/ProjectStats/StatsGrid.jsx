import React from 'react';
import {
  ClockIcon,
  UsersIcon,
  CodeXmlIcon,
  AwardIcon,
} from '../../../Icons/LucideIcons';
import { useTranslation } from 'react-i18next';

const StatCard = ({ icon: Icon, label, value, iconBg, iconColor }) => (
  <div className="backdrop-lg flex w-fit items-center justify-center rounded-xl border border-blue-400/50 px-2 py-1 text-white shadow backdrop-blur-sm">
    <div className="flex items-center gap-3">
      <div
        className={`h-10 w-10 rounded-xl ${iconBg} flex items-center justify-center`}
      >
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </div>
      <div>
        <p className="text-xs text-slate-400">{label}</p>
        <p className="text-sm font-semibold text-white">{value}</p>
      </div>
    </div>
  </div>
);

const StatsGrid = ({ teamSize, technologies, status }) => {
  const { t } = useTranslation();

  const stats = [
    {
      icon: UsersIcon,
      label: 'Team Size',
      value: teamSize,
      iconBg: 'bg-blue-500/20',
      iconColor: 'text-blue-400',
    },
    {
      icon: CodeXmlIcon,
      label: 'Technologies',
      value: technologies,
      iconBg: 'bg-blue-500/20',
      iconColor: 'text-blue-400',
    },
    {
      icon: AwardIcon,
      label: 'Status',
      value: status,
      iconBg: 'bg-blue-500/20',
      iconColor: 'text-blue-400',
    },
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default StatsGrid;
