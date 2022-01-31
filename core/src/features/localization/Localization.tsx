import { BiDi } from './language';
import React from 'react';
import { Store } from '../../stores/Store';
import { CacheProvider } from '@emotion/react';
import { CustomProvider } from 'rsuite';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { observer } from 'mobx-react';
import { getFullLangCode } from './i18n-utils';
import { defaultRSuiteLanguage, rSuiteLanguages } from './rsuite-lang';

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

const cssStyles = {
    [BiDi.ltr]: '/css/rsuite.min.css',
    [BiDi.rtl]: '/css/rsuite-rtl.min.css',
};

let currentCssEl: any = null;
let currentBiDi: BiDi | undefined;

const loadCssFile = (biDi: BiDi) => {
    if (currentBiDi === biDi) {
        return;
    }

    const link = document.createElement('link');
    link.id = `rsuite-${biDi}`;
    link.rel = 'stylesheet';
    link.href = cssStyles[biDi];
    document.head.appendChild(link);
    link.onload = () => {
        if (currentCssEl) {
            currentCssEl.parentNode.removeChild(currentCssEl);
        }
        currentCssEl = link;
    };
};

interface LocalizationProps {
    children: any;
    store: Store;
}

export const Localization = observer((props: LocalizationProps) => {
    loadCssFile(props.store.language.biDi);

    const rSuiteLang: any = rSuiteLanguages[getFullLangCode(props.store.language)]
        || rSuiteLanguages[props.store.language.code]
        || defaultRSuiteLanguage;

    const selectedCache = props.store.language.biDi === BiDi.rtl ? emotionCache.RTL : emotionCache.LTR;
    return (<CacheProvider value={selectedCache}>
            <CustomProvider rtl={props.store.language.biDi === BiDi.rtl} locale={rSuiteLang}>
                {props.children}
            </CustomProvider>
        </CacheProvider>
    );
});