import {Form, InputNumber} from 'rsuite'
import {PropertyEditorProps} from '../types'
import {makeAnnotationProps} from '../utils'

const NumberInput = (props: PropertyEditorProps) => <div>
  <Form.ControlLabel>{props.annotation.name}</Form.ControlLabel>
  <InputNumber {...makeAnnotationProps(props)}/>
</div>

export {NumberInput}
