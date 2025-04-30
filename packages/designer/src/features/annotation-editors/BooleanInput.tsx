import styled from '@emotion/styled'
import {Checkbox} from 'rsuite'
import LabeledProperty from '../components/LabeledProperty'
import type {AnnotationEditorProps} from './AnnotationEditorProps'

export const SCheckbox = styled(Checkbox)`
  && {
    height: 23px;
    display: flex;
    align-items: center;
    width: 100%;

    .rs-checkbox-checker {
      padding-left: 0;
      margin-left: -10px;
    }
  }
`

/**
 * The property editor for the boolean property type.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
export const BooleanInput = (props: AnnotationEditorProps) => {
  const {value, onChange} = props
  return <LabeledProperty {...props}>
    <SCheckbox checked={!!value} onChange={(value, checked) => onChange(checked)}/>
  </LabeledProperty>
}
