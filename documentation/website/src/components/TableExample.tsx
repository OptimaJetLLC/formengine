import {ltrCssLoader, viewWithCss} from '@react-form-builder/components-rsuite'
import {tableModels} from '@react-form-builder/components-rsuite-table'
import {buildForm, FormViewerProps} from '@react-form-builder/core'
import CodeBlock from '@theme/CodeBlock'
import TabItem from '@theme/TabItem'
import Tabs from '@theme/Tabs'
import {Component, useEffect, useMemo, useRef, useState} from 'react'
import {FormViewer} from './FormViewer'
import styles from './TableExample.module.css'
import {useNearViewport} from './useNearViewport'

const emptyForm = buildForm().json()
const STYLE_READY_TIMEOUT_MS = 2000

type TableExampleStatus = 'loading-css' | 'mounting' | 'ready'

let rsuiteCssPromise: Promise<void> | null = null
let renderGate = Promise.resolve()

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

/**
 * Runs work behind a shared lock so only one example mounts at a time.
 * The lock is always released, even when work throws.
 * @param work async work to run
 * @returns the work result
 */
const withRenderLock = <T,>(work: () => Promise<T>): Promise<T> => {
  const run = renderGate.then(() => work(), () => work())
  renderGate = run.then(
    () => undefined,
    () => undefined,
  )
  return run
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

    let timeoutId = 0
    const finish = () => {
      observer.disconnect()
      resizeObserver?.disconnect()
      window.clearTimeout(timeoutId)
      resolve()
    }

    const observer = new MutationObserver(() => {
      if (isReady()) {
        finish()
      }
    })

    const resizeObserver = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(() => {
        if (isReady()) {
          finish()
        }
      })
      : null

    observer.observe(root, {childList: true, subtree: true})
    resizeObserver?.observe(root)
    timeoutId = window.setTimeout(finish, STYLE_READY_TIMEOUT_MS)
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

const TableWithData = ({ view, props }) => (
    <Tabs>
      <TabItem value="form" label="Form" default>
        <FormViewer view={view} getForm={getForm} {...props} />
      </TabItem>
      <TabItem value="json" label="JSON">
        <JsonBlock formName={props.formName}/>
      </TabItem>
    </Tabs>
)

const view = (() => {
  const result = viewWithCss
  tableModels.forEach(model => result.define(model))
  return result
})()

const TableExampleContent = (props: Partial<FormViewerProps>) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<TableExampleStatus>('loading-css')

  useEffect(() => {
    let cancelled = false

    withRenderLock(async () => {
      try {
        await ensureRsuiteCss()
      } catch (error) {
        console.error(error)
      }

      if (cancelled) {
        return
      }

      setStatus('mounting')
      await waitForNextPaint()
      await waitForNextPaint()

      if (cancelled) {
        return
      }

      const root = contentRef.current
      if (root) {
        await waitForTableLayout(root)
        await waitForNextPaint()
      }

      if (!cancelled) {
        setStatus('ready')
      }
    }).catch(console.error)

    return () => {
      cancelled = true
    }
  }, [])

  if (status === 'loading-css') {
    return <TableExampleSkeleton/>
  }

  const isReady = status === 'ready'

  return (
    <div className={styles.contentWrap}>
      {!isReady && (
        <div className={styles.skeletonOverlay}>
          <TableExampleSkeleton/>
        </div>
      )}
      <div
        ref={contentRef}
        className={isReady ? undefined : styles.pendingStyles}
        aria-hidden={!isReady}
      >
        <TableWithData view={view} props={props}/>
      </div>
    </div>
  )
}

export const TableExample = (props: Partial<FormViewerProps>) => {
  const {ref, isNearViewport} = useNearViewport()

  return (
    <div ref={ref} className={styles.container}>
      {isNearViewport ? <TableExampleContent {...props} /> : <TableExampleSkeleton/>}
    </div>
  )
}

export default TableExample
