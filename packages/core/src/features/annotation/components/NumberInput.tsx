import {Form, InputNumber} from 'rsuite'
import {PropertyEditorProps} from '../types'

const NumberInput = ({componentStore, annotation}: PropertyEditorProps) => <div>
  <Form.ControlLabel>{annotation.name}</Form.ControlLabel>
  <InputNumber
    value={componentStore.props[annotation.key]}
    onChange={value => componentStore.props[annotation.key] = value}
  />
</div>

export {NumberInput}
