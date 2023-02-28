import {computed, IComputedValueOptions} from 'mobx'
import {DependencyList, useMemo} from 'react'

export function useComputed<T>(func: () => T, options?: IComputedValueOptions<T>, deps?: DependencyList) {
  return useMemo(() => computed(func, options), deps ?? []).get()
}
