'use client';

import AnimatedList from '@/Components/Features/Dashboard/Custom/AnimatedList';
import ProjectCard from '@/Components/Features/Dashboard/Sections/CurrentFeedback/Components/ProjectCard';
import TopBar from '@/Components/Features/Dashboard/Sections/Topbar/TopBar';
import Title from '@/Components/Text/Title';

export default function Projects() {
  return (
    <div className="flex min-h-0 w-full max-w-[1200px] flex-col gap-4 justify-self-center overflow-hidden px-8">
      <TopBar padding="pt-8 pb-4" />

      <div className="flex flex-col gap-7">
        {/* Hero */}
        <div className="no-scrollbar flex flex-col gap-4 [scroll-behavior:smooth]">
          <Title title="Learn-Frontend" />
          <div className="mx-auto grid w-full max-w-[1200px] flex-1 grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
            <ProjectCard src="Learn-Frontend.svg" color="bg-blue-500/30" />

            {/* Roadmap */}
            <div className="rounded-lg border bg-white p-4 shadow-sm">
              {/* Header */}
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Roadmap</h3>
                <a
                  href="#"
                  className="text-sm font-medium text-indigo-600 hover:underline"
                >
                  View
                </a>
              </div>

              {/* Items */}
              <ul className="space-y-3">
                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-600"></span>
                    <span className="text-base font-medium text-gray-700">
                      Urgent
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">0</span>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-orange-400"></span>
                    <span className="text-base font-medium text-gray-700">
                      Pending
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">0</span>
                </li>

                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-purple-600"></span>
                    <span className="text-base font-medium text-gray-700">
                      In Progress
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">0</span>
                </li>

                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    <span className="text-base font-medium text-gray-700">
                      Completed
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">0</span>
                </li>
              </ul>
            </div>

            {/* Filter */}
            <div className="rounded-lg border bg-white p-4 shadow-sm">
              {/* Header */}
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Pending Approval
                </h3>
              </div>

              {/* Items */}
              <ul className="space-y-3">
                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-600"></span>
                    <span className="text-base font-medium text-gray-700">
                      Urgent
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">0</span>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-orange-400"></span>
                    <span className="text-base font-medium text-gray-700">
                      Pending
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">0</span>
                </li>

                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-purple-600"></span>
                    <span className="text-base font-medium text-gray-700">
                      In Progress
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">0</span>
                </li>

                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    <span className="text-base font-medium text-gray-700">
                      Completed
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">0</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <Title title="Tasks for this Project" />
            <AnimatedList type="task" />
          </div>
          <div className="flex flex-col gap-4">
            <Title title="Pending on this Project" />
            <AnimatedList type="approval" />
          </div>
        </div>
      </div>
    </div>
  );
}
