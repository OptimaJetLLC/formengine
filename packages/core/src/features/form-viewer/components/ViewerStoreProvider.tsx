import {assign} from 'lodash'
import {ReactNode, useContext, useEffect, useMemo} from 'react'
import {Store} from '../../../stores/Store'
import {EventBusContext, EventBusProvider} from '../../../utils/contexts/EventBusContext'
import {StoreContext, StoreProvider} from '../../../utils/contexts/StoreContext'
import {defaultActions} from '../../event/defaultActions'
import {EventBus} from '../../event/utils/EventBus'
import {FormViewerProps} from '../FormViewerProps'

export const ViewerStoreProvider = ({children, props}: { children: ReactNode, props: FormViewerProps }) => {
  let store = useContext(StoreContext)
  store ??= useMemo(() => new Store(props, defaultActions), [])

  let eventBus = useContext(EventBusContext)
  eventBus ??= useMemo(() => new EventBus(), [])

  useEffect(() => {
    assign(store!.props, props)
  })

  return (
    <StoreProvider value={store}>
      <EventBusProvider value={eventBus}>
        {children}
      </EventBusProvider>
    </StoreProvider>
  )
}
