import {CustomActionDefinition, useComponentData, useStore} from '@react-form-builder/core'
import {values} from 'lodash-es'
import {IReactionDisposer, reaction} from 'mobx'
import {useEffect, useMemo} from 'react'
import {useComputed} from '../../../utils/useComputed'

type ElementType<T extends any[]> = T extends (infer U)[] ? U : never;

/**
 * Hook for synchronization, uses MobX reaction.
 * @param initObservers the function that returns observers.
 * @param mapObservable the function that maps the observer to the observable.
 * @param expression the expression to track the value, as in a normal reaction.
 * @param effect the effect for the reaction.
 * @example
 * useMultiReaction(
 *   () => _.values(data.store.events).flat().filter(value => value.type === 'linked'),
 *   (observer) => store.findComponent(observer.target!),
 *   (observable) => observable?.key,
 *   (observer, arg?: string, prev?: string) => observer.target = arg
 * )
 */
function useMultiReaction<Observers extends Array<ElementType<Observers>>, Observable, Track>(
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

/**
 * Connects MobX reactions to component events.
 */
export const useEventReactions = () => {
  const store = useStore()
  const data = useComponentData()

  //For target key sync with linked actions
  useMultiReaction(
    () => values(data.store.events).flat().filter(value => value.type === 'linked'),
    (observer) => store.findComponent(observer.target!),
    (observable) => observable?.key,
    (observer, arg?: string, prev?: string) => observer.target = arg
  )

  //For name sync with custom actions
  useMultiReaction(
    () => values(data.store.events).flat().filter(value => value.type === 'custom'),
    (observer) => (store.screen.props.actions?.value as CustomActionDefinition[])?.find(value => value.name === observer.name),
    (observable) => observable?.name,
    (observer, arg, prev?) => observer.name = arg!
  )

  //Remove custom actions from used places if it has been deleted
  useEffect(() => reaction(() => store.screen.props.actions?.value?.slice(), (arg: CustomActionDefinition[], prev: CustomActionDefinition[]) => {
    if (!prev || !arg || arg.length !== prev.length - 1) return
    const [deleted] = prev.filter(x => !arg.includes(x))
    for (const event in data.store.events) {
      data.store.events[event] =
        data.store.events[event].filter(action => action.type !== 'custom' || action.name !== deleted.name)
    }
  }))
}
