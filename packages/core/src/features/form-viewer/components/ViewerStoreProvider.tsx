import {assign} from 'lodash'
import {ReactNode, useContext, useEffect, useMemo} from 'react'
import {Store} from '../../../stores/Store'
import {StoreContext, StoreProvider} from '../../../utils/contexts/StoreContext'
import {FormViewerProps} from '../FormViewer'

export const ViewerStoreProvider = ({children, props}: { children: ReactNode, props: FormViewerProps }) => {
  let store = useContext(StoreContext)
  store ??= useMemo(() => new Store(props), [])

  useEffect(() => {
    assign(store!.props, props)
  })

  return (
    <StoreProvider value={store}>
      {children}
    </StoreProvider>
  )
}
