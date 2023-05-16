import {useComponentData} from '@react-form-builder/core'
import {Input} from 'rsuite'
import {useEditor} from '../../utils/useEditor'
import LabeledProperty from '../components/LabeledProperty'

const KeyInput = () => {
  const {annotation} = useEditor()
  const data = useComponentData()

  const handleChange = (value: string) => {
    data.store.key = value
  }

  return (
    <LabeledProperty annotation={annotation}>
      <Input
        value={data.store.key}
        onChange={handleChange}
        size={'xs'}
      />
    </LabeledProperty>
  )
}

export {KeyInput}
