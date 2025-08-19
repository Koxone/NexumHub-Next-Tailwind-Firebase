import ReposAndMore from '@/Components/Features/Github/ReposAndMore';
import CreateTaskModal from '@/Components/Features/Modals/CreateTaskModal/CreateTaskModal';
import TopBar from '@/Components/Features/Topbar/TopBar';
import ProjectsSection from '@/Components/Sections/FeaturedInteractiveProjects/ProjectsSection';
import ManualProjectCard from '@/Components/Features/ManualProjectCard/ManualProjectCard';
import FeaturedManualProjects from '@/Components/Sections/FeaturedManualProjects/FeatureProjects';
import GitFeatureProjects from '@/Components/Sections/FeturedGitProjects/GitFeatureProjects';
export default function Home() {
  return (
    <div
      className={[
        'grid min-h-full w-full grid-rows-[auto_auto_1fr]',
        'gap-12',
      ].join(' ')}
    >
      <TopBar />
      {/* <FeaturedProjects /> */}
      {/* <ProjectsSection /> */}
      <GitFeatureProjects />
      <ManualProjectCard />
      {/* <ReposAndMore /> */}
    </div>
  );
}
