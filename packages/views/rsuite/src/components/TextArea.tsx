import {define, number, string} from 'fb-core'
import {Form, Input} from 'rsuite'

interface TextAreaProps {
  label: string,
  rows: number,
  placeholder: string,
}

const TextArea = (props: TextAreaProps) => {
  return (
    <div>
      <Form.ControlLabel>{props.label}</Form.ControlLabel>
      <Input as="textarea" {...props}/>
    </div>
  )
}

export const textArea = define(TextArea)
  .props({
    label: string.default('Text area'),
    placeholder: string,
    rows: number.default(5),
  })
