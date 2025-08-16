import '@/app/globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import I18nProvider from '@/Providers/I18nProvider';
import localFont from 'next/font/local';

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
        <div className="mx-auto flex h-full max-w-[1280px]">
          <I18nProvider>{children}</I18nProvider>
          <SpeedInsights />
        </div>
      </body>
    </html>
  );
}
