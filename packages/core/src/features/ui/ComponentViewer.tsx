import {cx} from '@emotion/css'
import {forIn} from 'lodash-es'
import {Fragment, useCallback, useEffect, useMemo, useRef} from 'react'
import type {Subscription} from 'rxjs'
import {catchError, filter, map} from 'rxjs'
import {ComponentState} from '../../stores/ComponentState'
import type {Store} from '../../stores/Store'
import {isPromise, namedObserver} from '../../utils'
import type {ComponentData} from '../../utils/contexts/ComponentDataContext'
import {useComponentData} from '../../utils/contexts/ComponentDataContext'
import {useStore} from '../../utils/contexts/StoreContext'
import {getChildren} from '../../utils/getChildren'
import type {ActionData} from '../event'
import {ActionEventArgs, DidMountEvent, WillUnmountEvent} from '../event'
import {useViewerProps} from '../form-viewer/components/ViewerPropsContext'
import {TooltipWrapper} from '../tooltip/TooltipWrapper'
import {Erroneous} from '../validation'
import {useComponentTreeContext} from './ComponentTreeContext'
import {DefaultWrapper} from './DefaultWrapper'

type Fn = () => void

function useComponentMountUnmountOnce(componentId: string, init: Fn, clear: Fn) {
  const clearRef = useRef(clear)
  const componentIdRef = useRef(componentId)
  const mounted = useRef(false)

  clearRef.current = clear
  componentIdRef.current = componentId

  if (!mounted.current) {
    mounted.current = true
    init()
  }

  useEffect(() => {
    return () => {
      clearRef.current()
    }
  }, [])
}

const useActions = (state: ComponentState) => {
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

  useComponentMountUnmountOnce(componentData.id, () => {
    createSubscriptions()

    const mountEvent = new ActionEventArgs(DidMountEvent, componentData, store, [], state)

    store.eventSubject.next(mountEvent)
  }, () => {
    const unmountEvent = new ActionEventArgs(WillUnmountEvent, componentData, store, [], state)

    store.eventSubject.next(unmountEvent)

    unsubscribe()
  })
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
  const {componentWrapper, computeChildren: viewerComputeChildren} = useViewerProps()
  const formViewerStore = useStore()
  const localize = useCallback(componentStore => {
    const dataContext = data.dataRootProvider ?? formViewerStore.dataContext
    return formViewerStore.localizeComponent('component', dataContext.dataRoot, componentStore)
  }, [formViewerStore, data])
  const componentTree = useComponentTreeContext()
  const viewerProps = useViewerProps()

  const computeChildren = useCallback((componentData: ComponentData, componentProps: Record<string, any>) => {
    if (viewerComputeChildren) return viewerComputeChildren(componentData, componentProps)
    return getChildren(componentData, formViewerStore.form.componentTree, componentTree, componentProps)
  }, [viewerComputeChildren, formViewerStore.form.componentTree, componentTree])

  const componentState = useMemo(
    () => new ComponentState(data, formViewerStore, localize, computeChildren, viewerProps),
    [data, formViewerStore, localize, computeChildren, viewerProps])

  useActions(componentState)

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
