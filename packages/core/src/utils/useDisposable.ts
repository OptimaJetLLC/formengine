import {useCallback, useEffect, useRef, useSyncExternalStore} from 'react'

/**
 * Type of disposable object.
 */
export type IDisposable = {
  /**
   * Performs the tasks necessary to release resources correctly.
   */
  dispose: () => void
}

type DisposableBox<T> = {
  current: T | undefined
  listeners: Set<() => void>
}

const createDisposableBox = <T>(): DisposableBox<T> => ({
  current: undefined,
  listeners: new Set(),
})

const publishDisposable = <T>(box: DisposableBox<T>, value: T | undefined) => {
  box.current = value
  box.listeners.forEach(listener => listener())
}

/**
 * Creates a disposable object and dispose the object when the React component is unmounted. **Internal use only.**
 * The instance is created in an effect so Strict Mode can dispose the first instance and create another one.
 * @param factory the factory function to create a disposable object.
 * @returns the disposable object.
 */
export function useDisposable<T extends IDisposable>(factory: () => T): T | undefined {
  const boxRef = useRef<DisposableBox<T> | null>(null)
  if (boxRef.current === null) boxRef.current = createDisposableBox<T>()

  const subscribe = useCallback((listener: () => void) => {
    const listeners = boxRef.current?.listeners
    if (!listeners) return () => undefined
    listeners.add(listener)
    return () => listeners.delete(listener)
  }, [])

  const getSnapshot = useCallback(() => boxRef.current?.current, [])

  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

  useEffect(() => {
    const box = boxRef.current
    if (!box) return undefined
    const disposable = factory()
    publishDisposable(box, disposable)
    return () => {
      disposable.dispose()
      publishDisposable(box, undefined)
    }
    // the disposable is created once per mount; a new factory must not recreate it
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return snapshot
}
