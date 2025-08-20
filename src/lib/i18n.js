// comments in English
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// static imports (Next.js will bundle them)
import en from '../locales/en/translation.json';
import es from '../locales/es/translation.json';
import pt from '../locales/pt/translation.json';

let isInitialized = false;

const initializeI18n = async () => {
  if (isInitialized) return;

  try {
    await i18n.use(initReactI18next).init({
      resources: {
        en: { translation: en },
        es: { translation: es },
        pt: { translation: pt },
      },
      lng: 'en', // default language
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false, // react already escapes
      },
      react: {
        useSuspense: false,
      },
    });

    isInitialized = true;
  } catch (err) {
    console.error('i18n init failed:', err);
  }
};

export { initializeI18n };
export default i18n;
