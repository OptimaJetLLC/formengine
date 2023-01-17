import {observer} from 'mobx-react'
import React from 'react'
import {useStore} from '../../../../utils/contexts/StoreContext'
import {Panel} from '../Panel'
import {Errors} from './components/Errors'
import {Tree} from './components/Tree'

const leftPanelViews = {
  'builder': <Tree/>,
  'viewer': <Errors style={{margin: 20}}/>,
  'json': null
}

export const LeftPanel = observer(() => {
  const store = useStore()
  const view = leftPanelViews[store.builderMode]

  return (
    <Panel name={'leftPanel'}>
      {view}
    </Panel>
  )
})
