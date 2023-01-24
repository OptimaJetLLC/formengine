import {ReactNode, useEffect, useMemo, useRef} from 'react'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {BuilderStore} from '../../../stores/BuilderStore'
import {LocalStorageSynchronizer} from '../../../stores/LocalStorageSynchronizer'
import {Store} from '../../../stores/Store'
import {BuilderStoreProvider} from '../../../utils/contexts/BuilderStoreContext'
import {StoreProvider} from '../../../utils/contexts/StoreContext'
import {DropZone, Editable} from '../../dnd'
import {CustomDragLayer} from '../../dnd/components/CustomDragLayer'
import {FormViewerProps} from '../../form-viewer/FormViewer'
import {LocalizationProvider} from '../../localization'
import {FormBuilderProps} from '../FormBuilder'
import {StylesProvider} from './StylesProvider'

interface BuilderProvidersProps {
  props: FormBuilderProps
  children: ReactNode
}

export const BuilderProviders = ({children, props}: BuilderProvidersProps) => {
  const callCount = useRef(0)
  const store = useMemo(() => {
    const {getForm, ...otherProps} = props
    const cachedGetForm = () => callCount.current++ <= 0 && getForm ? getForm() : store.screen
    const storeProps: FormViewerProps = {getForm: cachedGetForm, ...otherProps}
    return new Store(storeProps)
  }, [])
  const buildStore = useMemo(() => {
    const builderStore = new BuilderStore(store, Editable, <DropZone isInner={true}/>)
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
