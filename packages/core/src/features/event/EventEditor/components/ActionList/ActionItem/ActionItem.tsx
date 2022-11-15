import styled from '@emotion/styled'
import {Close} from '@rsuite/icons'
import {observer} from 'mobx-react'
import {ComponentStore} from '../../../../../../stores/ComponentStore'
import {WeakActionData} from '../../../../types'
import {useSyncActionData} from '../../../hooks/useSyncActionData'
import {removeAction} from '../../AddActionButton/utils'
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
      <Container>
        <ChoosenTarget/>
        <ChoosenAction/>
        <ArgumentList/>
        <RemoveButton onClick={() => removeAction(componentStore, eventName, index)}/>
      </Container>
    </ActionDataProvider>
  )
})

const Container = styled.div`
  position: relative;
  overflow: hidden;
  background-color: var(--rs-btn-default-bg);
  border-radius: 10px;
  padding: 10px 5px 35px;
`
const RemoveButton = styled(Close)`
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
`




