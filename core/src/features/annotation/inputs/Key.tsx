import {Input} from 'rsuite'
import {LabeledInput} from '../../ui/Containers'
import {PropertyEditorProps} from '../types'

const KeyInput = ({componentStore, annotation}: PropertyEditorProps<string>) => (
  <LabeledInput>
    <label>{annotation.title}</label>
    <Input
      value={componentStore.key}
      onChange={value => componentStore.key = value as string}
    />
  </LabeledInput>
)

export {KeyInput}
