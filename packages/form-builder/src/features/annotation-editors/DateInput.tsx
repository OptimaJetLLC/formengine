import {DatePicker} from 'rsuite'
import {useEditor} from '../../utils/useEditor'
import LabeledProperty from '../components/LabeledProperty'

/**
 * The property editor for the date property type.
 * @returns the React element.
 */
export const DateInput = () => {
  const {onChange, onRemove, value, annotation} = useEditor()

  return <LabeledProperty annotation={annotation}>
    <DatePicker editable={false} cleanable={true} placement={'auto'}
                value={value} onChange={onChange} onClean={onRemove}/>
  </LabeledProperty>
}
