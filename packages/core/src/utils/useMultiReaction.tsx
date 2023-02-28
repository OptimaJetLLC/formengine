import {IReactionDisposer, reaction} from 'mobx'
import {useEffect, useMemo} from 'react'
import {useComputed} from './useComputed'

type ElementType<T extends any[]> = T extends (infer U)[] ? U : never;

/**
 * A hook for synchronization used mobx reaction
 * @example:
 * useMultiReaction(
 *     //Get observers
 *     () => _.values(data.componentStore.events).flat().filter(value => value.type === 'linked'),
 *     //Map observer to observable
 *     (observer) => store.findComponent(observer.target!),
 *     //Expression for track value such as in common reaction
 *     (observable) => observable?.key,
 *     //Effect for reaction
 *     (observer, arg?: string, prev?: string) => observer.target = arg
 *   )
 */
export function useMultiReaction<Observers extends Array<ElementType<Observers>>, Observable, Track>(
  initObservers: () => Observers,
  mapObservable: (observer: ElementType<Observers>) => Observable,
  expression: (observable: Observable) => Track,
  effect: (observer: ElementType<Observers>, arg: Track, prev: Track) => void
) {
  const observers = useComputed(initObservers)
  const observables = useMemo(() => observers.map(mapObservable), [observers])

  useEffect(() => {
    const disposers: IReactionDisposer[] = []

    for (let i = 0; i < observables.length; i++) {
      const boundExpression = expression.bind(null, observables[i])
      const boundEffect = effect.bind(null, observers[i])
      const disposer = reaction(boundExpression, boundEffect)
      disposers.push(disposer)
    }

    return () => disposers.forEach(disposer => disposer())
  }, [observables, observers])

}
