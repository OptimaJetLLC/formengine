import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {customizableObserver} from '../../customization'
import {Panel} from '../Panel'
import {PropertiesEditor} from './PropertiesEditor'

const rightPanelViews = {
  'builder': <PropertiesEditor/>,
  'viewer': null
}

export const RightPanel = customizableObserver('RightPanel', props => {
  const store = useBuilderStore()
  const view = rightPanelViews[store.builderMode]

  return (
    <Panel placement={'right'} {...props}>
      {view}
    </Panel>
  )
})
