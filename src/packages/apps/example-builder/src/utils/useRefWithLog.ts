import {useCallback, useRef} from 'react'

/**
 * The example of the useRef hook with logging.
 * @param name the name of the ref.
 * @param log the flag to log the ref.
 * @param callback the optional callback.
 * @returns the ref callback.
 */
export function useRefWithLog<T>(name: string, log = true, callback?: (forwardedRef: T | null) => void) {
  const ref = useRef<T | null>(null)
  return useCallback((forwardedRef: T | null) => {
    ref.current = forwardedRef
    if (log) {
      // eslint-disable-next-line no-console
      console.log(name, ref.current)
      callback?.(ref.current)
    }
  }, [callback, log, name])
}
