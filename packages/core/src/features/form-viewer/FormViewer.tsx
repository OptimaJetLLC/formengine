import {observer} from 'mobx-react'
import {ComponentStore} from '../../stores/ComponentStore'
import {View} from '../define'
import {ActionDefinition} from '../event/types'
import {EventBus} from '../event/utils/EventBus'
import {Viewer} from './components/Viewer'
import {ViewerStoreProvider} from './components/ViewerStoreProvider'
import './setupMobx'

export interface FormViewerProps {
  event?: (bus: EventBus) => void
  getForm?: () => ComponentStore
  view: View
  actions?: ActionDefinition[]
  data?: Record<string, unknown>
  /** No use a error wrap component. */
  erroneous?: boolean
}

export const FormViewer = observer((props: FormViewerProps) => (
  <ViewerStoreProvider props={props}>
    <Viewer/>
  </ViewerStoreProvider>
))
