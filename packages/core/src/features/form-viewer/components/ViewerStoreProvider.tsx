import {ForwardedRef, ReactNode, useContext, useEffect, useMemo} from 'react'
import {FormViewerPropsStore} from '../../../stores/FormViewerPropsStore'
import {Store} from '../../../stores/Store'
import {namedObserver} from '../../../utils'
import {StoreContext, StoreProvider} from '../../../utils/contexts/StoreContext'
import {useDestroy} from '../../../utils/useDestroy'
import {FormViewerProps, IFormViewer} from '../types'
import {ViewerPropsProvider} from './ViewerPropsContext'

/**
 * React component encapsulating MobX storage for the form viewer.
 * @param props the React component properties.
 * @param props.children the children of the React component.
 * @param props.props the properties of the form viewer component.
 * @returns the React element.
 */
export const ViewerStoreProvider = namedObserver('ViewerStoreProvider', ({children, props: {viewerRef, ...props}}: {
  children: ReactNode,
  props: FormViewerProps
}) => {
  const storeFromContext = useContext(StoreContext)
  const store = useMemo(
    () => storeFromContext || new Store(new FormViewerPropsStore(props)),
    [])

  useEffect(() => {
    props.onDataChange?.(store.formData)
  }, [store.formData.data, store.formData.errors])

  useEffect(() => setViewerRef(store, viewerRef), [store, viewerRef])

  useEffect(() => {
    store.formViewerPropsStore.applyProps(props)
  }, [props.initialData, props.view, props.externalValidators, props.externalFormValidators, props.localize, props.language, props.externalActions])

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

const setViewerRef = (store: IFormViewer, viewerRef?: ForwardedRef<IFormViewer>) => {
  if (!viewerRef) return

  if (typeof viewerRef === 'function') {
    viewerRef(store)
    return
  }

  if (!viewerRef.current) viewerRef.current = store
}
