import type {PropertyAnnotation} from '@react-form-builder/core'
import {isUndefined, namedObserver} from '@react-form-builder/core'
import {useMemo} from 'react'
import LabeledProperty from '../components/LabeledProperty'
import type {AnnotationEditorProps} from './AnnotationEditorProps'
import {SInputPicker} from './SInputPicker'
import {useCalculatedEditorProps} from './utils/useCalculatedEditorProps'

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
export const RawPicker = (props: AnnotationEditorProps & { 'data-testid'?: string }) => {
  const {['data-testid']: testId, value, onChange, onClean, componentData, annotation} = props
  const calculatedEditorProps = useCalculatedEditorProps(annotation, componentData)

  const data = useMemo(() => {
    return addCustomValue(annotation as PropertyAnnotation, value)
  }, [annotation, value])

  return <LabeledProperty {...props}>
    <SInputPicker value={value ?? props.annotation.default ?? ''} data={data} onChange={onChange} onClean={onClean}
                  block cleanable creatable size={'xs'} placement={'autoVerticalEnd'} {...calculatedEditorProps}
                  data-testid={testId}/>
  </LabeledProperty>
}

export const Picker = namedObserver('Picker', RawPicker)
