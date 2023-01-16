import {InputNumber} from 'rsuite'
import {LabeledProperty} from '../../ui/Containers'
import {PropertyEditorProps} from '../types'
import {makeAnnotationProps} from '../utils'

const NumberInput = (props: PropertyEditorProps) => {
  const {onChange, ...inputProps} = {...makeAnnotationProps(props)}
  const handleChange = (value: any) => {
    if (typeof value === 'string') {
      onChange(Number(value))
      return
    }
    onChange(value)
  }
  const inputNumberProps = {...props.annotation.editorProps, ...inputProps}

  return <LabeledProperty annotation={props.annotation}>
    <InputNumber {...inputNumberProps} onChange={handleChange} size={'xs'}/>
  </LabeledProperty>
}

export {NumberInput}
