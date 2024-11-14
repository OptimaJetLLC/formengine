import {cx} from '@emotion/css'
import {Fragment, useCallback, useMemo} from 'react'
import {ComponentState} from '../../stores/ComponentState'
import {namedObserver} from '../../utils'
import type {ComponentData} from '../../utils/contexts/ComponentDataContext'
import {useComponentData} from '../../utils/contexts/ComponentDataContext'
import {useStore} from '../../utils/contexts/StoreContext'
import {getChildren} from '../../utils/getChildren'
import {ActionEventArgs, DidMountEvent, WillUnmountEvent} from '../event'
import {useViewerProps} from '../form-viewer/components/ViewerPropsContext'
import {TooltipWrapper} from '../tooltip/TooltipWrapper'
import {Erroneous} from '../validation'
import {useComponentTreeContext} from './ComponentTreeContext'
import {DefaultWrapper} from './DefaultWrapper'
import {SubscriptionsComponent} from './SubscriptionsComponent'
import {useMountUnmount} from './useMountUnmount'

const useLifecycleEvents = (state: ComponentState) => {
  const store = useStore()
  const componentData = useComponentData()

  useMountUnmount(() => {
    const mountEvent = new ActionEventArgs(DidMountEvent, componentData, store, [], state)

    store.eventSubject.next(mountEvent)
  }, () => {
    const unmountEvent = new ActionEventArgs(WillUnmountEvent, componentData, store, [], state)

    store.eventSubject.next(unmountEvent)
  })
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

  useLifecycleEvents(componentState)

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

const SubscriptionsComponentViewer = () => {
  return <>
    <SubscriptionsComponent/>
    <RawComponentViewer/>
  </>
}

export const ComponentViewer = namedObserver('ComponentViewer', SubscriptionsComponentViewer)
