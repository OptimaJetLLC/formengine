import BrowserOnly from '@docusaurus/BrowserOnly'
import {usePrismTheme} from '@docusaurus/theme-common'
import useIsBrowser from '@docusaurus/useIsBrowser'
import ReactLiveScope from '@theme/ReactLiveScope'
import React, {useMemo} from 'react'
import {LiveEditor, LiveError, LivePreview, LiveProvider} from 'react-live'
import styles from './LiveCodeWithDetails.module.css'

interface LiveCodeWithDetailsProps {
  children?: string
  code?: string
  summary?: string
}

const withAutoRender = (source: string): string => {
  const trimmed = source.trim()
  if (!trimmed) {
    return trimmed
  }

  if (trimmed.includes('render(')) {
    return trimmed
  }

  if (trimmed.includes('function App(') || trimmed.includes('const App =') || trimmed.includes('let App =')) {
    return `${trimmed}\n\nrender(<App />)`
  }

  return trimmed
}

const DEFAULT_TRANSFORM_CODE = (source: string) => `${source};`

export const LiveCodeWithDetails = ({children, code, summary = 'Show code'}: LiveCodeWithDetailsProps) => {
  const prismTheme = usePrismTheme()
  const isBrowser = useIsBrowser()
  const source = useMemo(() => withAutoRender((code ?? children ?? '').toString()), [children, code])

  return (
    <div className={styles.container}>
      <LiveProvider
        theme={prismTheme}
        code={source.replace(/\n$/, '')}
        scope={ReactLiveScope as Record<string, unknown>}
        noInline
        transformCode={DEFAULT_TRANSFORM_CODE}
      >
        <div className={styles.playgroundHeaderPrimary}>Result</div>
        <div className={styles.preview}>
          <BrowserOnly fallback={<div>Loading...</div>}>
            {() => (
              <>
                <LivePreview/>
                <LiveError className={styles.error}/>
              </>
            )}
          </BrowserOnly>
        </div>

        <details className={styles.details}>
          <summary className={styles.summary}>
            <div className={styles.playgroundHeader}>{summary}</div>
          </summary>
          <div className={styles.editorWrap}>
            <LiveEditor
              key={String(isBrowser)}
              className={styles.editor}
            />
          </div>
        </details>
      </LiveProvider>
    </div>
  )
}
