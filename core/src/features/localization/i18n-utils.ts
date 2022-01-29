import { Language } from './language';
import { i18n } from './i18n';
import { defaultLanguage, languages } from './languages';

export function getFullLangCode(lang: Language): string {
    return `${lang.code}-${lang.dialect}`;
}

export async function onLanguageChange(lang: Language) {
    const langCode = getFullLangCode(lang);
    document.documentElement.lang = langCode;
    document.documentElement.dir = lang.biDi;
    await i18n.changeLanguage(langCode);
}

function findLanguageByCode(code: string, dialect?: string): Language | undefined {
    if (dialect) {
        return languages.find(lang => lang.code === code && lang.dialect === dialect);
    }
    return languages.find(lang => lang.code === code);
}

export function findLanguage(language: string): Language {
    const codes = language.split('-');
    if (codes.length > 1) {
        const code = codes[0];
        const dialect = codes[1];
        const langByFullCode = findLanguageByCode(code, dialect);
        if (langByFullCode) {
            return langByFullCode;
        }
        let languageByCode = findLanguageByCode(code);
        if (languageByCode) {
            return languageByCode;
        }
    }
    return findLanguageByCode(language) || defaultLanguage;
}
