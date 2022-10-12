import React, {useMemo} from 'react'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {CustomDragLayer} from '../dnd/components/CustomDragLayer'
import {Localization} from '../localization'
import {Store} from '../../stores/Store'
import {Styles} from './styles'
import {StoreProvider} from '../../utils/contexts/StoreContext'


export const BuilderProviders = ({children, view}: any) => {
  const store = useMemo(() => new Store(view), [])
  return (
    <Localization store={store}>
      <StoreProvider value={store}>
        <Styles>
          <DndProvider backend={HTML5Backend}>
            {children}
            <CustomDragLayer/>
          </DndProvider>
        </Styles>
      </StoreProvider>
    </Localization>
  )
}
