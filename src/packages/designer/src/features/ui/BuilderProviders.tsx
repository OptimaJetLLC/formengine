import type {ComponentData, ComponentPropertiesContext, ComponentStore} from '@react-form-builder/core'
import {
  ComponentState,
  ComponentTree,
  FormViewerPropsStore,
  getChildren,
  namedObserver,
  nameObservable,
  Store,
  StoreProvider,
  useDisposable,
  ViewerPropsProvider
} from '@react-form-builder/core'
import {makeObservable, observable} from 'mobx'
import type {ReactNode} from 'react'
import {useCallback, useEffect} from 'react'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import type {FormBuilderProps} from '../../FormBuilderProps'
import {BuilderStore} from '../../stores/BuilderStore'
import {LocalStorageSynchronizer} from '../../stores/LocalStorageSynchronizer'
import {BuilderStoreProvider} from '../../utils/BuilderStoreContext'
import {determineTheme} from '../../utils/determineTheme'
import {isDesignerLocalStorageEnabled} from '../../utils/isDesignerLocalStorageEnabled'
import {TooltipPlacementProvider} from '../../utils/TooltipPlacementContext'
import {getBuilderChildren} from '../dnd'
import {CustomDragLayer} from '../dnd/components/CustomDragLayer'
import {LicenseManager} from '../license/LicenseManager'
import {LocalizationProvider} from '../localization'
import {FormBuilderContextProvider} from './FormBuilderContextProvider'
import {StylesProvider} from './StylesProvider'

class BuilderProviderData {
  constructor(public readonly store: Store,
              public readonly builderStore: BuilderStore,
              public readonly localStorageSynchronizer?: LocalStorageSynchronizer
  ) {
  }

  dispose() {
    this.localStorageSynchronizer?.dispose()
    this.builderStore.dispose()
    this.store.dispose()
  }
}

interface RawBuilderProvidersProps {
  props: FormBuilderProps
  children: ReactNode
}

interface BuilderProvidersProps extends RawBuilderProvidersProps {
  builderStore: BuilderStore
  store: Store
}

class BuilderComponentStateFactory {
  builderStore?: BuilderStore

  constructor() {
    makeObservable(this, {
      builderStore: observable.ref,
    }, {name: nameObservable(`BuilderComponentStateFactory`)})
  }

  createComponentState(data: ComponentData, store: Store, context?: ComponentPropertiesContext) {
    const localizer = (componentStore: ComponentStore) => {
      return store.localizeComponent('component', data.dataRoot, componentStore)
    }

    const computeChildren = (componentData: ComponentData, componentProps: Record<string, any>) => {
      if (this.builderStore?.builderMode === 'builder' && !store.parentStore) {
        return getBuilderChildren(this.builderStore, componentData, componentProps)
      }
      return getChildren(componentData, ComponentTree, componentProps)
    }

    return new ComponentState(data, store, localizer, computeChildren, context)
  }
}

const useBuilderProviderData = (props: FormBuilderProps) => useCallback(() => {
  const {builderRef, ...viewerProps} = props

  const stateFactory = new BuilderComponentStateFactory()
  const componentStateFactory = (data: ComponentData, store: Store, context?: ComponentPropertiesContext) => {
    return stateFactory.createComponentState(data, store, context)
  }
  const store = new Store(new FormViewerPropsStore(viewerProps), componentStateFactory)

  const builderStore = new BuilderStore(store, props)
  builderStore.changeBuilderMode('builder')
  stateFactory.builderStore = builderStore

  const localStorageSynchronizer = isDesignerLocalStorageEnabled()
    ? new LocalStorageSynchronizer(builderStore, props)
    : undefined
  return new BuilderProviderData(store, builderStore, localStorageSynchronizer)
}, [props])

/**
 * React component encapsulating MobX storage for the form builder.
 * @param props the React component properties.
 * @param props.children the children of the React component.
 * @param props.props the properties of the form builder component.
 * @param props.builderStore the form builder settings.
 * @param props.store the form viewer settings.
 * @returns the React element.
 */
const RawProviders = ({children, props, builderStore, store}: BuilderProvidersProps) => {
  const {builderRef, licenseKey, ...viewerProps} = props

  useEffect(() => {
    // If activeFormName is already set from LocalStorageSynchronizer, do not change it
    if (!builderStore.activeFormName || props.persistFormName === false) builderStore.activeFormName = props.formName
  }, [builderStore, props.formName, props.persistFormName])

  useEffect(() => {
    builderStore.view = props.view
  }, [builderStore, props.view])

  useEffect(() => {
    store.formViewerPropsStore.applyProps(viewerProps)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.initialData, props.view, props.validators, props.formValidators, props.localize, props.language, props.actions,
    props.errorWrapper, props.readOnly, props.disabled, props.componentWrapper])

  useEffect(() => {
    props.onFormSchemaChange?.(builderStore.formAsString)
  }, [builderStore.formAsString, props])

  useEffect(() => {
    if (!props.theme) return
    builderStore.theme = determineTheme(props.theme)
  }, [builderStore, props.theme])

  return (
    <ViewerPropsProvider value={viewerProps}>
      <BuilderStoreProvider value={builderStore}>
        <FormBuilderContextProvider builderRef={builderRef}>
          <StoreProvider value={store}>
            <LicenseManager licenseKey={licenseKey}>
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
            </LicenseManager>
          </StoreProvider>
        </FormBuilderContextProvider>
      </BuilderStoreProvider>
    </ViewerPropsProvider>
  )
}

const Providers = namedObserver('Providers', RawProviders)

/**
 * React component encapsulating MobX storage for the form builder.
 * @param props the React component properties.
 * @returns the React element.
 */
const RawBuilderProviders = (props: RawBuilderProvidersProps) => {
  const builderProviderDataFactory = useBuilderProviderData(props.props)
  const builderProviderData = useDisposable(builderProviderDataFactory)

  const builderStore = builderProviderData?.builderStore
  const store = builderProviderData?.store

  if (!builderStore || !store) return null

  return <Providers {...props} builderStore={builderStore} store={store}/>
}
export const BuilderProviders = namedObserver('BuilderProviders', RawBuilderProviders)
