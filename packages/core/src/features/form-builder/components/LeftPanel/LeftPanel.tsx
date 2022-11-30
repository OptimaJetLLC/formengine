import {observer} from 'mobx-react'
import React from 'react'
import {useStore} from '../../../../utils/contexts/StoreContext'
import {Panel} from '../Panel'
import {Errors} from './components/Errors'
import {Tree} from './components/Tree'

export const LeftPanel = observer(() => {
  const store = useStore()

  return (
    <Panel name={'leftPanel'}>
      {store.isBuilderMode
        ? <Tree/>
        : <Errors style={{margin: 20}}/>}
    </Panel>
  )
})
