import {observer} from 'mobx-react'
import {Viewer} from './components/Viewer'
import {ViewerStoreProvider} from './components/ViewerStoreProvider'
import {FormViewerProps} from './FormViewerProps'
import './setupMobx'

export const FormViewer = observer((props: FormViewerProps) => (
  <ViewerStoreProvider props={props}>
    <Viewer event={props.event}/>
  </ViewerStoreProvider>
))
