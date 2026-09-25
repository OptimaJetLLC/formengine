import type {BuilderMode} from '@react-form-builder/core'
import {useEffect, useLayoutEffect, useReducer} from 'react'

/**
 * The minimal store surface required to print the form from the designer.
 */
interface PrintFormStore {
  /**
   * The current designer mode.
   */
  builderMode: BuilderMode
  /**
   * Switches the designer mode.
   * @param value the target mode.
   */
  changeBuilderMode: (value: BuilderMode) => void
}

type PrintRequestListener = () => void

let printRequested = false
const listeners = new Set<PrintRequestListener>()

const subscribePrintRequest = (listener: PrintRequestListener): (() => void) => {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

const notifyPrintRequest = (): void => {
  listeners.forEach(listener => listener())
}

const consumePrintRequest = (): boolean => {
  if (!printRequested) return false
  printRequested = false
  return true
}

/**
 * Prints the form after the designer has committed viewer mode (via {@link usePrintWhenViewerReady}).
 * @param store the designer store.
 */
export function printForm(store: PrintFormStore): void {
  const previousMode = store.builderMode
  printRequested = true

  const restore = () => {
    if (store.builderMode !== previousMode) {
      store.changeBuilderMode(previousMode)
    }
  }
  window.addEventListener('afterprint', restore, {once: true})

  if (previousMode !== 'viewer') {
    store.changeBuilderMode('viewer')
    return
  }
  notifyPrintRequest()
}

/**
 * Calls `window.print` in a layout effect once the designer is in viewer mode and a print was requested.
 * @param builderMode the current designer mode.
 */
export function usePrintWhenViewerReady(builderMode: BuilderMode): void {
  const [requestVersion, bumpRequestVersion] = useReducer((version: number) => version + 1, 0)

  useEffect(() => subscribePrintRequest(bumpRequestVersion), [])

  useLayoutEffect(() => {
    if (builderMode !== 'viewer') return
    if (!consumePrintRequest()) return
    window.print()
  }, [builderMode, requestVersion])
}
