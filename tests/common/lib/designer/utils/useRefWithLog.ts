import {useCallback, useRef} from 'react'

export function useRefWithLog<T>(name: string, log = true, callback?: (forwardedRef: T | null) => void) {
  const ref = useRef<T | null>(null)
  return useCallback((forwardedRef: T | null) => {
    ref.current = forwardedRef
    if (log) {
      console.log(name, ref.current)
      callback?.(ref.current)
    }
  }, [])
}
