import tr from './tr';
import en from './en';

export const languages = { tr: 'Türkçe', en: 'English' };
export const defaultLang = 'tr';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as keyof typeof languages;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof languages) {
  return function t(key: string): string {
    const dict = lang === 'tr' ? tr : en;
    return (dict as Record<string, string>)[key] ?? key;
  };
}
