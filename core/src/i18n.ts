import i18n, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import XHR from 'i18next-xhr-backend';

i18n
    .use(XHR)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        load: 'languageOnly',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        }
    } as InitOptions);

export default i18n;
