import Dashboard from '@/Components/Features/Dashboard/Dashboard';
import LatestProjects from '@/Components/Features/Dashboard/Sections/CurrentFeedback/LatestProjects';
import Pending from '@/Components/Features/Dashboard/Sections/Pending/Pending';
import TopBar from '@/Components/Features/Dashboard/Sections/Topbar/TopBar';

export default function Home() {
  return (
    <div className="grid min-h-full grid-rows-[auto_auto_1fr]">
      <TopBar />
      <LatestProjects />
      <Pending />
    </div>
  );
}
