import {DatePicker} from 'rsuite'
import LabeledProperty from '../components/LabeledProperty'
import type {AnnotationEditorProps} from './AnnotationEditorProps'

/**
 * The property editor for the date property type.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
export const DateInput = (props: AnnotationEditorProps) => {
  const {onChange, onClean} = props
  let {value} = props

  // TODO FE-1304 Date values conversion on form load in validation schema
  if (typeof value === 'string') {
    value = new Date(value)
  }
  return <LabeledProperty {...props}>
    <DatePicker editable={false} cleanable={true} placement={'auto'}
                value={value ?? null} onChange={onChange} onClean={onClean} size={'xs'}/>
  </LabeledProperty>
}
