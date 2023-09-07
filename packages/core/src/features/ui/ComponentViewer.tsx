import {forIn, transform} from 'lodash-es'
import {createElement, useCallback, useEffect, useMemo} from 'react'
import {catchError, concatMap, filter, OperatorFunction, Subscription} from 'rxjs'
import {ComponentState} from '../../stores/ComponentState'
import {isPromise, namedObserver} from '../../utils'
import {ComponentData, useComponentData} from '../../utils/contexts/ComponentDataContext'
import {useStore} from '../../utils/contexts/StoreContext'
import {getChildren} from '../../utils/getChildren'
import {ActionData, ActionEventArgs, Arguments, DidMountEvent, Func, Parameter, WillUnmountEvent} from '../event'
import {useViewerProps} from '../form-viewer/components/ViewerPropsContext'
import {useComponentTreeContext} from './ComponentTreeContext'

const useActions = (state: ComponentState) => {
  const store = useStore()
  const componentData = useComponentData()

  //Init actions
  useEffect(() => {
    const subscriptions: Subscription[] = []

    forIn(componentData.store.events, (actionDataList: ActionData[], eventName) => {
      const actionChain: OperatorFunction<ActionEventArgs, ActionEventArgs>[] = []
      actionDataList.forEach((data) => {
        const actionDefinition = store.findAction(data)
        const action = getActionHandler(actionDefinition.func, data.args, actionDefinition.params)
        actionChain.push(concatMap(action))
      })

      const subscription = store.eventSubject
        .pipe(
          filter(e => e.type === eventName && e.sender.key === componentData.store.key),
          // @ts-ignore this method don't like spread
          ...actionChain,
          catchError((err, caught) => {
            console.error(err)
            return caught
          }),
        )
        .subscribe()

      subscriptions.push(subscription)
    })

    return () => subscriptions.forEach(s => s.unsubscribe())
  }, [componentData.store.events])

  useEffect(() => {
    store.eventSubject.next(new ActionEventArgs(DidMountEvent, componentData, store, [], state))
    return () => store.eventSubject.next(new ActionEventArgs(WillUnmountEvent, componentData, store, [], state))
  }, [])
}

function getActionHandler(func: Func, args?: Arguments, params?: Parameter[]) {
  //TODO init in default value for arguments?
  return async (e: ActionEventArgs) => {
    const actionArgs = !args ? {} :
      transform(args, (result: Record<string, any>, value, argumentName) =>
        result[argumentName] = value)
    const result = !params?.length ? func(e) : func(e, actionArgs)
    if (isPromise(result)) await result
    return e
  }
}

export const ComponentViewer = namedObserver('ComponentViewer', () => {
  const data = useComponentData()
  const formViewerProps = useViewerProps()
  const formViewerStore = useStore()
  const localize = formViewerStore.localizeComponent.bind(formViewerStore)
  const componentTree = useComponentTreeContext()

  const computeChildren = useCallback((componentData: ComponentData, componentProps: Record<string, any>) => {
    if (formViewerProps.computeChildren) return formViewerProps.computeChildren(componentData, componentProps)
    return getChildren(componentData, formViewerStore.form.componentTree, componentTree, componentProps)
  }, [formViewerProps.computeChildren, formViewerStore.form.componentTree, componentTree])

  const componentState = useMemo(
    () => new ComponentState(data, formViewerStore, localize, computeChildren),
    [data])

  useActions(componentState)

  return createElement(data.model.view, componentState.get)
})
