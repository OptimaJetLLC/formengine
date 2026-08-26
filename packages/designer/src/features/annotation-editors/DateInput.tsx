import {DatePicker} from 'rsuite'
import LabeledProperty from '../components/LabeledProperty'
import type {AnnotationEditorProps} from './AnnotationEditorProps'

/**
 * The property editor for the date property type.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
export const DateInput = (props: AnnotationEditorProps) => {
  const {onChange, onClean, value} = props

  return <LabeledProperty {...props}>
    <DatePicker editable={false} cleanable={true} placement={'auto'}
                value={value ?? null} onChange={onChange} onClean={onClean} size={'xs'}/>
  </LabeledProperty>
}
