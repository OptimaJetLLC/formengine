import {CacheProvider} from '@emotion/react'
import {observer} from 'mobx-react'
import React, {ReactNode} from 'react'
import {CustomProvider} from 'rsuite'
import {Store} from '../../../stores/Store'
import {BiDi, cssStyles, defaultRSuiteLanguage, emotionCache, rSuiteLanguages} from '../consts'
import {getFullLangCode} from '../utils'

interface LocalizationProps {
  children: ReactNode;
  store: Store;
}

export const Localization = observer((props: LocalizationProps) => {
  loadCssFile(props.store.language.bidi)

  const rSuiteLang: any = rSuiteLanguages[getFullLangCode(props.store.language)]
    || rSuiteLanguages[props.store.language.code]
    || defaultRSuiteLanguage

  const selectedCache = props.store.language.bidi === BiDi.RTL ? emotionCache.RTL : emotionCache.LTR

  return (
    <CacheProvider value={selectedCache}>
      <CustomProvider rtl={props.store.language.bidi === BiDi.RTL} locale={rSuiteLang}>
        {props.children}
      </CustomProvider>
    </CacheProvider>
  )
})

let currentCssEl: any = null

let currentBiDi: BiDi | undefined

const loadCssFile = (biDi: BiDi) => {
  if (currentBiDi === biDi) return
  cssStyles[biDi]()
  currentBiDi = biDi
}
