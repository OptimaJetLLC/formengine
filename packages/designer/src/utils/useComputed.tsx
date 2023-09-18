import {computed, IComputedValueOptions} from 'mobx'
import {DependencyList, useMemo} from 'react'

/**
 * Returns the memoized value of the result of the computed function.
 * @param func the function to compute the value.
 * @param options the compute function options.
 * @param deps the dependencies for {@link useMemo}.
 * @returns the memoized value.
 */
export function useComputed<T>(func: () => T, options?: IComputedValueOptions<T>, deps?: DependencyList) {
  return useMemo(() => computed(func, options), deps ?? []).get()
}
