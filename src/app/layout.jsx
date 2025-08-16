import '@/app/globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import I18nProvider from '@/Providers/I18nProvider';
import localFont from 'next/font/local';
import SideBar from '@/Components/Features/Dashboard/Sections/Sidebar/SideBar';

export const metadata = {
  title: 'Feedback Board',
  description: 'A board for collecting and managing feedback on projects.',
};

const inter = localFont({
  src: '../Fonts/Inter.ttf',
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.className} h-full`}>
      <body className="bg-bg-secondary h-full">
        <I18nProvider>
          <div className="bg-bg-main grid h-full w-full border border-neutral-700/40 shadow-2xl md:grid-cols-[auto_1fr]">
            <SideBar />
            <div className="grid min-h-full min-w-0 grid-rows-[auto_auto_1fr]">
              {children}
            </div>
          </div>
          <SpeedInsights />
        </I18nProvider>
      </body>
    </html>
  );
}
