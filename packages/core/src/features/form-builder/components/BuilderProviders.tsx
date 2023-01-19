import React, {ReactNode, useEffect, useMemo} from 'react'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {BuilderStore} from '../../../stores/BuilderStore'
import {LocalStorageSynchronizer} from '../../../stores/LocalStorageSynchronizer'
import {Store} from '../../../stores/Store'
import {BuilderStoreProvider} from '../../../utils/contexts/BuilderStoreContext'
import {StoreProvider} from '../../../utils/contexts/StoreContext'
import {CustomDragLayer} from '../../dnd/components/CustomDragLayer'
import {LocalizationProvider} from '../../localization'
import {FormBuilderProps} from '../FormBuilder'
import {StylesProvider} from './StylesProvider'

interface BuilderProvidersProps {
  props: FormBuilderProps
  children: ReactNode
}

export const BuilderProviders = ({children, props}: BuilderProvidersProps) => {
  const store = useMemo(() => new Store(props), [])
  const localStorageSynchronizer = useMemo(() => new LocalStorageSynchronizer(store), [])
  const buildStore = useMemo(() => {
    store.builderMode = 'builder'
    return new BuilderStore(store)
  }, [])
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
