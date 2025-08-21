'use client';

import React from 'react';
import { LanguagesIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

if (!i18next.isInitialized) {
  i18next.use(initReactI18next).init({
    resources: {
      en: { translation: {} },
      es: { translation: {} },
      pt: { translation: {} },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
}

export default function LanguageButton({ textColor = '' }) {
  const { i18n, ready } = useTranslation();
  if (!ready) return null;

  const code = (i18n.language || 'en').slice(0, 2).toLowerCase();
  const flagMap = {
    en: '/Assets/Flags/en.png',
    es: '/Assets/Flags/es.png',
    pt: '/Assets/Flags/pt.png',
  };
  const labelMap = { en: 'EN', es: 'ES', pt: 'PT' };
  const flagSrc = flagMap[code] || flagMap.en;
  const label = labelMap[code] || 'EN';

  const toggleLanguage = () => {
    if (code === 'en') i18n.changeLanguage('es');
    else if (code === 'es') i18n.changeLanguage('pt');
    else i18n.changeLanguage('en');
  };

  return (
    <li className="h-fit w-full list-none rounded-lg hover:bg-gray-700">
      <button
        type="button"
        onClick={toggleLanguage}
        aria-label="Switch Language"
        className="group flex cursor-pointer items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-text-primary dark:hover:bg-gray-700"
      >
        <LanguagesIcon className="h-5 w-5" />
        <span className={`ms-3 ${textColor} flex-1 whitespace-nowrap`}>{label}</span>
        <img
          src={flagSrc}
          alt={label}
          className="ms-2 h-5 w-7 rounded-[3px] object-cover"
          loading="lazy"
        />
      </button>
    </li>
  );
}
