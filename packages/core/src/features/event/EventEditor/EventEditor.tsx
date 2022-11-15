import styled from '@emotion/styled'
import {PropertyEditorProps} from '../../annotation/types'
import {ActionList} from './components/ActionList'
import {AddActionButton} from './components/AddActionButton'

//EventEditor: one eventName - one editor - some actions
export const EventEditor = ({annotation}: PropertyEditorProps) => {
  return <Container>
    <h6 style={{marginLeft: 10}}>{annotation.key}</h6>
    <ActionList eventName={annotation.key}/>
    <AddActionButton eventKey={annotation.key}/>
  </Container>
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`
