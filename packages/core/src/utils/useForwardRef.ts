import type {ForwardedRef} from 'react'
import {useEffect} from 'react'

/**
 * Sets the forwarded ref value.
 * @param value the value of ref.
 * @param ref the forwarded ref.
 * @template T the type of value.
 */
export function useForwardRef<T>(value?: T, ref?: ForwardedRef<T>): void {
  useEffect(() => {
    if (!value || !ref) return

    if (typeof ref === 'function') {
      ref(value)
      return
    }

    ref.current = value
  }, [value, ref])
}
