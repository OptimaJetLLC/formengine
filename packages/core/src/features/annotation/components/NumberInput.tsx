import {Form, InputNumber} from 'rsuite'
import {LabeledInput} from '../../ui/Containers'
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

  return <LabeledInput>
    <Form.ControlLabel>{props.annotation.name}</Form.ControlLabel>
    <InputNumber {...inputNumberProps} onChange={handleChange} size={'xs'}/>
  </LabeledInput>
}

export {NumberInput}
