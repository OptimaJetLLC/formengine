import styled from '@emotion/styled'
import {MouseEvent} from 'react'
import {Checkbox, Form} from 'rsuite'
import {PropertyEditorProps} from '../types'
import {makeAnnotationProps} from '../utils'

const BooleanInput = ({componentStore, annotation}: PropertyEditorProps) => {
  const {value, onChange} = makeAnnotationProps({componentStore, annotation})
  const onClick = (e: MouseEvent) => {
    e.preventDefault()
    onChange(!value)
  }
  return <Container onClick={onClick}>
    <label>{annotation.name}</label>
    <Checkbox checked={!!value} onChange={(value, checked) => onChange(checked)}/>
    {/*//TODO Fix style for hint*/}
    {annotation.hint && <Form.HelpText tooltip>{annotation.hint}</Form.HelpText>}
  </Container>
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  &, & > * {
    cursor: pointer;
  }
`

export {BooleanInput}
