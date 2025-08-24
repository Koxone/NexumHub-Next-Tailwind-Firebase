import '@/app/globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import localFont from 'next/font/local';
import I18nProvider from '@/Components/providers/languages/I18nProvider.jsx';
import MobileSideBar from '@/Components/Features/Sidebar/MobileSideBar';

import AdminChatPanel from '@/Components/Features/Chat/AdminChatPanel';
import KxChatEngine from '@/Components/Features/Chat/ChatUser/KxChatEngine';

import ChatModal from '@/Components/Features/Modals/ChatModal';
import CreateTaskModal from '@/Components/Features/Modals/CreateTaskModal/CreateTaskModal';
import CreateProjectModal from '@/Components/Features/Modals/CreateProjectModal/CreateProjectModal';

// Clerk
import { ClerkProvider } from '@clerk/nextjs';
import SideBar from '@/Components/Features/Sidebar/SideBar';
import StarFieldBackground from '@/Components/UI/Background/StarFieldBackground';

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
    <ClerkProvider>
      <html lang="en" className={`${inter.className} h-screen`}>
        <body className="bg-bg- h-screen overflow-x-hidden">
          <StarFieldBackground />
          <div
            className={[
              'mobile layout grid h-screen w-screen',
              'sm:',
              'md:',
              'lg:grid-cols-1',
              'xl:grid-cols-[260px_1fr]',
              '2xl:',
            ].join(' ')}
          >
            <SideBar />
            <main
              className={[
                'mobile mx-auto grid w-full items-center p-8',
                'sm:',
                'md:',
                'xl:col-start-2 xl:row-span-full xl:row-start-1',
                '2xl:',
              ].join(' ')}
            >
              <I18nProvider>{children}</I18nProvider>
            </main>
            <MobileSideBar />
            <CreateTaskModal />
            <ChatModal />
            <CreateProjectModal />
            <KxChatEngine />
            <AdminChatPanel />
          </div>
          <SpeedInsights />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
