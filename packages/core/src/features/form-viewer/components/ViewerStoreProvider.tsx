import {ReactNode, useContext, useEffect, useMemo} from 'react'
import {Store} from '../../../stores/Store'
import {namedObserver} from '../../../utils'
import {StoreContext, StoreProvider} from '../../../utils/contexts/StoreContext'
import {useDestroy} from '../../../utils/useDestroy'
import {DefaultActions} from '../../event'
import {ComponentTree} from '../../ui/ComponentTree'
import {getTemplateName} from '../../ui/templateUtil'
import {FormViewerProps} from '../types'
import {ViewerPropsProvider} from './ViewerPropsContext'

/**
 * React component encapsulating MobX storage for the form viewer.
 * @param props the React component properties.
 * @param props.children the children of the React component.
 * @param props.props the properties of the form viewer component.
 * @returns the React element.
 */
export const ViewerStoreProvider = namedObserver('ViewerStoreProvider', ({children, props}: {
  children: ReactNode,
  props: FormViewerProps
}) => {
  const storeFromContext = useContext(StoreContext)
  const store = useMemo(
    () => storeFromContext || new Store(props.view, props.initialData ?? {}, ComponentTree, DefaultActions, false),
    [])

  useEffect(() => {
    store.initialData = props.initialData ?? {}
    store.view = props.view
  }, [props.initialData, props.view])

  useEffect(() => {
    props.view.templates().forEach(model => {
      const templateName = getTemplateName(model.type)
      const defaultProps = {templateName}
      const modifiedModel = Object.assign(model, {defaultProps: defaultProps})
      props.view.define(modifiedModel)
    })
  }, [])

  useDestroy(() => {
    if (!storeFromContext) {
      store.destroy()
    }
  })

  return (
    <ViewerPropsProvider value={props}>
      <StoreProvider value={store}>
        {children}
      </StoreProvider>
    </ViewerPropsProvider>
  )
})
