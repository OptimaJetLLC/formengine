import {useBuilderStore} from 'fb-core'
import {observer} from 'mobx-react'
import {Panel} from '../Panel'
import {Errors} from './components/Errors'
import {Tree} from './components/Tree'

const leftPanelViews = {
  'builder': <Tree/>,
  'viewer': <Errors style={{margin: 20}}/>
}

export const LeftPanel = observer(() => {
  const store = useBuilderStore()
  const view = leftPanelViews[store.builderMode]

  return (
    <Panel placement={'left'}>
      {view}
    </Panel>
  )
})
