import { BiDi, Language } from './language';

export const defaultLanguage =
    { code: 'en', dialect: 'US', biDi: BiDi.ltr, name: 'English', description: 'American English' };

export const languages: Language[] = [
    defaultLanguage,
    { code: 'ru', dialect: 'RU', biDi: BiDi.ltr, name: 'Русский', description: 'Russian' },
    { code: 'ar', dialect: 'EG', biDi: BiDi.rtl, name: 'عرب', description: 'Arabic (Egypt)' },
];
