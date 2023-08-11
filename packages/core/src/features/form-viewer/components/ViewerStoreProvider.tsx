import {ReactNode, useContext, useEffect, useMemo} from 'react'
import {Store} from '../../../stores/Store'
import {namedObserver} from '../../../utils'
import {StoreContext, StoreProvider} from '../../../utils/contexts/StoreContext'
import {useDestroy} from '../../../utils/useDestroy'
import {DefaultActions} from '../../event'
import {ComponentTree} from '../../ui/ComponentTree'
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
    () => storeFromContext || new Store(props.view, props.initialData ?? {}, ComponentTree, DefaultActions),
    [])

  useEffect(() => {
    store.initialData = props.initialData ?? {}
    store.view = props.view
  }, [props.initialData, props.view])

  useDestroy(() => {
    if (!storeFromContext) {
      store.dispose()
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
