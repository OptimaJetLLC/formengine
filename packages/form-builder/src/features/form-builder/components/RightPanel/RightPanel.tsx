import {useBuilderStore} from 'fb-core'
import {observer} from 'mobx-react'
import {Panel} from '../Panel'
import {PropertiesEditor} from './PropertiesEditor'

const rightPanelViews = {
  'builder': <PropertiesEditor/>,
  'viewer': null,
  'json': null
}

export const RightPanel = observer(() => {
  const store = useBuilderStore()
  const view = rightPanelViews[store.builderMode]

  return (
    <Panel name={'rightPanel'} rightPlacement>
      {view}
    </Panel>
  )
})
