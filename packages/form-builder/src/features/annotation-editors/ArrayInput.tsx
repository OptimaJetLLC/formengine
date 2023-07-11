import {useEditor} from '../../utils/useEditor'
import {EditableTable, makeColumns} from '../components/EditableTable'
import LabeledProperty from '../components/LabeledProperty'

const DEFAULT_COLUMNS = [{name: 'value'}, {name: 'label'}]

/**
 * The property editor for the array property type.
 * @returns the React element.
 */
export const ArrayInput = () => {
  const {value, onChange, annotation} = useEditor()
  const columns = makeColumns(annotation.editorProps?.columns ?? DEFAULT_COLUMNS)

  return <>
    <LabeledProperty annotation={annotation}/>
    <EditableTable data={value} onChange={onChange} columns={columns}/>
  </>
}
