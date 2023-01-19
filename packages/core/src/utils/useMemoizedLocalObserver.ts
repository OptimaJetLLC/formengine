import {AnnotationsMap, observable} from 'mobx'
import {DependencyList, useMemo} from 'react'

export const useMemoizedLocalObserver = <TStore extends Record<string, any>>(
  initializer: () => TStore,
  annotations?: AnnotationsMap<TStore, never>,
  deps?: DependencyList
): TStore => {
  return useMemo<TStore>(() => observable(initializer(), annotations, {autoBind: true}), deps)
}
