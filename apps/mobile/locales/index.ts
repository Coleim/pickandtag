import * as Localization from 'expo-localization';
// import en from './en.json';
import fr from './fr.json';

const translations: Record<string, Record<string, string>> = {
  // en,
  fr,
};

const locale = Localization.getLocales()[0]?.languageCode ?? 'en';

export function translate(key: string, params?: Record<string, string | number>): string {
  let text = translations[locale]?.[key] ?? key;
  // Replace placeholders like {count} or {period}
  if (params) {
    Object.keys(params).forEach(k => {
      text = text.replace(`{${k}}`, String(params[k]));
    });
  }

  return text;
}

