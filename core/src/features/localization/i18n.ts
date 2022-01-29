import { initI18n } from './i18n-init';

export type OnInitCallback = (language: string) => void;

let firstLang: string | undefined;
let callbacks: OnInitCallback[] = [];

export function onI18nInit(callback: OnInitCallback) {
    if (firstLang) {
        callback(firstLang);
        return;
    }
    callbacks.push(callback);
}

function onInit(language: string) {
    if (!firstLang) {
        firstLang = language;
    }
    while (callbacks.length) {
        const callback = callbacks.pop();
        callback && callback(firstLang);
    }
}

export const i18n = initI18n(onInit);
