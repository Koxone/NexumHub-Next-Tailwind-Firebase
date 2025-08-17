'use client';

import PendingAnimatedList from '@/Components/Features/Dashboard/Custom/PendingAnimatedList';
import TasksAnimatedList from '@/Components/Features/Dashboard/Custom/TasksAnimatedList';
import ProjectCard from '@/Components/Features/Dashboard/Sections/CurrentFeedback/Components/ProjectCard';
import TopBar from '@/Components/Features/Dashboard/Sections/Topbar/TopBar';
import StatsCard from '@/Components/Features/OpenProject/Cards/InfoCard';
import Title from '@/Components/Text/Title';

export default function Projects() {
  return (
    <div className="flex w-full flex-col gap-4 justify-self-center px-8">
      <TopBar padding="pt-8 pb-4" />

      <div className="flex flex-col gap-7">
        {/* Hero */}
        <div className="no-scrollbar flex flex-col gap-4 [scroll-behavior:smooth]">
          <Title title="Learn-Frontend" />
          <div className="mx-auto grid w-full flex-1 grid-cols-2 gap-4 md:grid-cols-3 md:grid-rows-1 xl:grid-cols-4">
            <ProjectCard src="Learn-Frontend.svg" color="bg-blue-500/30" />

            {/* Analytics */}
            <StatsCard
              title="Project Analytics"
              // linkText="View"
              onLinkClick={() => console.log('go to analytics')}
              items={[
                { label: 'Visitors', value: 0, color: 'bg-blue-600' },
                { label: 'Bounce Rate', value: '0%', color: 'bg-blue-600' },
                // { label: 'Users', value: 0, color: 'bg-blue-600' },
                { label: 'Active Users', value: 0, color: 'bg-blue-600' },
                { label: 'Users Online', value: 0, color: 'bg-green-600' },
              ]}
            />

            {/* Pending */}
            <StatsCard
              title="Pending"
              items={[
                { label: 'Total Tasks', value: 0, color: 'bg-green-600' },
                { label: 'Pending Tasks', value: 0, color: 'bg-blue-600' },
                { label: 'Completed Tasks', value: 0, color: 'bg-blue-600' },
                { label: 'Community Approvals', value: 0, color: 'bg-red-500' },
              ]}
            />
          </div>
        </div>

        {/* List */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <Title title="Tasks for this Project" />
            <TasksAnimatedList type="task" />
          </div>
          <div className="flex flex-col gap-4">
            <Title title="Pending on this Project" />
            <PendingAnimatedList
              collectionNames={['objects', 'reportLost', 'reportMissing']}
              showGradients={false}
              enableArrowNavigation={true}
              displayScrollbar={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
