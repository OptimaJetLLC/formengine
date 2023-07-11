import {namedObserver} from '../../utils'
import {Viewer} from './components/Viewer'
import {ViewerStoreProvider} from './components/ViewerStoreProvider'
import './setupMobx'
import {FormViewerProps} from './types'

//No other code here
/**
 * The main React component of the form viewer.
 * @returns the React element.
 */
export const FormViewer = namedObserver('FormViewer', (props: FormViewerProps) =>
  <ViewerStoreProvider props={props}>
    <Viewer event={props.event}/>
  </ViewerStoreProvider>
)
