import {observer} from 'mobx-react'
import React from 'react'
import {useBuilderStore} from '../../../../utils/contexts/BuilderStoreContext'
import {Panel} from '../Panel'
import {PropertiesEditor} from './PropertiesEditor'

export const RightPanel = observer(() => {
  const store = useBuilderStore()

  return (
    <Panel name={'rightPanel'} rightPlacement>
      {store.isBuilderMode
        && <PropertiesEditor/>}
    </Panel>
  )
})
