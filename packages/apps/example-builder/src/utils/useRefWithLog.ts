import {useCallback, useRef} from 'react'

export function useRefWithLog<T>(name: string, log: boolean = true) {
  const ref = useRef<T | null>()
  return useCallback((forwardedRef: T | null) => {
    ref.current = forwardedRef
    if (log) console.log(name, ref.current)
  }, [])
}
