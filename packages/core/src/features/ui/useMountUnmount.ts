import {useEffect, useRef} from 'react'

/**
 * Calls init function on mount and clear function on unmount.
 * @param init the function to call on mount.
 * @param clear the function to call on unmount.
 */
export function useMountUnmount(init: Function, clear: Function) {
  const clearRef = useRef(clear)
  const initRef = useRef(init)

  clearRef.current = clear
  initRef.current = init

  useEffect(() => {
    initRef.current()
    return () => {
      clearRef.current()
    }
  }, [])
}
