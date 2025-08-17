import '@/app/globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import localFont from 'next/font/local';
import SideBar from '@/Components/Features/Dashboard/Sections/Sidebar/SideBar';
import MobileSideBar from '@/Components/Features/Dashboard/Custom/MobileSideBar';
import TaskAndPendingModal from '@/Components/Features/Modals/TaskAndPendingModal';
import CreateTaskModal from '@/Components/Features/Modals/CreateTaskModal/CreateTaskModal';

export const metadata = {
  title: {
    default: 'NexumHub - Project Control Center',
    template: '%s | NexumHub',
  },
  description:
    'NexumHub is a centralized dashboard to unify pending tasks, approvals, reviews, and reports across all your projects, with real-time notifications and clear workflows.',
  keywords: [
    'NexumHub',
    'project dashboard',
    'pending tasks',
    'pending approvals',
    'real-time notifications',
    'code reviews',
    'reports',
    'integrations',
    'productivity',
    'devtools',
    'project management',
  ],
  metadataBase: new URL('https://nexumhub.dev'),
  openGraph: {
    title: 'NexumHub - Project Control Center',
    description:
      'Unify tasks, approvals, reviews, and reports from all your projects in one place. Real-time notifications and per-project views.',
    url: 'https://nexumhub.dev',
    siteName: 'NexumHub',
    images: [
      {
        url: 'https://nexumhub.dev/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NexumHub - Centralized dashboard',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Koxone',
    creator: '@Koxone',
    title: 'NexumHub - Project Control Center',
    description:
      'A centralized dashboard for tasks, approvals, reviews, and reports with real-time notifications.',
    images: ['https://nexumhub.dev/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      maxVideoPreview: -1,
      maxImagePreview: 'large',
      maxSnippet: -1,
    },
  },
  alternates: {
    canonical: 'https://nexumhub.dev',
    languages: {
      'en-US': 'https://nexumhub.dev/en',
      'es-MX': 'https://nexumhub.dev',
    },
  },
  authors: [
    { name: 'Juan Carlos de León Ozuna', url: 'https://github.com/Koxone' },
  ],
  creator: 'Juan Carlos de León Ozuna',
  publisher: 'NexumHub',
  category: 'Productivity, DevTools, Project Management',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
};

const inter = localFont({
  src: '../Fonts/Inter.ttf',
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.className} h-full`}>
      <body className="bg-bg-secondary h-full">
        <div className="bg-bg-main grid h-full w-full border border-neutral-700/40 shadow-2xl lg:grid-cols-[auto_1fr]">
          <SideBar />
          <MobileSideBar />
          <CreateTaskModal />
          <TaskAndPendingModal />
          <div className="grid mx-auto min-h-full max-w-[1280px] min-w-0 grid-rows-[auto_auto_1fr]">
            {children}
          </div>
        </div>
        <SpeedInsights />
      </body>
    </html>
  );
}
