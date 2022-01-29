import i18n, { InitOptions } from 'i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

export type OnI18nInitCallback = (language: string) => void;

export function initI18n(onInit: OnI18nInitCallback) {
    i18n
        .use(XHR)
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
                // todo отключать в продуктивной сборке
                debug: true,
                fallbackLng: 'en-US',
                load: 'currentOnly',
                interpolation: {
                    escapeValue: false,
                }
            } as InitOptions,
            (error: any) => {
                if (error) {
                    console.log('An error occurred while initializing the language', error);
                    return;
                }
                onInit(i18n.language);
            });
    return i18n;
}
