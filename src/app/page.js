import Dashboard from '@/Components/Features/Dashboard/Dashboard';
import LatestProjects from '@/Components/Features/Dashboard/Sections/CurrentFeedback/LatestProjects';
import ReposAndMore from '@/Components/Features/Dashboard/Sections/ReposAndMore/ReposAndMore';
import TopBar from '@/Components/Features/Dashboard/Sections/Topbar/TopBar';
import CreateTaskModal from '@/Components/Features/Modals/CreateTaskModal/CreateTaskModal';

export default function Home() {
  return (
    <div className="grid min-h-full w-full grid-rows-[auto_auto_1fr]">
      <TopBar />
      <LatestProjects />
      <ReposAndMore />
    </div>
  );
}
