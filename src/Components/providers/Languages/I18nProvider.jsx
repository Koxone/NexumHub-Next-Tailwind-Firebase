'use client';

import { I18nextProvider } from 'react-i18next';
import { useEffect, useState } from 'react';
import i18n, { initializeI18n } from '@/lib/i18n';

export default function I18nProvider({ children }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const setupI18n = async () => {
      try {
        await initializeI18n();
        setIsReady(true);
      } catch (error) {
        console.error('Error setting up i18n:', error);
        setIsReady(true); // Continue anyway with fallback
      }
    };

    setupI18n();
  }, []);

  // Show loading state while i18n is initializing
  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
