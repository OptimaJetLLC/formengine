import {CacheProvider} from '@emotion/react'
import {BiDi, cssUrls, defaultRSuiteLanguage, emotionCache, getFullLangCode, rSuiteLanguages, useBuilderStore} from 'fb-core'
import {observer} from 'mobx-react'
import {ReactNode} from 'react'
import {CustomProvider} from 'rsuite'

interface LocalizationProps {
  children: ReactNode
}

export const LocalizationProvider = observer((props: LocalizationProps) => {
  const store = useBuilderStore()
  loadCssFile(store.language.bidi)

  const rSuiteLang: any = rSuiteLanguages[getFullLangCode(store.language)]
    || rSuiteLanguages[store.language.code]
    || defaultRSuiteLanguage

  const selectedCache = store.isRTL ? emotionCache.RTL : emotionCache.LTR

  return (
    <CacheProvider value={selectedCache}>
      <CustomProvider rtl={store.isRTL} locale={rSuiteLang}>
        {props.children}
      </CustomProvider>
    </CacheProvider>
  )
})

let currentCssEl: any = null
let currentBiDi: BiDi | undefined

const loadCssFile = async (biDi: BiDi) => {
  if (currentBiDi === biDi) return

  const link = document.createElement('link')
  link.id = `rsuite-${biDi}`
  link.rel = 'stylesheet'
  link.href = await cssUrls[biDi]()
  document.head.appendChild(link)
  link.onload = () => {
    if (currentCssEl) {
      currentCssEl.parentNode.removeChild(currentCssEl)
    }
    currentCssEl = link
  }
}
