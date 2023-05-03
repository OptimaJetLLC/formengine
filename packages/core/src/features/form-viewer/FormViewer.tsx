import {namedObserver} from '../../utils'
import {Viewer} from './components/Viewer'
import {ViewerStoreProvider} from './components/ViewerStoreProvider'
import './setupMobx'
import {FormViewerProps} from './types'

//No other code here
export const FormViewer = namedObserver('FormViewer', (props: FormViewerProps) =>
  <ViewerStoreProvider props={props}>
    <Viewer event={props.event}/>
  </ViewerStoreProvider>
)
