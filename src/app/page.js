import Dashboard from '@/Components/Features/Dashboard/Dashboard';
import CurrentFeedback from '@/Components/Features/Dashboard/Sections/CurrentFeedback/CurrentFeedback';
import Pending from '@/Components/Features/Dashboard/Sections/Pending/Pending';
import TopBar from '@/Components/Features/Dashboard/Sections/Topbar/TopBar';

export default function Home() {
  return (
    <div className="grid min-h-full grid-rows-[auto_auto_1fr]">
      <TopBar />
      <CurrentFeedback />
      <Pending />
    </div>
  );
}
