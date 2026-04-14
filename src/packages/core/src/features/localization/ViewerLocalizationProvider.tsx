import cx from 'clsx'
import type {ComponentType, ReactNode} from 'react'
import {useEffect} from 'react'
import {useStore} from '../../utils/contexts/StoreContext'
import {namedObserver} from '../../utils/namedObserver'
import type {FormViewerWrapperComponentProps} from '../define/utils/FormViewerWrapperComponentProps'
import {AsyncQueue} from './AsyncQueue'
import type {Language} from './language'
import styles from './ViewerLocalizationProvider.module.css'

interface ViewerLocalizationProviderProps {
  children: ReactNode
}

const viewerClassName = 'optimajet-formviewer'

const viewerClass = cx(viewerClassName, styles.localizationProvider)

const nestViewerWrappers = ([Wrapper, ...more]: ComponentType<FormViewerWrapperComponentProps>[],
                            language: Language, children: ReactNode) => {
  return Wrapper
    ? <Wrapper language={language}>{nestViewerWrappers(more, language, children)}</Wrapper>
    : children
}

const cssLoadersQueue = new AsyncQueue()

const RawViewerLocalizationProvider = (props: ViewerLocalizationProviderProps) => {
  const viewerStore = useStore()
  const language = viewerStore.displayedLanguage
  const {view} = viewerStore.formViewerPropsStore

  useEffect(() => {
    const loaders = view.getCssLoaders(language.bidi)
    loaders.forEach(loader => {
      cssLoadersQueue.add(loader).catch(console.error)
    })
  }, [language, view])

  const viewer = <div dir={language.bidi} lang={language.fullCode} className={viewerClass}>
    {props.children}
  </div>

  return nestViewerWrappers(view.viewerWrappers, language, viewer)
}

export const ViewerLocalizationProvider = namedObserver('ViewerLocalizationProvider', RawViewerLocalizationProvider)
