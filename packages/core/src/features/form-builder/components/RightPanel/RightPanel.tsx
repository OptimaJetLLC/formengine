import {observer} from 'mobx-react'
import {useStore} from '../../../../utils/contexts/StoreContext'
import {Panel} from '../Panel'
import {PropertiesEditor} from './PropertiesEditor'

const rightPanelViews = {
  'builder': <PropertiesEditor/>,
  'viewer': null,
  'json': null
}

export const RightPanel = observer(() => {
  const store = useStore()
  const view = rightPanelViews[store.builderMode]

  return (
    <Panel name={'rightPanel'} rightPlacement>
      {view}
    </Panel>
  )
})
