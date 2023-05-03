import {assign} from 'lodash-es'
import {useLocalObservable} from 'mobx-react'
import {ReactNode, useContext, useEffect, useMemo} from 'react'
import {Store} from '../../../stores/Store'
import {StoreContext, StoreProvider} from '../../../utils/contexts/StoreContext'
import {DefaultActions} from '../../event'
import {FormViewerProps} from '../types'
import {ViewerPropsProvider} from './ViewerPropsContext'

export const ViewerStoreProvider = ({children, props}: { children: ReactNode, props: FormViewerProps }) => {
  const observableProps = useLocalObservable(() => props)
  let store = useContext(StoreContext)
  store ??= useMemo(() => new Store(observableProps, DefaultActions), [])

  useEffect(() => {
    assign(observableProps, props)
  })

  return (
    <ViewerPropsProvider value={observableProps}>
      <StoreProvider value={store}>
        {children}
      </StoreProvider>
    </ViewerPropsProvider>
  )
}
