import {observer} from 'mobx-react'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {Panel} from '../Panel'
import {PropertiesEditor} from './PropertiesEditor'

const rightPanelViews = {
  'builder': <PropertiesEditor/>,
  'viewer': null
}

export const RightPanel = observer(() => {
  const store = useBuilderStore()
  const view = rightPanelViews[store.builderMode]

  return (
    <Panel placement={'right'}>
      {view}
    </Panel>
  )
})
