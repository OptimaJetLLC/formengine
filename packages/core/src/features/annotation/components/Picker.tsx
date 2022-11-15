import {InputPicker} from 'rsuite'
import {LabeledInput} from '../../ui/Containers'
import {PropertyEditorProps} from '../types'
import {isProperty, makeAnnotationProps} from '../utils'

export const Picker = ({componentStore, annotation}: PropertyEditorProps) => (
  <LabeledInput>
    <label>{annotation.name}</label>
    <InputPicker
      block
      {...makeAnnotationProps({componentStore, annotation})}
      data={isProperty(annotation) ? annotation.data : []}
    />
  </LabeledInput>
)
