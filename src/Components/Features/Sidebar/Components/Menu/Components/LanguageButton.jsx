import { LanguagesIcon } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageButton({ text, textColor = '' }) {
  //i18 Language
  const { i18n, t, ready } = useTranslation();

  if (!ready) return null;

  const toggleLanguage = () => {
    if (i18n.language === 'en') {
      i18n.changeLanguage('es');
    } else if (i18n.language === 'es') {
      i18n.changeLanguage('pt');
    } else {
      i18n.changeLanguage('en');
    }
  };
  return (
    <li
      onClick={toggleLanguage}
      className="hover:bg-gray-dark h-fit w-full cursor-pointer list-none rounded-lg"
    >
      <button
        className={`group dark:text-text-primary text-bg-secondary dark:hover:bg-gray-dark hover:bg-brand-100 flex cursor-pointer items-center rounded-lg p-2`}
      >
        <LanguagesIcon className="h-5 w-5" />
        <span className={`ms-3 ${textColor} flex-1 whitespace-nowrap`}>
          {i18n.language.toUpperCase()}
        </span>
      </button>
    </li>
  );
}
