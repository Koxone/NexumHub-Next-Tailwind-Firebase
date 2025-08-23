import HeroSection from '@/Components/Sections/Hero/HeroSection';
import ExperienceSection from '@/Components/Sections/Experience/ExperienceSection';
import StackSection from '@/Components/Features/Stack/StackSection';

export default function Home() {
  return (
    <div
      className={[
        'mobile: grid min-h-full w-full gap-12 justify-self-center',
        'sm:',
        'md:w-full md:grid-rows-[auto_auto_1fr]',
        'lg:max-w-[672px] lg:place-self-center',
        // 'xl:pl-25',
        'xl:',
        '2xl:max-w-[1280px] 2xl:grid-rows-[1fr_auto]',
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
