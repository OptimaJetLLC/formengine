import {define} from 'fb-core'
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
      <Textarea {...props}/>
    </div>
  )
}
const Textarea = (props: any) =>
  <Input rows={5} as="textarea" {...props}/>

export const textArea = define(TextArea)
  .props({
    'label': undefined,
    'placeholder': undefined,
    'rows': undefined,
  })
