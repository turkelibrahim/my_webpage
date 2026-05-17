import { useEffect, useMemo, useState } from 'react';
import { translations } from './translations';
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  SUPPORTED_LANGUAGES,
  LanguageContext,
  getNestedValue,
} from './languageCore';

function resolveInitialLanguage() {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;

  const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return SUPPORTED_LANGUAGES.includes(storedLanguage) ? storedLanguage : DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState(resolveInitialLanguage);

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const value = useMemo(() => {
    const setLanguage = language => {
      setCurrentLanguage(SUPPORTED_LANGUAGES.includes(language) ? language : DEFAULT_LANGUAGE);
    };

    const t = key => {
      const valueForCurrentLanguage = getNestedValue(translations[currentLanguage], key);
      if (valueForCurrentLanguage !== undefined) return valueForCurrentLanguage;

      const fallbackValue = getNestedValue(translations[DEFAULT_LANGUAGE], key);
      return fallbackValue !== undefined ? fallbackValue : key;
    };

    return {
      currentLanguage,
      setLanguage,
      t,
    };
  }, [currentLanguage]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
