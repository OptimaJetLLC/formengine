import {define, number, string} from 'fb-core'
import {Form, Input} from 'rsuite'

interface RsTextAreaProps {
  label: string,
  rows: number,
  placeholder: string,
}

const RsTextArea = (props: RsTextAreaProps) => {
  return (
    <div>
      <Form.ControlLabel>{props.label}</Form.ControlLabel>
      <Input as="textarea" {...props}/>
    </div>
  )
}

export const rsTextArea = define(RsTextArea)
  .props({
    label: string.default('Text area'),
    placeholder: string,
    rows: number.default(5),
  })
