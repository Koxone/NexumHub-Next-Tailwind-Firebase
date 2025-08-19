import FeatureProjects from '@/Components/Features/Dashboard/Sections/FeatureProjects/FeatureProjects';
import GitFeatureProjects from '@/Components/Features/Dashboard/Sections/FeatureProjects/GitFeatureProjects';
import ReposAndMore from '@/Components/Features/Dashboard/Sections/ReposAndMore/ReposAndMore';
import ProjectsSection from '@/Components/Features/Koxland/ProjectSection/ProjectsSection';
import CreateTaskModal from '@/Components/Features/Modals/CreateTaskModal/CreateTaskModal';
import TopBar from '@/Components/Features/Topbar/TopBar';

export default function Home() {
  return (
    <div className="grid min-h-full w-full grid-rows-[auto_auto_1fr]">
      <TopBar />
      <ProjectsSection />
      {/* <FeatureProjects /> */}
      {/* <GitFeatureProjects /> */}
      <ReposAndMore />
    </div>
  );
}
