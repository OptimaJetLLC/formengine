import { BiDi, Language } from './language';

const languages: Language[] = [
    { code: 'en', biDi: BiDi.ltr, name: 'English' },
    { code: 'ru', biDi: BiDi.ltr, name: 'Русский' },
    { code: 'ae', biDi: BiDi.rtl, name: 'عرب' },
];

export default languages;