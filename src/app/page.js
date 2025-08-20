import TopBar from '@/Components/Features/Topbar/TopBar';
import StackSection from '@/Components/Features/Stack/StackSection';
import Avatar from '@/Components/UI/Avatar/Avatar';
import HeroSection from '@/Components/Sections/Hero/HeroSection';
import InteractiveProjectsSection from '@/Components/Sections/FeaturedInteractiveProjects/InteractiveProjectsSection';
export default function Home() {
  return (
    <div
      className={[
        'grid min-h-full w-full max-w-[1280px] grid-rows-[auto_auto_1fr] justify-self-center',
        'gap-12',
      ].join(' ')}
    >
      <TopBar />
      <HeroSection />
      {/* <InteractiveProjectsSection /> */}
    </div>
  );
}
