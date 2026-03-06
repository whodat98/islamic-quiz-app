import { de } from './de';
import { ar } from './ar';
import { Language } from '../context/LanguageContext';

export const translations = {
  de,
  ar,
};

export function useTranslation(language: Language) {
  return translations[language];
}
