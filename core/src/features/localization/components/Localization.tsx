import React, {ReactNode} from 'react';
import {Store} from '../../../stores/Store';
import {CacheProvider} from '@emotion/react';
import {CustomProvider} from 'rsuite';
import {observer} from 'mobx-react';
import {getFullLangCode} from '../utils';
import {BiDi, cssStyles, defaultRSuiteLanguage, emotionCache, rSuiteLanguages} from "../consts";

interface LocalizationProps {
    children: ReactNode;
    store: Store;
}

export const Localization = observer((props: LocalizationProps) => {
    loadCssFile(props.store.language.bidi);

    const rSuiteLang: any = rSuiteLanguages[getFullLangCode(props.store.language)]
        || rSuiteLanguages[props.store.language.code]
        || defaultRSuiteLanguage;

    const selectedCache = props.store.language.bidi === BiDi.RTL ? emotionCache.RTL : emotionCache.LTR;

    return (
        <CacheProvider value={selectedCache}>
            <CustomProvider rtl={props.store.language.bidi === BiDi.RTL} locale={rSuiteLang}>
                {props.children}
            </CustomProvider>
        </CacheProvider>
    );
});

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
