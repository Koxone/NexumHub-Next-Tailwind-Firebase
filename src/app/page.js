import TopBar from '@/Components/Features/Topbar/TopBar';
import ManualProjectCard from '@/Components/Features/ManualProjectCard/ManualProjectCard';
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
      {/* <GitFeatureProjects />
      <ManualProjectCard /> */}
    </div>
  );
}
