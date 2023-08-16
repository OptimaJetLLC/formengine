import styled from '@emotion/styled'
import {ActionData, ComponentStore, useComponentData} from '@react-form-builder/core'
import {Close} from '@rsuite/icons'
import {observer} from 'mobx-react'
import {ArgumentList} from './components/ArgumentList'
import {ChoosenAction} from './components/ChoosenAction'
import {ActionDataProvider} from './contexts/ActionDataContext'

interface ActionItemProps {
  data: ActionData,
  eventName: string
  index: number
}

export const ActionItem = observer(({data, eventName, index}: ActionItemProps) => {
  const {store} = useComponentData()

  return (
    <ActionDataProvider value={data}>
      <SDiv>
        <ChoosenAction/>
        <ArgumentList/>
        <RemoveButton onClick={() => removeAction(store, eventName, index)}/>
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
