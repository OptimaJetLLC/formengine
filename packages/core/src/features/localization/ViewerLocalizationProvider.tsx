import {CacheProvider} from '@emotion/react'
import {ComponentType, ReactNode, useEffect} from 'react'
import {namedObserver} from '../../utils'
import {useStore} from '../../utils/contexts/StoreContext'
import type {FormViewerWrapperComponentProps} from '../define/utils/View'
import {BiDi} from './bidi'
import {emotionCache} from './emotionCache'
import {Language} from './types'

interface ViewerLocalizationProviderProps {
  children: ReactNode,
  language?: Language
}

export const ViewerLocalizationProvider = namedObserver('ViewerLocalizationProvider', (props: ViewerLocalizationProviderProps) => {
  const viewerStore = useStore()
  const language = props.language ?? viewerStore.displayedLanguage

  useEffect(() => {
    const loaders = viewerStore.formViewerPropsStore.view.getCssLoaders(language.bidi)
    loaders.forEach(loader => {
      loader().catch(e => console.error(e))
    })
  }, [language, viewerStore.formViewerPropsStore.view])

  const selectedCache = language.bidi == BiDi.RTL ? emotionCache.RTL : emotionCache.LTR

  return (
    <div dir={language.bidi} lang={language.fullCode}>
      <CacheProvider value={selectedCache}>
        {nestViewerWrappers(viewerStore.formViewerPropsStore.view.viewerWrappers, language, props.children)}
      </CacheProvider>
    </div>
  )
})

const nestViewerWrappers = ([Wrapper, ...more]: ComponentType<FormViewerWrapperComponentProps>[],
                            language: Language, children: ReactNode) => {
  return Wrapper
    ? <Wrapper language={language}>{nestViewerWrappers(more, language, children)}</Wrapper>
    : children
}
