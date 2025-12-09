import type {PropertyAnnotation} from '@react-form-builder/core'
import {isUndefined} from '@react-form-builder/core'
import {useMemo} from 'react'
import LabeledProperty from '../components/LabeledProperty'
import type {AnnotationEditorProps} from './AnnotationEditorProps'
import {SInputPicker} from './SInputPicker'

const addCustomValue = ({data}: PropertyAnnotation, value: string) => {
  if (isUndefined(value)) {
    return data
  }

  if (!data.find(item => item.value === value || item.label === value)) {
    return [...data, {value, label: value}]
  }

  return data
}

/**
 * The property editor for property of type "single select", displays values as select.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
export const Picker = (props: AnnotationEditorProps & { 'data-testid'?: string }) => {
  const {['data-testid']: testId, ...labeledProps} = props
  const {value, onChange, annotation, onClean} = props
  const data = useMemo(() => {
    return addCustomValue(annotation as PropertyAnnotation, value)
  },[annotation, value])

  return <LabeledProperty {...labeledProps}>
    <SInputPicker value={value ?? props.annotation.default ?? ''} data={data} onChange={onChange} onClean={onClean}
                  block cleanable creatable size={'xs'} {...props.annotation.editorProps} placement={'autoVerticalEnd'}
                  data-testid={testId}/>
  </LabeledProperty>
}
