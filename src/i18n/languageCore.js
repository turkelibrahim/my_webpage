import { createContext } from 'react';
import { translations } from './translations';

export const DEFAULT_LANGUAGE = 'tr';
export const LANGUAGE_STORAGE_KEY = 'language';
export const SUPPORTED_LANGUAGES = Object.keys(translations);
export const LanguageContext = createContext(null);

export function getNestedValue(source, key) {
  return key.split('.').reduce((value, part) => {
    if (value && Object.prototype.hasOwnProperty.call(value, part)) {
      return value[part];
    }
    return undefined;
  }, source);
}
