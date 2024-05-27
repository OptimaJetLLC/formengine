import {cx} from '@emotion/css'
import {forIn} from 'lodash-es'
import {Fragment, useCallback, useEffect, useMemo} from 'react'
import {catchError, concatMap, filter, OperatorFunction, Subscription} from 'rxjs'
import {ComponentState} from '../../stores/ComponentState'
import {isPromise, namedObserver} from '../../utils'
import {ComponentData, useComponentData} from '../../utils/contexts/ComponentDataContext'
import {useStore} from '../../utils/contexts/StoreContext'
import {getChildren} from '../../utils/getChildren'
import {ActionData, ActionEventArgs, Arguments, DidMountEvent, Func, WillUnmountEvent} from '../event'
import {useViewerProps} from '../form-viewer/components/ViewerPropsContext'
import {TooltipWrapper} from '../tooltip/TooltipWrapper'
import {Erroneous} from '../validation'
import {useComponentTreeContext} from './ComponentTreeContext'
import {DefaultWrapper} from './DefaultWrapper'

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
        const action = getActionHandler(actionDefinition.func, data.args)
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
  }, [componentData.store.events, componentData.store.key, store])

  useEffect(() => {
    store.eventSubject.next(new ActionEventArgs(DidMountEvent, componentData, store, [], state))
    return () => store.eventSubject.next(new ActionEventArgs(WillUnmountEvent, componentData, store, [], state))
  }, [componentData, state, store])
}

function getActionHandler(func: Func, args?: Arguments) {
  return async (e: ActionEventArgs) => {
    const actionArgs = args ? {...args} : {}
    const result = func(e, actionArgs)
    if (isPromise(result)) await result
    return e
  }
}

const _ComponentViewer = () => {
  const data = useComponentData()
  const {componentWrapper, computeChildren: viewerComputeChildren} = useViewerProps()
  const formViewerStore = useStore()
  const localize = useCallback(componentStore => {
    return formViewerStore.localizeComponent('component', componentStore)
  }, [formViewerStore])
  const componentTree = useComponentTreeContext()

  const computeChildren = useCallback((componentData: ComponentData, componentProps: Record<string, any>) => {
    if (viewerComputeChildren) return viewerComputeChildren(componentData, componentProps)
    return getChildren(componentData, formViewerStore.form.componentTree, componentTree, componentProps)
  }, [viewerComputeChildren, formViewerStore.form.componentTree, componentTree])

  const componentState = useMemo(
    () => new ComponentState(data, formViewerStore, localize, computeChildren),
    [data, formViewerStore, localize, computeChildren])

  useActions(componentState)

  const props = componentState.get
  const {kind, component: Component} = data.model
  const containerClassName = cx(props.className, componentState.wrapperClassName)

  const Wrapper = componentWrapper ?? DefaultWrapper
  const Tooltip = data.store.tooltipProps ? TooltipWrapper : Fragment
  const ContainerComponent = componentWrapper ?? Component
  const component = <Component {...props}/>

  if (kind === 'container') {
    return <ContainerComponent {...props} className={containerClassName}/>
  }

  return <Wrapper className={kind === 'template' ? containerClassName : componentState.wrapperClassName}>
    {kind === 'template'
      ? component
      : <Tooltip><Erroneous>{component}</Erroneous></Tooltip>
    }
  </Wrapper>
}

export const ComponentViewer = namedObserver('ComponentViewer', _ComponentViewer)
