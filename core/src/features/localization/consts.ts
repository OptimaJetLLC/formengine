import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import enUS from "rsuite/esm/locales/en_US";
import ruRU from "rsuite/esm/locales/ru_RU";
import arEG from "rsuite/esm/locales/ar_EG";
import {Language} from "./types";

export enum BiDi {
    LTR = 'ltr',
    RTL = 'rtl',
}

export const defaultLanguage: Language =
    new Language('en', 'US', 'English', 'American English')

export const languages: Language[] = [
    defaultLanguage,
    new Language('ru', 'RU', 'Русский', 'Russian'),
    new Language('ar', 'EG', 'عرب', 'Arabic (Egypt)', BiDi.RTL),
];

export const emotionCache = {
    LTR: createCache({
        key: BiDi.LTR
    }),
    RTL: createCache({
        key: BiDi.RTL,
        stylisPlugins: [rtlPlugin],
        prepend: true
    }),
};

export const defaultRSuiteLanguage = enUS;

export const rSuiteLanguages: { [key: string]: any } = {
    'en-US': enUS,
    'ru-RU': ruRU,
    'ar-EG': arEG,
    'en': enUS,
    'ru': ruRU,
    'ar': arEG
};

export const cssStyles = {
    [BiDi.LTR]: '/css/rsuite.min.css',
    [BiDi.RTL]: '/css/rsuite-rtl.min.css',
};
