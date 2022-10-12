import {Checkbox, Form} from 'rsuite'
import {PropertyEditorProps} from '../types'

const BooleanInput = ({componentStore, annotation}: PropertyEditorProps) => {
  const checked = componentStore.props[annotation.key] ?? false;
  return <div>
    <Form.ControlLabel>{annotation.name}</Form.ControlLabel>
    <Checkbox
      checked={checked}
      onChange={(value, checked) => componentStore.props[annotation.key] = checked}
    />
  </div>
}

export {BooleanInput}
