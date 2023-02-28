import {observer} from 'mobx-react'
import {StoreProps} from '../../stores/StoreProps'
import {EventStream} from '../event/utils/EventStream'
import {Viewer} from './components/Viewer'
import {ViewerStoreProvider} from './components/ViewerStoreProvider'
import './setupMobx'

export interface FormViewerProps extends StoreProps {
  event?: (stream: EventStream) => void
}

export const FormViewer = observer((props: FormViewerProps) => (
  <ViewerStoreProvider props={props}>
    <Viewer event={props.event}/>
  </ViewerStoreProvider>
))
