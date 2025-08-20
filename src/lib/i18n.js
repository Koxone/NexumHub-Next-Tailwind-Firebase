import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Use dynamic imports with proper error handling for Vercel compatibility
let isInitialized = false;

const initializeI18n = async () => {
  if (isInitialized) return;

  try {
    // Dynamic imports for better Vercel compatibility
    const [enModule, esModule, ptModule] = await Promise.all([
      import('../locales/en/translation.json'),
      import('../locales/es/translation.json'),
      import('../locales/pt/translation.json'),
    ]);

    const resources = {
      en: { translation: enModule.default },
      es: { translation: esModule.default },
      pt: { translation: ptModule.default },
    };

    await i18n.use(initReactI18next).init({
      resources,
      lng: 'en',
      fallbackLng: 'en',
      interpolation: { escapeValue: false },
      react: {
        useSuspense: false,
      },
    });

    isInitialized = true;
  } catch (error) {
    console.error('Failed to initialize i18n:', error);
    // Fallback initialization with empty resources
    await i18n.use(initReactI18next).init({
      resources: {
        en: { translation: {} },
        es: { translation: {} },
        pt: { translation: {} },
      },
      lng: 'en',
      fallbackLng: 'en',
      interpolation: { escapeValue: false },
      react: {
        useSuspense: false,
      },
    });
    isInitialized = true;
  }
};

// Initialize on client side
if (typeof window !== 'undefined') {
  initializeI18n();
}

export default i18n;
export { initializeI18n };
