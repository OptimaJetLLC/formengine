import {Input} from 'rsuite'
import {LabeledProperty} from '../../ui/Containers'
import {useEditor} from '../utils/useEditor'

export const StringInput = () => {
  const {value, onChange, annotation} = useEditor()
  return (
    <LabeledProperty annotation={annotation}>
      <Input name={annotation.key} value={value} onChange={onChange} size={'xs'}/>
    </LabeledProperty>
  )
}
