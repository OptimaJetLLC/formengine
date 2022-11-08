import {Checkbox, Form} from 'rsuite'
import {PropertyEditorProps} from '../types'

const BooleanInput = ({componentStore, annotation}: PropertyEditorProps) => {
  const checked = componentStore.props[annotation.key] ?? annotation.scheme?.getDefault() ?? false;
  return <div>
    <Form.ControlLabel>{annotation.name}</Form.ControlLabel>
    <Checkbox
      checked={checked}
      onChange={(value, checked) => componentStore.props[annotation.key] = checked}
    />
    {/*//TODO Fix style for hint*/}
    {annotation.hint && <Form.HelpText tooltip>{annotation.hint}</Form.HelpText>}
  </div>
}

export {BooleanInput}
