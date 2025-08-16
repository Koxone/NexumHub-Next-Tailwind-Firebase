import Dashboard from '@/Components/Features/Dashboard/Dashboard';
import LatestProjects from '@/Components/Features/Dashboard/Sections/CurrentFeedback/LatestProjects';
import Pending from '@/Components/Features/Dashboard/Sections/Pending/Pending';
import TopBar from '@/Components/Features/Dashboard/Sections/Topbar/TopBar';
import CreateTaskModal from '@/Components/Features/Modals/CreateTaskModal';

export default function Home() {
  return (
    <div className="grid min-h-full w-full max-w-[1200px] grid-rows-[auto_auto_1fr] mx-auto">
      <TopBar />
      <LatestProjects />
      <Pending />
      <CreateTaskModal />
    </div>
  );
}
