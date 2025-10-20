import styled from '@emotion/styled'
import type {AnnotationEditorProps} from '../AnnotationEditorProps'
import {ActionList} from './components/ActionList'
import {AddActionButton} from './components/AddActionButton'

const SDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`

const SH6 = styled.h6`
  margin-inline-start: 10px;
`

//EventEditor: one eventName - one editor - some actions
/**
 * The property editor for the event property type.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
export const EventEditor = (props: AnnotationEditorProps) => {
  const eventName = props.annotation.key
  return (
    <SDiv>
      <SH6>{eventName}</SH6>
      <ActionList {...props}/>
      <AddActionButton {...props}/>
    </SDiv>
  )
}
