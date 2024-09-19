import type {ReactNode} from 'react'
import {useCallback, useContext, useEffect, useImperativeHandle} from 'react'
import {FormViewerPropsStore} from '../../../stores/FormViewerPropsStore'
import {Store} from '../../../stores/Store'
import {namedObserver} from '../../../utils'
import {StoreContext, StoreProvider} from '../../../utils/contexts/StoreContext'
import {useDisposable} from '../../../utils/useDisposable'
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

const RawNotifier = (props: Omit<ExistingStoreProviderProps, 'children'>) => {
  const {store} = props
  const viewerProps = props.props

  useEffect(() => {
    viewerProps.onFormDataChange?.(store.formData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.formData.data, store.formData.errors])

  useEffect(() => {
    store.formViewerPropsStore.applyProps(viewerProps)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewerProps.initialData, viewerProps.view, viewerProps.validators, viewerProps.formValidators,
    viewerProps.localize, viewerProps.language, viewerProps.actions, viewerProps.errorWrapper])

  return null
}

const Notifier = namedObserver('Notifier', RawNotifier)

const RawExistingStoreProvider = ({
                                    children,
                                    props: {viewerRef, ...props},
                                    store
                                  }: ExistingStoreProviderProps) => {
  useImperativeHandle(viewerRef, () => store, [store])

  return (
    <ViewerPropsProvider value={props}>
      <Notifier store={store} props={props}/>
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
