import TopBar from '@/Components/Features/Topbar/TopBar';
import StackSection from '@/Components/Features/Stack/StackSection';
import Avatar from '@/Components/UI/Avatar/Avatar';
import HeroSection from '@/Components/Sections/Hero/HeroSection';
import InteractiveProjectsSection from '@/Components/Sections/FeaturedInteractiveProjects/InteractiveProjectsSection';
import ExperienceSection from '@/Components/Sections/Experience/ExperienceSection';
export default function Home() {
  return (
    <div
      className={[
        'grid h-[100dvh] min-h-full w-full max-w-[1280px] grid-rows-[auto_auto_1fr] justify-self-center lg:pl-64 xl:pl-25',
        'gap-12',
      ].join(' ')}
    >
      <TopBar />
      <HeroSection />
      <ExperienceSection />
      {/* <InteractiveProjectsSection /> */}
    </div>
  );
}
