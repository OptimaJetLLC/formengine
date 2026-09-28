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
  ViewerPropsProvider,
} from '@react-form-builder/core'
import {makeObservable, observable} from 'mobx'
import type {ReactNode} from 'react'
import {useCallback, useEffect} from 'react'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import type {FormBuilderProps} from '../../FormBuilderProps'
import {BuilderStore} from '../../stores/BuilderStore'
import {LocalStorageSynchronizer, subscribeViewerLanguageWhenFormReady} from '../../stores/LocalStorageSynchronizer'
import {BuilderStoreProvider} from '../../utils/BuilderStoreContext'
import {determineTheme} from '../../utils/determineTheme'
import {isDesignerLocalStorageEnabled} from '../../utils/isDesignerLocalStorageEnabled'
import {TooltipPlacementProvider} from '../../utils/TooltipPlacementContext'
import {EditorMap} from '../annotation-editors/EditorMap'
import {CustomDragLayer} from '../dnd/components/CustomDragLayer'
import {getBuilderChildren} from '../dnd/components/Editable/Editable'
import {LicenseManager} from '../license/LicenseManager'
import {LocalizationProvider} from '../localization/components/LocalizationProvider'
import {resolveBuilderUiLanguage} from '../localization/languageUtils'
import {BuiltinPropertyEditorsProvider} from './BuiltinPropertyEditorsProvider'
import {FormBuilderContextProvider} from './FormBuilderContextProvider'
import {StylesProvider} from './StylesProvider'

class BuilderProviderData {
  constructor(
    public readonly store: Store,
    public readonly builderStore: BuilderStore,
    public readonly localStorageSynchronizer?: LocalStorageSynchronizer,
    private readonly extraDisposers: Array<() => void> = []
  ) {}

  dispose() {
    this.extraDisposers.forEach(dispose => dispose())
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
    makeObservable(
      this,
      {
        builderStore: observable.ref,
      },
      {name: nameObservable(`BuilderComponentStateFactory`)}
    )
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

const useBuilderProviderData = (props: FormBuilderProps) =>
  useCallback(() => {
    const {builderRef, ...viewerProps} = props

    const stateFactory = new BuilderComponentStateFactory()
    const componentStateFactory = (data: ComponentData, store: Store, context?: ComponentPropertiesContext) => {
      return stateFactory.createComponentState(data, store, context)
    }
    const store = new Store(new FormViewerPropsStore(viewerProps), componentStateFactory)

    const builderStore = new BuilderStore(store, props)
    builderStore.changeBuilderMode('builder')
    stateFactory.builderStore = builderStore

    const localStorageSynchronizer = isDesignerLocalStorageEnabled() ? new LocalStorageSynchronizer(builderStore, props) : undefined

    const extraDisposers: Array<() => void> = []
    if (!localStorageSynchronizer) {
      const lang = resolveBuilderUiLanguage(props.defaultBuilderLanguage, builderStore.availableLanguages) ?? builderStore.defaultLanguage
      void builderStore.changeLanguage(lang)
      if (props.defaultViewerLanguage) {
        extraDisposers.push(subscribeViewerLanguageWhenFormReady(builderStore, undefined, props.defaultViewerLanguage))
      }
    }

    return new BuilderProviderData(store, builderStore, localStorageSynchronizer, extraDisposers)
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
    store.form.componentTree.state = store.formViewerPropsStore.initialState
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.initialData,
    props.initialState,
    props.view,
    props.validators,
    props.formValidators,
    props.localize,
    props.actions,
    props.errorWrapper,
    props.readOnly,
    props.disabled,
    props.componentWrapper,
    props.userContext,
  ])

  useEffect(() => {
    props.onFormSchemaChange?.(builderStore.formAsString)
  }, [builderStore.formAsString, props])

  useEffect(() => {
    if (!props.theme) return
    builderStore.theme = determineTheme(props.theme)
  }, [builderStore, props.theme])

  useEffect(() => {
    const lang = resolveBuilderUiLanguage(props.defaultBuilderLanguage, builderStore.availableLanguages)
    if (!lang) return
    if (lang.fullCode === builderStore.formBuilderLanguage.fullCode) return
    void builderStore.changeLanguage(lang)
  }, [builderStore, props.defaultBuilderLanguage])

  return (
    <ViewerPropsProvider value={viewerProps}>
      <BuilderStoreProvider value={builderStore}>
        <BuiltinPropertyEditorsProvider value={EditorMap}>
          <FormBuilderContextProvider builderRef={builderRef}>
            <StoreProvider value={store}>
              <LicenseManager licenseKey={licenseKey}>
                <LocalizationProvider>
                  <StylesProvider>
                    <TooltipPlacementProvider value={'auto'}>
                      <DndProvider backend={HTML5Backend}>
                        {children}
                        <CustomDragLayer />
                      </DndProvider>
                    </TooltipPlacementProvider>
                  </StylesProvider>
                </LocalizationProvider>
              </LicenseManager>
            </StoreProvider>
          </FormBuilderContextProvider>
        </BuiltinPropertyEditorsProvider>
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

  return <Providers {...props} builderStore={builderStore} store={store} />
}
export const BuilderProviders = namedObserver('BuilderProviders', RawBuilderProviders)
