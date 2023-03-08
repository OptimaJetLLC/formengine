import {BuilderStore, BuilderStoreProvider, DefaultActions, FormViewerProps, Store, StoreProvider} from 'fb-core'
import {ReactNode, useEffect, useMemo, useRef} from 'react'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {LocalStorageSynchronizer} from '../../../stores/LocalStorageSynchronizer'
import {DropZone, Editable} from '../../dnd'
import {CustomDragLayer} from '../../dnd/components/CustomDragLayer'
import {LocalizationProvider} from '../../localization'
import {FormBuilderProps} from '../FormBuilderProps'
import {StylesProvider} from './StylesProvider'

interface BuilderProvidersProps {
  props: FormBuilderProps
  children: ReactNode
}

const ComponentDropZone = ({bindTo, bindCondition}: { bindTo?: string, bindCondition?: string }) => {
  return <DropZone isInner={true} bindTo={bindTo} bindCondition={bindCondition}/>
}

export const BuilderProviders = ({children, props}: BuilderProvidersProps) => {
  const callCount = useRef(0)
  const store = useMemo(() => {
    const {getForm, ...otherProps} = props
    const cachedGetForm = () => callCount.current++ <= 0 && getForm ? getForm() : store.screen
    const storeProps: FormViewerProps = {getForm: cachedGetForm, ...otherProps}
    return new Store(storeProps, DefaultActions)
  }, [])
  const buildStore = useMemo(() => {
    const builderStore = new BuilderStore(store, Editable, ComponentDropZone)
    builderStore.changeBuilderMode('builder')
    return builderStore
  }, [])
  const localStorageSynchronizer = useMemo(() => new LocalStorageSynchronizer(buildStore), [])
  useEffect(() => () => {
    buildStore.destroy()
    localStorageSynchronizer.destroy()
  }, [])

  return (
    <BuilderStoreProvider value={buildStore}>
      <StoreProvider value={store}>
        <LocalizationProvider>
          <StylesProvider>
            <DndProvider backend={HTML5Backend}>
              {children}
              <CustomDragLayer/>
            </DndProvider>
          </StylesProvider>
        </LocalizationProvider>
      </StoreProvider>
    </BuilderStoreProvider>
  )
}
