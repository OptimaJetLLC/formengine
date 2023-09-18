import styled from '@emotion/styled'
import {PropertyAn} from '@react-form-builder/core'
import {isUndefined} from 'lodash-es'
import {InputPicker} from 'rsuite'
import LabeledProperty from '../components/LabeledProperty'
import type {AnnotationEditorProps} from './AnnotationEditorProps'

const addCustomValue = ({data}: PropertyAn, value: string) => {
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
export const Picker = (props: AnnotationEditorProps) => {
  const {value, onChange, annotation, onClean} = props
  const data = addCustomValue(annotation as PropertyAn, value)

  return <LabeledProperty {...props}>
    <SInputPicker value={value ?? ''} data={data} onChange={onChange} onClean={onClean}
                  block cleanable creatable size={'xs'}/>
  </LabeledProperty>
}

const SInputPicker = styled(InputPicker)`
  width: 100%;
`
