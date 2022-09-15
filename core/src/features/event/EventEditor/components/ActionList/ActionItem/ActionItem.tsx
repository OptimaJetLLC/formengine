import {observer} from 'mobx-react'
import {ComponentStore} from '../../../../../../stores/ComponentStore'
import {WeakActionData} from '../../../../types'
import {useSyncActionData} from '../../../hooks/useSyncActionData'
import {ArgumentList} from './components/ArgumentList'
import {ChoosenAction} from './components/ChoosenAction'
import {ChoosenTarget} from './components/ChoosenTarget'
import {ActionDataProvider} from './contexts/ActionDataContext'

interface ActionItemProps {
  weakData: WeakActionData,
  componentStore: ComponentStore
  eventName: string
  index: number
}

export const ActionItem = observer(({weakData, componentStore, eventName, index}: ActionItemProps) => {
  const data = useSyncActionData(weakData)

  return (
    <ActionDataProvider value={data}>
      <div style={{
        backgroundColor: 'rgb(247, 247, 250)',
        borderRadius: 10, padding: '10px 5px 0'
      }}>
        <ChoosenTarget/>
        <ChoosenAction/>
        <ArgumentList/>
      </div>
    </ActionDataProvider>
  )
})




