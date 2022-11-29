import {Input} from 'rsuite'
import {LabeledInput} from '../../ui/Containers'
import {PropertyEditorProps} from '../types'
import {makeAnnotationProps} from '../utils'

const StringInput = (props: PropertyEditorProps) => {
  const {annotation, onBlur} = props
  return (
    <LabeledInput>
      <label>{annotation.name}</label>
      <Input name={annotation.key} onBlur={onBlur} {...makeAnnotationProps(props)} size={'xs'}/>
    </LabeledInput>
  )
}

export {StringInput}
