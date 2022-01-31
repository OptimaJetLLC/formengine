import { BiDi, Language } from './language';
import React from 'react';
import { Store } from '../../stores/Store';
import { CacheProvider } from '@emotion/react';
import { CustomProvider } from 'rsuite';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { observer } from 'mobx-react';
import { getFullLangCode } from './i18n-utils';
import { defaultRSuiteLanguage, rSuiteLanguages } from './rsuite-lang';
import 'rsuite/dist/rsuite.min.css';
// import 'rsuite/dist/rsuite-rtl.min.css'; todo

const emotionCache = {
    LTR: createCache({
        key: BiDi.ltr
    }),
    RTL: createCache({
        key: BiDi.rtl,
        stylisPlugins: [rtlPlugin],
        prepend: true
    }),
};

const loadCssFile = (href: string) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
    return link;
};

/*
let currentCssEl: any = null;
let biDi: BiDi | undefined;

function switchDirection(lang: Language) {
    if (biDi === lang.biDi) {
        return;
    }
    biDi = lang.biDi;
    const link = lang.biDi === BiDi.ltr ? 'rsuite/dist/rsuite.min.css' : 'rsuite/dist/rsuite-rtl.min.css';
    const cssEl = loadCssFile(link);

    cssEl.onload = () => {
        if (currentCssEl) {
            currentCssEl.parentNode.removeChild(currentCssEl);
        }
        currentCssEl = cssEl;
    };
}
*/

interface LocalizationProps {
    children: any;
    store: Store;
}

export const Localization = observer((props: LocalizationProps) => {
    // todo load rtl css

    const rSuiteLang: any = rSuiteLanguages[getFullLangCode(props.store.language)]
        || rSuiteLanguages[props.store.language.code]
        || defaultRSuiteLanguage;

    // todo switchDirection(props.store.language);

    const selectedCache = props.store.language.biDi === BiDi.rtl ? emotionCache.RTL : emotionCache.LTR;
    return (<CacheProvider value={selectedCache}>
            <CustomProvider rtl={props.store.language.biDi === BiDi.rtl} locale={rSuiteLang}>
                {props.children}
            </CustomProvider>
        </CacheProvider>
    );
});