import {cx} from '@emotion/css'
import {forIn} from 'lodash-es'
import {Fragment, useCallback, useEffect, useRef} from 'react'
import type {Subscription} from 'rxjs'
import {catchError, filter, map} from 'rxjs'
import type {IComponentState} from '../../stores/IComponentState'
import type {Store} from '../../stores/Store'
import {isPromise, namedObserver} from '../../utils'
import {useComponentData} from '../../utils/contexts/ComponentDataContext'
import {useStore} from '../../utils/contexts/StoreContext'
import type {ActionData} from '../event'
import {ActionEventArgs, DidMountEvent, WillUnmountEvent} from '../event'
import {useViewerProps} from '../form-viewer/components/ViewerPropsContext'
import {TooltipWrapper} from '../tooltip/TooltipWrapper'
import {Erroneous} from '../validation'
import {DefaultWrapper} from './DefaultWrapper'

type Fn = () => void

function useComponentMountUnmount(init: Fn, clear: Fn, deps: Array<any>) {
  const clearRef = useRef(clear)
  const initRef = useRef(init)

  clearRef.current = clear
  initRef.current = init

  useEffect(() => {
    initRef.current()

    return () => {
      clearRef.current()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

const useActions = (state: IComponentState, deps: Array<any>) => {
  const store = useStore()
  const componentData = useComponentData()
  const subsRef = useRef<Subscription[]>([])

  const unsubscribe = useCallback(() => {
    subsRef.current.forEach((s) => s.unsubscribe())
  }, [])

  const createSubscriptions = useCallback(() => {
    const result: Subscription[] = []

    forIn(componentData.store.events, (actionDataList: ActionData[], eventName) => {
      const chain = getActionHandlersChain(store, actionDataList)

      const subscription = store.eventSubject
        .pipe(
          filter(e => e.type === eventName && e.sender.id === componentData.id),
          map(chain),
          catchError((err, caught) => {
            console.error(err)
            return caught
          }),
        )
        .subscribe()

      result.push(subscription)
    })

    subsRef.current = result
  }, [componentData.store.events, componentData.id, store])

  useComponentMountUnmount(() => {
    createSubscriptions()

    const mountEvent = new ActionEventArgs(DidMountEvent, componentData, store, [], state.get)

    store.eventSubject.next(mountEvent)
  }, () => {
    const unmountEvent = new ActionEventArgs(WillUnmountEvent, componentData, store, [], state.get)

    store.eventSubject.next(unmountEvent)

    unsubscribe()
  }, deps)
}

function getActionHandlersChain(store: Store, actionDataList: ActionData[]) {
  const actions = actionDataList.map(data => ({
    func: store.findAction(data).func,
    args: data.args ? {...data.args} : {}
  }))

  return async (e: ActionEventArgs) => {
    for (const {func, args} of actions) {
      const result = func(e, args)
      if (isPromise(result)) await result
    }
  }
}

const RawComponentViewer = () => {
  const data = useComponentData()
  const {componentWrapper} = useViewerProps()
  const viewerProps = useViewerProps()

  const componentState = data.componentState

  useActions(componentState, [viewerProps])

  const {key, ...otherProps} = componentState.get
  const {kind, component: Component} = data.model
  const containerClassName = cx(otherProps.className, componentState.wrapperClassName)

  const Wrapper = componentWrapper ?? DefaultWrapper
  const Tooltip = data.store.tooltipProps ? TooltipWrapper : Fragment
  const ContainerComponent = componentWrapper ?? Component
  const component = <Component key={key} {...otherProps}/>

  if (kind === 'container') {
    return <ContainerComponent key={key} {...otherProps} className={containerClassName}/>
  }

  if (kind === 'repeater') {
    return <Wrapper><Tooltip><Erroneous>
      <Component key={key} {...otherProps} wrapperClassName={containerClassName}/>
    </Erroneous></Tooltip></Wrapper>
  }

  return <Wrapper className={kind === 'template' ? containerClassName : componentState.wrapperClassName}>
    {kind === 'template'
      ? component
      : <Tooltip><Erroneous>{component}</Erroneous></Tooltip>
    }
  </Wrapper>
}

export const ComponentViewer = namedObserver('ComponentViewer', RawComponentViewer)
