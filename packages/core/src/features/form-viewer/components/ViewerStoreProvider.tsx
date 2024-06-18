import {ReactNode, useCallback, useContext, useEffect} from 'react'
import {FormViewerPropsStore} from '../../../stores/FormViewerPropsStore'
import {Store} from '../../../stores/Store'
import {namedObserver} from '../../../utils'
import {StoreContext, StoreProvider} from '../../../utils/contexts/StoreContext'
import {useDisposable} from '../../../utils/useDisposable'
import {useForwardRef} from '../../../utils/useForwardRef'
import type {FormViewerProps} from '../types'
import {ViewerPropsProvider} from './ViewerPropsContext'

/**
 * Properties of the React component ViewerStoreProvider.
 */
export interface ViewerStoreProviderProps {

  /**
   * Children component.
   */
  children: ReactNode

  /**
   * Form viewer React component properties.
   */
  props: FormViewerProps
}

interface ExistingStoreProviderProps extends ViewerStoreProviderProps {
  store: Store
}

const RawExistingStoreProvider = ({
                                  children,
                                  props: {viewerRef, ...props},
                                  store
                                }: ExistingStoreProviderProps) => {
  useForwardRef(store, viewerRef)

  useEffect(() => {
    props.onFormDataChange?.(store.formData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.formData.data, store.formData.errors])

  useEffect(() => {
    store.formViewerPropsStore.applyProps(props)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.initialData, props.view, props.validators, props.formValidators, props.localize, props.language, props.actions,
    props.errorWrapper])

  return (
    <ViewerPropsProvider value={props}>
      <StoreProvider value={store}>
        {children}
      </StoreProvider>
    </ViewerPropsProvider>
  )
}

const ExistingStoreProvider = namedObserver('ExistingStoreProvider', RawExistingStoreProvider)

const RawNewStoreProvider = ({children, props}: ViewerStoreProviderProps) => {
  const storeFactory = useCallback(() => new Store(new FormViewerPropsStore(props)), [props])
  const store = useDisposable(storeFactory)

  if (!store) return null

  return <ExistingStoreProvider children={children} props={props} store={store}/>
}

const NewStoreProvider = namedObserver('FactoryStoreProvider', RawNewStoreProvider)

/**
 * React component encapsulating MobX storage for the form viewer.
 * @param props the React component properties.
 * @returns the React element.
 */
const RawViewerStoreProvider = (props: ViewerStoreProviderProps) => {
  const storeFromContext = useContext(StoreContext)
  return storeFromContext
    ? <ExistingStoreProvider children={props.children} props={props.props} store={storeFromContext}/>
    : <NewStoreProvider children={props.children} props={props.props}/>
}

export const ViewerStoreProvider = namedObserver('ViewerStoreProvider', RawViewerStoreProvider)
