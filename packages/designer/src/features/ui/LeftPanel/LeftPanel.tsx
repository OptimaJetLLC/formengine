import {ReactElement} from 'react'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {BuilderMode} from '../../../utils/types'
import {Rows} from '../../components/Containers'
import {customizableObserver} from '../../customization'
import {Panel} from '../Panel'
import {FormViewerState} from './components/FormViewerState'
import {LeftPanelNav} from './components/LeftPanelNav'

const ViewerContent = () => (
  <Rows style={{marginTop: 55, paddingInlineStart: 5, minHeight: 80}}>
    <FormViewerState/>
  </Rows>
)

const leftPanelViews: Record<BuilderMode, ReactElement> = {
  'builder': <LeftPanelNav/>,
  'viewer': <ViewerContent/>
}

export const LeftPanel = customizableObserver('LeftPanel', props => {
  const store = useBuilderStore()
  const view = leftPanelViews[store.builderMode]

  return (
    <Panel placement={'left'} {...props}>
      {view}
    </Panel>
  )
})
