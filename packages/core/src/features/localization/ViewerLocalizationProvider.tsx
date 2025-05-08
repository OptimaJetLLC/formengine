import {css, cx} from '@emotion/css'
import {CacheProvider} from '@emotion/react'
import type {ComponentType, ReactNode} from 'react'
import {useEffect} from 'react'
import {namedObserver} from '../../utils'
import {useStore} from '../../utils/contexts/StoreContext'
import type {FormViewerWrapperComponentProps} from '../define/utils/View'
import {useLicense} from '../license/LicenseManager'
import {BiDi} from './bidi'
import {emotionCache} from './emotionCache'
import type {Language} from './types'

interface ViewerLocalizationProviderProps {
  children: ReactNode
}

const localizationProviderClass = css`
  display: flex;
  width: 100%;
  height: 100%;
`

const viewerClassName = 'optimajet-formviewer'

const viewerClass = cx(viewerClassName, localizationProviderClass)

const nestViewerWrappers = ([Wrapper, ...more]: ComponentType<FormViewerWrapperComponentProps>[],
                            language: Language, children: ReactNode) => {
  return Wrapper
    ? <Wrapper language={language}>{nestViewerWrappers(more, language, children)}</Wrapper>
    : children
}

const RawViewerLocalizationProvider = (props: ViewerLocalizationProviderProps) => {
  const viewerStore = useStore()
  const language = viewerStore.displayedLanguage
  const {checkLicense, isNested} = useLicense()
  const selectedCache = language.bidi == BiDi.RTL ? emotionCache.RTL : emotionCache.LTR

  useEffect(() => {
    const loaders = viewerStore.formViewerPropsStore.view.getCssLoaders(language.bidi)
    loaders.forEach(loader => {
      loader().catch(e => console.error(e))
    })
  }, [language, viewerStore.formViewerPropsStore.view])

  useEffect(() => {
    if (isNested) return

    checkLicense([{
      name: 'ftLocaleCount',
      check: ({actualCount}, restrictionCount) => {
        if (restrictionCount === -1) return true

        return restrictionCount >= actualCount
      },
      actualCount: viewerStore.form.languages.length
    }],)
  }, [checkLicense, isNested, viewerStore.form.languages, viewerStore.form.languages.length])

  return (
    <div dir={language.bidi} lang={language.fullCode} className={viewerClass}>
      <CacheProvider value={selectedCache}>
        {nestViewerWrappers(viewerStore.formViewerPropsStore.view.viewerWrappers, language, props.children)}
      </CacheProvider>
    </div>
  )
}

export const ViewerLocalizationProvider = namedObserver('ViewerLocalizationProvider', RawViewerLocalizationProvider)
