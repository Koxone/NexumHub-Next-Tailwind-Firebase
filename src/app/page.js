import TopBar from '@/Components/Features/Topbar/TopBar';
import HeroSection from '@/Components/Sections/Hero/HeroSection';
import ExperienceSection from '@/Components/Sections/Experience/ExperienceSection';
import StackSection from '@/Components/Features/Stack/StackSection';

export default function Home() {
  return (
    <div
      className={[
        'grid h-[100dvh] min-h-full w-full grid-rows-[auto_auto_1fr] gap-12 justify-self-center',
        'lg:max-w-[672px] lg:place-self-center',
        'xl:pl-25',
        '2xl:max-w-[1280px]',
      ].join(' ')}
    >
      <HeroSection />
      <div className="2xl:hidden">
        <ExperienceSection />
      </div>
      <div className="">
        <StackSection />
      </div>
    </div>
  );
}
