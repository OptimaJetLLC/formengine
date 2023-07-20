import {Input} from 'rsuite'
import {useEditor} from '../../utils/useEditor'
import LabeledProperty from '../components/LabeledProperty'

/**
 * The property editor for the key property type.
 * @returns the React element.
 */
const KeyInput = () => {
  const {value, onChange, annotation} = useEditor()

  return (
    <LabeledProperty annotation={annotation}>
      <Input
        value={value}
        onChange={onChange}
        size={'xs'}
      />
    </LabeledProperty>
  )
}

export {KeyInput}
