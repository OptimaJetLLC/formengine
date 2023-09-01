import styled from '@emotion/styled'
import {faMarker} from '@fortawesome/free-solid-svg-icons/faMarker.js'
import {ActionData, useComponentData} from '@react-form-builder/core'
import {Close} from '@rsuite/icons'
import {observer} from 'mobx-react'
import {ButtonGroup, IconButton} from 'rsuite'
import {EditableAction} from '../../../../../../stores/BuilderStore'
import {useBuilderStore} from '../../../../../../utils/BuilderStoreContext'
import {Columns} from '../../../../../components/Containers'
import {FaIcon} from '../../../../../components/Icons'
import {ArgumentList} from './components/ArgumentList'
import {ActionDataProvider} from './contexts/ActionDataContext'

interface ActionItemProps {
  data: ActionData,
  eventName: string
  index: number
}

export const ActionItem = observer(({data, eventName, index}: ActionItemProps) => {
  const {store} = useComponentData()
  const builderStore = useBuilderStore()
  const isCustomAction = data.type === 'custom'
  const edit = () => builderStore.currentEditable = new EditableAction(eventName, data)
  const remove = () => store.events![eventName]?.splice(index, 1)

  return (
    <ActionDataProvider value={data}>
      <SDiv>
        <Columns style={{justifyContent: 'space-between', padding: 8}}>
          <b style={{color: 'violet', marginLeft: 5}}>
            {`${data.name || 'Action'}`}
          </b>
          <ButtonGroup size={'xs'}>
            {isCustomAction && <IconButton onClick={edit} icon={<FaIcon icon={faMarker}/>}/>}
            <IconButton onClick={remove} icon={<Close/>}/>
          </ButtonGroup>
        </Columns>
        <ArgumentList/>
      </SDiv>
    </ActionDataProvider>
  )
})
const SDiv = styled.div`
  position: relative;
  overflow: hidden;
  background-color: var(--rs-btn-default-bg);
  border-radius: 10px;
`
