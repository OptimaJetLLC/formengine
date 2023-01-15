import {Input} from 'rsuite'
import {LabeledProperty} from '../../ui/Containers'
import {PropertyEditorProps} from '../types'
import {makeAnnotationProps} from '../utils'

export const StringInput = (props: PropertyEditorProps) => {
  const {annotation, onBlur} = props
  return (
    <LabeledProperty componentStore={props.componentStore} annotation={annotation}>
      <Input name={annotation.key} onBlur={onBlur} {...makeAnnotationProps(props)} size={'xs'}/>
    </LabeledProperty>
  )
}
