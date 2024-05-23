import {computed} from 'mobx'
import {useMemo} from 'react'

/**
 * Returns the memoized value of the result of the computed function.
 * @param func the function to compute the value.
 * @returns the memoized value.
 */
export function useComputed<T>(func: () => T) {
  return useMemo(() => computed(func), [func]).get()
}
