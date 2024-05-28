import {CacheProvider} from '@emotion/react'
import styled from '@emotion/styled'
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

const viewerClassName = 'optimajet-formviewer'

const RawViewerLocalizationProvider = (props: ViewerLocalizationProviderProps) => {
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
    <SDiv dir={language.bidi} lang={language.fullCode} className={viewerClassName}>
      <CacheProvider value={selectedCache}>
        {nestViewerWrappers(viewerStore.formViewerPropsStore.view.viewerWrappers, language, props.children)}
      </CacheProvider>
    </SDiv>
  )
}

export const ViewerLocalizationProvider = namedObserver('ViewerLocalizationProvider', RawViewerLocalizationProvider)

const SDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

const nestViewerWrappers = ([Wrapper, ...more]: ComponentType<FormViewerWrapperComponentProps>[],
                            language: Language, children: ReactNode) => {
  return Wrapper
    ? <Wrapper language={language}>{nestViewerWrappers(more, language, children)}</Wrapper>
    : children
}
