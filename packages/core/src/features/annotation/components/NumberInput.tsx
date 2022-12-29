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
  return <LabeledInput>
    <Form.ControlLabel>{props.annotation.name}</Form.ControlLabel>
    <InputNumber {...inputProps} onChange={handleChange} size={'xs'}/>
  </LabeledInput>
}

export {NumberInput}
