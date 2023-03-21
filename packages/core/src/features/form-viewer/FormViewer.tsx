import {observer} from 'mobx-react'
import {StoreProps} from '../../stores/StoreProps'
import useViewMode from '../../utils/useViewMode'
import {EventStream} from '../event/utils/EventStream'
import {Viewer} from './components/Viewer'
import {ViewerStoreProvider} from './components/ViewerStoreProvider'
import './setupMobx'

export interface FormViewerProps extends StoreProps {
  event?: (stream: EventStream) => void
}

export const FormViewer = observer(({viewMode: initialViewMode, ...props}: FormViewerProps) => {
  const viewMode = useViewMode(initialViewMode)
  return <ViewerStoreProvider props={{viewMode, ...props}}>
    <Viewer event={props.event}/>
  </ViewerStoreProvider>
})
