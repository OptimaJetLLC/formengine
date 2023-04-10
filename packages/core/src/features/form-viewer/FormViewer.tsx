import {StoreProps} from '../../stores/StoreProps'
import {namedObserver} from '../../utils'
import {EventStream} from '../event/utils/EventStream'
import {Viewer} from './components/Viewer'
import {ViewerStoreProvider} from './components/ViewerStoreProvider'
import './setupMobx'

export interface FormViewerProps extends StoreProps {
  event?: (stream: EventStream) => void
}

//No other code here
export const FormViewer = namedObserver('FormViewer', (props: FormViewerProps) =>
  <ViewerStoreProvider props={props}>
    <Viewer event={props.event}/>
  </ViewerStoreProvider>
)
