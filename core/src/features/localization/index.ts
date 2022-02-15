import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';
import {OnInitCallback} from "./types";
import { Localization } from './components/Localization';
import { LangSwitch } from './components/LangSwitch';

export function initI18n(onInit: OnInitCallback) {
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
                },
            },
            (error) => {
                if (error) {
                    console.log('An error occurred while initializing the language', error);
                    return;
                }
                onInit(i18n.language);
            });
    return i18n;
}

export {Localization, LangSwitch}