import {ltrCssLoader, viewWithCss} from '@react-form-builder/components-rsuite'
import {tableModels} from '@react-form-builder/components-rsuite-table'
import {buildForm, FormViewerProps} from '@react-form-builder/core'
import CodeBlock from '@theme/CodeBlock'
import TabItem from '@theme/TabItem'
import Tabs from '@theme/Tabs'
import {useEffect, useMemo, useRef, useState} from 'react'
import {FormViewer} from './FormViewer'
import styles from './TableExample.module.css'
import {useNearViewport} from './useNearViewport'
import {useSequentialRender} from './useSequentialRender'

const emptyForm = buildForm().json()
const STYLE_READY_TIMEOUT_MS = 2000

let rsuiteCssPromise: Promise<void> | null = null

/**
 * Loads RSuite LTR stylesheet once and reuses the result for subsequent examples.
 * @returns promise that resolves when the stylesheet is available
 */
const ensureRsuiteCss = (): Promise<void> => {
  if (!rsuiteCssPromise) {
    rsuiteCssPromise = ltrCssLoader().then(() => undefined)
  }
  return rsuiteCssPromise
}

const waitForNextPaint = (): Promise<void> =>
  new Promise(resolve => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve())
    })
  })

/**
 * Waits until the table has a non-zero layout, or until timeout.
 * @param root element that contains the table
 * @returns promise that resolves when layout is ready
 */
const waitForTableLayout = (root: HTMLElement): Promise<void> =>
  new Promise(resolve => {
    const isReady = () => {
      const table = root.querySelector('.rs-table')
      if (!table) {
        return false
      }
      const rect = table.getBoundingClientRect()
      return rect.width > 0 && rect.height > 0
    }

    if (isReady()) {
      resolve()
      return
    }

    const observer = new MutationObserver(() => {
      if (isReady()) {
        cleanup()
        resolve()
      }
    })

    const resizeObserver = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(() => {
        if (isReady()) {
          cleanup()
          resolve()
        }
      })
      : null

    const timeoutId = window.setTimeout(() => {
      cleanup()
      resolve()
    }, STYLE_READY_TIMEOUT_MS)

    const cleanup = () => {
      observer.disconnect()
      resizeObserver?.disconnect()
      window.clearTimeout(timeoutId)
    }

    observer.observe(root, {childList: true, subtree: true})
    resizeObserver?.observe(root)
  })

const getForm = async (formName?: string) => {
  if (!formName) return emptyForm

  try {
    const data = await import(`./forms/table/${formName}.json`)
    return data ? JSON.stringify(data, null, 2) : emptyForm
  } catch (e) {
    return emptyForm
  }
}

const JsonBlock = ({formName}: { formName?: string }) => {
  const [json, setJson] = useState('')

  useEffect(() => {
    getForm(formName)
      .then(setJson)
      .catch(console.error)
  }, [formName])

  return <div>
    <CodeBlock className="json-code-block-container" language="json">{json}</CodeBlock>
  </div>
}

const TableExampleSkeleton = () => (
  <div className={styles.skeleton} aria-hidden="true">
    <div className={styles.tabs}>
      <div className={`${styles.tab} ${styles.shimmer} ${styles.tabWide}`}/>
      <div className={`${styles.tab} ${styles.shimmer}`}/>
    </div>
    <div className={styles.content}>
      <div className={styles.textLine}/>
      <div className={styles.textLineShort}/>
      <div className={styles.tableHeader}/>
      <div className={styles.tableRow}/>
      <div className={styles.tableRow}/>
      <div className={styles.tableRow}/>
      <div className={styles.tableRow}/>
      <div className={styles.tableRow}/>
    </div>
  </div>
)

const TableExampleContent = ({onRendered, ...props}: Partial<FormViewerProps> & { onRendered: () => void }) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const [cssReady, setCssReady] = useState(false)
  const [isStyled, setIsStyled] = useState(false)

  const view = useMemo(() => {
    const result = viewWithCss
    tableModels.forEach(model => result.define(model))
    return result
  }, [])

  useEffect(() => {
    let cancelled = false

    ensureRsuiteCss()
      .then(() => {
        if (!cancelled) {
          setCssReady(true)
        }
      })
      .catch(console.error)

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!cssReady || isStyled || !contentRef.current) {
      return
    }

    let cancelled = false
    const root = contentRef.current

    const reveal = async () => {
      await waitForTableLayout(root)
      await waitForNextPaint()
      if (cancelled) {
        return
      }
      setIsStyled(true)
      onRendered()
    }

    reveal().catch(console.error)

    return () => {
      cancelled = true
    }
  }, [cssReady, isStyled, onRendered])

  if (!cssReady) {
    return <TableExampleSkeleton/>
  }

  return (
    <div className={styles.contentWrap}>
      {!isStyled && (
        <div className={styles.skeletonOverlay}>
          <TableExampleSkeleton/>
        </div>
      )}
      <div
        ref={contentRef}
        className={isStyled ? undefined : styles.pendingStyles}
        aria-hidden={!isStyled}
      >
        <Tabs>
          <TabItem value="form" label="Form" default>
            <FormViewer view={view} getForm={getForm} {...props} />
          </TabItem>
          <TabItem value="json" label="JSON">
            <JsonBlock formName={props.formName}/>
          </TabItem>
        </Tabs>
      </div>
    </div>
  )
}

export const TableExample = (props: Partial<FormViewerProps>) => {
  const {ref, isNearViewport} = useNearViewport()
  const {canRender, markRendered} = useSequentialRender(isNearViewport)

  return (
    <div ref={ref} className={styles.container}>
      {canRender ? <TableExampleContent {...props} onRendered={markRendered} /> : <TableExampleSkeleton/>}
    </div>
  )
}

export default TableExample
