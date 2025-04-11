import {useEffect, useMemo, useRef, useState} from 'react'

/**
 * Type of disposable object.
 */
export type IDisposable = {
  /**
   * Performs the tasks necessary to release resources correctly.
   */
  dispose: () => void
}

/**
 * Creates a disposable object and dispose the object when the React component is unmounted. **Internal use only.**
 * @param factory the factory function to create a disposable object.
 * @returns the disposable object.
 */
export function useDisposable<T extends IDisposable>(factory: () => T): T | undefined {
  const [state, setState] = useState<T>()

  useEffect(() => {
    const disposable = factory()
    setState(disposable)
    return () => disposable.dispose()
    // the dispose function should only be called when a component is unmounted
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return state
}

const disposeAsync = (disposable: IDisposable | null) => {
  if (!disposable) return
  const timeout = setTimeout(() => {
    disposable?.dispose()
    clearTimeout(timeout)
  }, 0)
}

/**
 * Creates a disposable object and correctly disposes of it when the object is recreated and unmounted. **Internal use only.**
 * @param factory the factory function to create a disposable object.
 * @returns the disposable object.
 */
export function useMultipleDisposable<T extends IDisposable>(factory: () => T) {
  const ref = useRef<T>(null)

  const disposable = useMemo(() => {
    // we must dispose of the previous disposable object asynchronously
    // to avoid setting the state in the middle of rendering
    disposeAsync(ref.current)
    const newDisposable = factory()
    ref.current = newDisposable
    return newDisposable
  }, [factory])

  ref.current = disposable

  useEffect(() => {
    return () => {
      ref.current?.dispose()
    }
  }, [])

  return disposable
}
