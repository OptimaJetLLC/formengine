import styled from '@emotion/styled'
import type {PropertyAnnotation} from '@react-form-builder/core'
import {isUndefined} from 'lodash-es'
import {InputPicker} from 'rsuite'
import LabeledProperty from '../components/LabeledProperty'
import type {AnnotationEditorProps} from './AnnotationEditorProps'

const SInputPicker = styled(InputPicker)`
  width: 100%;
`

const addCustomValue = ({data}: PropertyAnnotation, value: string) => {
  if (isUndefined(value)) {
    return data
  }

  if (!data.find(item => item.value === value || item.label === value)) {
    data.push({value, label: value})
  }

  return data
}

/**
 * The property editor for property of type "single select", displays values as select.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
export const Picker = (props: AnnotationEditorProps & { 'data-testid'?: string }) => {
  const labeledProps = {...props}
  delete labeledProps['data-testid']

  const {value, onChange, annotation, onClean} = props
  const data = addCustomValue(annotation as PropertyAnnotation, value)

  return <LabeledProperty {...labeledProps}>
    <SInputPicker value={value ?? props.annotation.default ?? ''} data={data} onChange={onChange} onClean={onClean}
                  block cleanable creatable size={'xs'} {...props.annotation.editorProps} placement={'autoVerticalEnd'}
                  data-testid={props['data-testid']}/>
  </LabeledProperty>
}
