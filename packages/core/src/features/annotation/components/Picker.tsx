import {PropertyEditorProps} from '../types'
import {Form, InputPicker} from 'rsuite'
import {isProperty} from '../utils'

export const Piker = ({componentStore, annotation}: PropertyEditorProps) => {
  return (
    <div>
      <Form.ControlLabel>{annotation.name}</Form.ControlLabel>
      <InputPicker
        block
        value={componentStore.props[annotation.key]}
        defaultValue={annotation.scheme?.getDefault()}
        onChange={value => componentStore.props[annotation.key] = value}
        data={isProperty(annotation) ? annotation.data : []}
      />
    </div>
  )
}
