import {observer} from 'mobx-react'
import React from 'react'
import {useStore} from '../../../../utils/contexts/StoreContext'
import {Panel} from '../Panel'
import {PropertiesEditor} from './PropertiesEditor'

export const RightPanel = observer(() => {
  const store = useStore()

  return (
    <Panel name={'rightPanel'} rightPlacement>
      {store.isBuilderMode
        && <PropertiesEditor/>}
    </Panel>
  )
})
