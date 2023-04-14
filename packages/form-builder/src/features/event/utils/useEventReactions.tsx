import {CustomActionDefinition, useComponentData, useMultiReaction, useReaction, useStore} from 'fb-core'
import {values} from 'lodash-es'

export const useEventReactions = () => {
  const store = useStore()
  const data = useComponentData()

  //For target key sync with linked actions
  useMultiReaction(
    () => values(data.componentStore.events).flat().filter(value => value.type === 'linked'),
    (observer) => store.findComponent(observer.target!),
    (observable) => observable?.key,
    (observer, arg?: string, prev?: string) => observer.target = arg
  )

  //For name sync with custom actions
  useMultiReaction(
    () => values(data.componentStore.events).flat().filter(value => value.type === 'custom'),
    (observer) => (store.screen.props.actions?.value as CustomActionDefinition[])?.find(value => value.name === observer.name),
    (observable) => observable?.name,
    (observer, arg, prev?) => observer.name = arg!
  )

  //Remove custom actions from used places if it has been deleted
  useReaction(() => store.screen.props.actions?.value?.slice(), (arg: CustomActionDefinition[], prev: CustomActionDefinition[]) => {
    if (!prev || !arg || arg.length !== prev.length - 1) return
    const [deleted] = prev.filter(x => !arg.includes(x))
    for (let event in data.componentStore.events) {
      data.componentStore.events[event] =
        data.componentStore.events[event].filter(action => action.type !== 'custom' || action.name !== deleted.name)
    }
  })
}
