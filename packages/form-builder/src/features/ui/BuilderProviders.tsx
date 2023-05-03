import {DefaultActions, Store, StoreProvider} from 'fb-core'
import {assign} from 'lodash-es'
import {ReactNode, useEffect, useMemo} from 'react'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {FormBuilderProps} from '../../FormBuilderProps'
import {BuilderStore} from '../../stores/BuilderStore'
import {LocalStorageSynchronizer} from '../../stores/LocalStorageSynchronizer'
import {BuilderStoreProvider} from '../../utils/BuilderStoreContext'
import {Editable} from '../dnd'
import {CustomDragLayer} from '../dnd/components/CustomDragLayer'
import {LocalizationProvider} from '../localization'
import {StylesProvider} from './StylesProvider'

interface BuilderProvidersProps {
  props: FormBuilderProps
  children: ReactNode
}

export const BuilderProviders = ({children, props}: BuilderProvidersProps) => {
  const store = useMemo(() => new Store(props, DefaultActions), [])

  useEffect(() => {
    assign(store.props, props)
  }, [props])

  const buildStore = useMemo(() => {
    const builderStore = new BuilderStore(store, Editable, props.formStorage)

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
