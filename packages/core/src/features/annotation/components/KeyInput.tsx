import {Input} from 'rsuite'
import {LabeledProperty} from '../../ui/Containers'
import {PropertyEditorProps} from '../types'

const KeyInput = ({componentStore, annotation}: PropertyEditorProps) => (
  <LabeledProperty componentStore={componentStore} annotation={annotation}>
    <Input
      value={componentStore.key}
      onChange={value => componentStore.key = value as string}
      size={'xs'}
    />
  </LabeledProperty>
)

export {KeyInput}
