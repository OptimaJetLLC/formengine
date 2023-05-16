import {DefaultActions, Store, StoreProvider, ViewerPropsProvider} from '@react-form-builder/core'
import {assign} from 'lodash-es'
import {useLocalObservable} from 'mobx-react'
import {ReactNode, useEffect, useMemo} from 'react'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {FormBuilderProps} from '../../FormBuilderProps'
import {BuilderStore} from '../../stores/BuilderStore'
import {LocalStorageSynchronizer} from '../../stores/LocalStorageSynchronizer'
import {BuilderStoreProvider} from '../../utils/BuilderStoreContext'
import {CustomDragLayer} from '../dnd/components/CustomDragLayer'
import {LocalizationProvider} from '../localization'
import {StylesProvider} from './StylesProvider'

interface BuilderProvidersProps {
  props: FormBuilderProps
  children: ReactNode
}

export const BuilderProviders = ({children, props}: BuilderProvidersProps) => {
  const observableProps = useLocalObservable(() => props)
  const store = useMemo(() => new Store(observableProps, DefaultActions), [])

  const buildStore = useMemo(() => {
    const builderStore = new BuilderStore(store, observableProps, props.formStorage)

    builderStore.changeBuilderMode('builder')
    return builderStore
  }, [])

  useEffect(() => {
    assign(observableProps, props)
  })

  const localStorageSynchronizer = useMemo(() => new LocalStorageSynchronizer(buildStore), [])
  useEffect(() => () => {
    buildStore.destroy()
    localStorageSynchronizer.destroy()
  }, [])

  return (
    <ViewerPropsProvider value={observableProps}>
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
    </ViewerPropsProvider>
  )
}
