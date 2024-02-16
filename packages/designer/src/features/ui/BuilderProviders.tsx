import {
  FormViewerPropsStore,
  namedObserver,
  Store,
  StoreProvider,
  useDisposable,
  useForwardRef,
  ViewerPropsProvider
} from '@react-form-builder/core'
import {ReactNode, useEffect} from 'react'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {FormBuilderProps} from '../../FormBuilderProps'
import {BuilderStore} from '../../stores/BuilderStore'
import {LocalStorageSynchronizer} from '../../stores/LocalStorageSynchronizer'
import {BuilderStoreProvider} from '../../utils/BuilderStoreContext'
import {TooltipPlacementProvider} from '../../utils/TooltipPlacementContext'
import {CustomDragLayer} from '../dnd/components/CustomDragLayer'
import {LocalizationProvider} from '../localization'
import {StylesProvider} from './StylesProvider'

class BuilderProviderData {
  constructor(public readonly store: Store,
              public readonly builderStore: BuilderStore,
              public readonly localStorageSynchronizer: LocalStorageSynchronizer
  ) {
  }

  dispose() {
    this.localStorageSynchronizer.dispose()
    this.builderStore.dispose()
    this.store.dispose()
  }
}

interface BuilderProvidersProps {
  props: FormBuilderProps
  children: ReactNode
}

/**
 * React component encapsulating MobX storage for the form builder.
 * @param props the React component properties.
 * @param props.children the children of the React component.
 * @param props.props the properties of the form builder component.
 * @returns the React element.
 */
export const BuilderProviders = namedObserver('BuilderProviders', ({children, props}: BuilderProvidersProps) => {
  const {builderRef, ...viewerProps} = props
  const builderProviderData = useDisposable(() => {
    const store = new Store(new FormViewerPropsStore(viewerProps))

    const builderStore = new BuilderStore(store, props)
    builderStore.changeBuilderMode('builder')

    const localStorageSynchronizer = new LocalStorageSynchronizer(builderStore)
    return new BuilderProviderData(store, builderStore, localStorageSynchronizer)
  }, [])

  const builderStore = builderProviderData?.builderStore
  const store = builderProviderData?.store

  useForwardRef(builderStore, builderRef)

  useEffect(() => {
    if (!builderStore) return
    builderStore.activeFormName = props.formName
  }, [props.formName])

  useEffect(() => {
    if (!store) return
    store.formViewerPropsStore.applyProps(viewerProps)
  }, [props.initialData, props.view, props.validators, props.formValidators, props.localize, props.language, props.actions])

  if (!builderStore || !store) return null

  return (
    <ViewerPropsProvider value={viewerProps}>
      <BuilderStoreProvider value={builderStore}>
        <StoreProvider value={store}>
          <LocalizationProvider>
            <StylesProvider>
              <TooltipPlacementProvider value={'auto'}>
                <DndProvider backend={HTML5Backend}>
                  {children}
                  <CustomDragLayer/>
                </DndProvider>
              </TooltipPlacementProvider>
            </StylesProvider>
          </LocalizationProvider>
        </StoreProvider>
      </BuilderStoreProvider>
    </ViewerPropsProvider>
  )
})
