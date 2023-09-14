import {PropertyAn} from '../annotation/types/annotations/PropertyAn'
import LabeledProperty from '../components/LabeledProperty'
import {RadioButtons} from '../components/RadioButtons'
import type {AnnotationEditorProps} from './AnnotationEditorProps'

/**
 * The property editor for property type "single select", displays values as radio buttons.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
export const RadioInput = (props: AnnotationEditorProps) => {
  const {value, onChange, annotation} = props
  return (
    <LabeledProperty {...props}>
      <RadioButtons items={(annotation as PropertyAn).data} onChange={onChange} value={value}/>
    </LabeledProperty>
  )
}
