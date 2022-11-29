import {Input} from 'rsuite'
import {LabeledInput} from '../../ui/Containers'
import {PropertyEditorProps} from '../types'

const KeyInput = ({componentStore, annotation}: PropertyEditorProps) => (
  <LabeledInput>
    <label>{annotation.name}</label>
    <Input
      value={componentStore.key}
      onChange={value => componentStore.key = value as string}
      size={'xs'}
    />
  </LabeledInput>
)

export {KeyInput}
