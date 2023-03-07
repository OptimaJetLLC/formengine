import styled from '@emotion/styled'
import {Close} from '@rsuite/icons'
import {observer} from 'mobx-react'
import {ComponentStore} from '../../../../../../stores/ComponentStore'
import {useComponentData} from '../../../../../../utils/contexts/ComponentDataContext'
import {ActionData} from '../../../../types'
import {ArgumentList} from './components/ArgumentList'
import {ChoosenAction} from './components/ChoosenAction'
import {ChoosenTarget} from './components/ChoosenTarget'
import {ActionDataProvider} from './contexts/ActionDataContext'

interface ActionItemProps {
  data: ActionData,
  eventName: string
  index: number
}

export const ActionItem = observer(({data, eventName, index}: ActionItemProps) => {
  const {componentStore} = useComponentData()

  return (
    <ActionDataProvider value={data}>
      <SDiv>
        {data.type === 'linked' ? <ChoosenTarget/> : null}
        <ChoosenAction/>
        <ArgumentList/>
        <RemoveButton onClick={() => removeAction(componentStore, eventName, index)}/>
      </SDiv>
    </ActionDataProvider>
  )
})

const removeAction = (componentStore: ComponentStore, eventKey: string, index: number) => {
  componentStore.events![eventKey]?.splice(index, 1)
}

const SDiv = styled.div`
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
