import styled from '@emotion/styled'
import {useAnnotation} from '../../../utils/contexts/EditorContext'
import {ActionList} from './components/ActionList'
import {AddActionButton} from './components/AddActionButton'

//EventEditor: one eventName - one editor - some actions
export const EventEditor = () => {
  const eventName = useAnnotation().annotation.key
  return (
    <SDiv>
      <SH6>{eventName}</SH6>
      <ActionList/>
      <AddActionButton/>
    </SDiv>
  )
}

const SDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`

const SH6 = styled.h6`
  margin-left: 10px;
`
