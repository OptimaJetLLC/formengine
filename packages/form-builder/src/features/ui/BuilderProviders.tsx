import {externalActionsToActionsValues, Store, StoreProvider, useDestroy, ViewerPropsProvider} from '@react-form-builder/core'
import {observer} from 'mobx-react'
import {ReactNode, useEffect, useMemo} from 'react'
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
export const BuilderProviders = observer(({children, props}: BuilderProvidersProps) => {
  const store = useMemo(
    () => new Store(props.view, props.initialData ?? {}, props.externalValidators,
      props.localize, externalActionsToActionsValues(props.externalActions), props.language),
    [])

  const buildStore = useMemo(() => {
    const builderStore = new BuilderStore(store, props)

    builderStore.changeBuilderMode('builder')
    return builderStore
  }, [])

  useEffect(() => {
    buildStore.activeFormName = props.formName
  }, [props.formName])

  useEffect(() => {
    store.initialData = props.initialData ?? {}
    store.view = props.view
    store.externalValidators = props.externalValidators
    store.externalLocalizer = props.localize
    store.propsLanguage = props.language
    store.externalActions = externalActionsToActionsValues(props.externalActions)
  }, [props.initialData, props.view, props.externalValidators, props.localize, props.language, props.externalActions])

  const localStorageSynchronizer = useMemo(() => new LocalStorageSynchronizer(buildStore), [])

  useDestroy(() => {
    buildStore.destroy()
    store.dispose()
    localStorageSynchronizer.destroy()
  })

  return (
    <ViewerPropsProvider value={props}>
      <BuilderStoreProvider value={buildStore}>
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
