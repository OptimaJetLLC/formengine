import {forIn, transform} from 'lodash-es'
import {createElement, useCallback, useEffect, useMemo} from 'react'
import {filter, Subscription} from 'rxjs'
import {ComponentState} from '../../stores/ComponentState'
import {Store} from '../../stores/Store'
import {namedObserver} from '../../utils'
import {ComponentData, useComponentData} from '../../utils/contexts/ComponentDataContext'
import {useStore} from '../../utils/contexts/StoreContext'
import {getChildren} from '../../utils/getChildren'
import {ActionData, ActionEventArgs, Arguments, DidMountEvent, Func, WillUnmountEvent} from '../event'
import {useViewerProps} from '../form-viewer/components/ViewerPropsContext'
import {useLocalization} from '../localization/useLocalization'
import {useComponentTreeContext} from './ComponentTreeContext'

const useActions = (state: ComponentState) => {
  const store = useStore()
  const componentData = useComponentData()

  //Init actions
  useEffect(() => {
    const subscriptions: Subscription[] = []

    forIn(componentData.store.events, (actionDataList: ActionData[], eventName) => {
      actionDataList.forEach((data) => {
        const {params, func} = store.findAction(data)
        const action = params ? getActionHandler(store, func, data.args) : func
        const subscription = store.eventSubject
          .pipe(filter(e => e.type === eventName && e.sender.key === componentData.store.key))
          .subscribe(action)
        subscriptions.push(subscription)
      })
    })

    return () => subscriptions.forEach(s => s.unsubscribe())
  }, [componentData.store.events])

  useEffect(() => {
    store.eventSubject.next(new ActionEventArgs(DidMountEvent, componentData, store, [], state))
    return () => store.eventSubject.next(new ActionEventArgs(WillUnmountEvent, componentData, store, [], state))
  }, [])
}

function getActionHandler(store: Store, func: Func, args?: Arguments) {
  //TODO init in default value for arguments?
  return function (e: ActionEventArgs) {
    const actionArgs = !args ? {} :
      transform(args, (result: Record<string, any>, value, argumentName) =>
        result[argumentName] = value)
    func(actionArgs, e)
  }
}

export const ComponentViewer = namedObserver('ComponentViewer', () => {
  const data = useComponentData()
  const localize = useLocalization()
  const formViewerProps = useViewerProps()
  const formViewerStore = useStore()
  const componentTree = useComponentTreeContext()

  const computeChildren = useCallback((componentData: ComponentData, componentProps: Record<string, any>) => {
    if (formViewerProps.computeChildren) return formViewerProps.computeChildren(componentData, componentProps)
    return getChildren(componentData, formViewerStore.form.componentTree, componentTree, componentProps)
  }, [formViewerProps.computeChildren, formViewerStore.form.componentTree, componentTree])

  const componentState = useMemo(
    () => new ComponentState(data, formViewerStore, localize, computeChildren),
    [data, localize])

  useActions(componentState)

  return createElement(data.model.view, componentState.get)
})
