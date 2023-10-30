import {CacheProvider} from '@emotion/react'
import {BiDi, emotionCache, loadResource, namedObserver, unloadResource} from '@react-form-builder/core'
import {ReactNode, useEffect} from 'react'
import {CustomProvider} from 'rsuite'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {defaultComponentsLocale} from '../languageUtils'

interface LocalizationProps {
  children: ReactNode
}

export const LocalizationProvider = namedObserver('LocalizationProvider', (props: LocalizationProps) => {
  const builderStore = useBuilderStore()
  const {bidi} = builderStore.formBuilderLanguage
  useEffect(() => {
    loadCssFile(bidi).catch(console.error)
  }, [bidi])

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

const cssFiles = import.meta.glob('../../../../public/css/*', {as: 'url'})

const cssUrls = {
  [BiDi.LTR]: cssFiles['../../../../public/css/rsuite.min.css'],
  [BiDi.RTL]: cssFiles['../../../../public/css/rsuite-rtl.min.css'],
}

const loadCssFile = async (biDi: BiDi) => {
  const href = await cssUrls[biDi]()
  await loadResource(`rsuite-${biDi}-css`, href, 'stylesheet')
  const previousBidi = biDi === BiDi.LTR ? BiDi.RTL : BiDi.LTR
  unloadResource(`rsuite-${previousBidi}-css`)
}
