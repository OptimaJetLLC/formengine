import {Form, InputNumber} from 'rsuite'
import {LabeledInput} from '../../ui/Containers'
import {PropertyEditorProps} from '../types'
import {makeAnnotationProps} from '../utils'

const NumberInput = (props: PropertyEditorProps) => <LabeledInput>
  <Form.ControlLabel>{props.annotation.name}</Form.ControlLabel>
  <InputNumber {...makeAnnotationProps(props)} size={'xs'}/>
</LabeledInput>

export {NumberInput}
