import {Input} from 'rsuite'
import {useEditor} from '../../utils/useEditor'
import LabeledProperty from '../ui/common/LabeledProperty'

export const StringInput = () => {
  const {value, onChange, annotation} = useEditor()
  return (
    <LabeledProperty annotation={annotation}>
      <Input name={annotation.key} value={value ?? ''} onChange={onChange} size={'xs'}/>
    </LabeledProperty>
  )
}
