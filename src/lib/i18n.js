import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '../locales/en/english.json';
import es from '../locales/es/spanish.json';
import pt from '../locales/pt/portugues.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      pt: { translation: pt },
    },

    lng: 'en',
    fallbackLng: 'en',

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false,
    },

    debug: process.env.NODE_ENV === 'development',

    keySeparator: '.',
    nsSeparator: false,

    react: {
      useSuspense: false,
    },
  });

export default i18n;
