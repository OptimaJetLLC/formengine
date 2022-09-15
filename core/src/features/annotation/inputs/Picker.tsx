import {Form, InputPicker} from 'rsuite'
import {PropertyEditorProps} from '../types'

export interface PickerValue {
  label: string;
  value: string;
}

//TODO this uncompleted
export const WithPicker = (pickerValues: PickerValue[]) => {
  return <T extends unknown>({componentStore, annotation}: PropertyEditorProps<T>) => {
    return (
      <div>
        <Form.ControlLabel>{annotation.title}</Form.ControlLabel>
        <InputPicker
          block
          value={componentStore.props[annotation.key]}
          onChange={value => componentStore.props[annotation.key] = value as T}
          data={pickerValues}
        />
      </div>
    )
  }
}
