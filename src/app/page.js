import TopBar from '@/Components/Features/Topbar/TopBar';
import HeroSection from '@/Components/Sections/Hero/HeroSection';
import ExperienceSection from '@/Components/Sections/Experience/ExperienceSection';
export default function Home() {
  return (
    <div
      className={[
        'grid h-[100dvh] min-h-full w-full grid-rows-[auto_auto_1fr] justify-self-center lg:pl-64 xl:pl-25 2xl:max-w-[1280px]',
        'gap-12',
      ].join(' ')}
    >
      <TopBar />
      <HeroSection />
      <ExperienceSection />
    </div>
  );
}
