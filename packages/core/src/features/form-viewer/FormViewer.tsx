import {namedObserver} from '../../utils'
import {ViewerLocalizationProvider} from '../localization/ViewerLocalizationProvider'
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
    <ViewerLocalizationProvider language={props.language}>
      <Viewer event={props.event}/>
    </ViewerLocalizationProvider>
  </ViewerStoreProvider>
)
