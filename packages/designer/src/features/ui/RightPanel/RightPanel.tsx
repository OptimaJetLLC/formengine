import {namedObserver} from '@react-form-builder/core'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {Panel} from '../Panel'
import {PropertiesEditor} from './PropertiesEditor'

const rightPanelViews = {
  'builder': <PropertiesEditor/>,
  'viewer': null
}

export const RightPanel = namedObserver('RightPanel', () => {
  const store = useBuilderStore()
  const view = rightPanelViews[store.builderMode]

  return (
    <Panel placement={'right'}>
      {view}
    </Panel>
  )
})
