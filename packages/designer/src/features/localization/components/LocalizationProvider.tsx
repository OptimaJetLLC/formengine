import {CacheProvider} from '@emotion/react'
import {BiDi, emotionCache} from '@react-form-builder/core'
import {observer} from 'mobx-react'
import {ReactNode} from 'react'
import {CustomProvider} from 'rsuite'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {defaultComponentsLocale} from '../languageUtils'

interface LocalizationProps {
  children: ReactNode
}

export const LocalizationProvider = observer((props: LocalizationProps) => {
  const builderStore = useBuilderStore()
  loadCssFile(builderStore.formBuilderLanguage.bidi).catch(e => console.error(e))

  const componentsLocale = builderStore.componentsLocale ?? defaultComponentsLocale
  const selectedCache = builderStore.isRTL ? emotionCache.RTL : emotionCache.LTR

  return (
    <CacheProvider value={selectedCache}>
      <CustomProvider rtl={builderStore.isRTL} locale={componentsLocale} theme={builderStore.theme}>
        {props.children}
      </CustomProvider>
    </CacheProvider>
  )
})

let currentCssEl: any = null
let currentBiDi: BiDi | undefined = undefined

const cssFiles = import.meta.glob('../../../../public/css/*', {as: 'url'})

const cssUrls = {
  [BiDi.LTR]: cssFiles['../../../../public/css/rsuite.min.css'],
  [BiDi.RTL]: cssFiles['../../../../public/css/rsuite-rtl.min.css'],
}

const loadCssFile = async (biDi: BiDi) => {
  if (currentBiDi === biDi) return

  const link = document.createElement('link')
  link.id = `rsuite-${biDi}`
  link.rel = 'stylesheet'
  link.href = await cssUrls[biDi]()
  document.head.appendChild(link)
  link.onload = () => {
    currentBiDi = biDi
    if (currentCssEl) {
      currentCssEl.parentNode.removeChild(currentCssEl)
    }
    currentCssEl = link
  }
}
