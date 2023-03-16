import {useEditor} from '../../utils/useEditor'
import {EditableTable, makeColumns} from '../ui/common/EditableTable'
import LabeledProperty from '../ui/common/LabeledProperty'

const DEFAULT_COLUMNS = [{name: 'value'}, {name: 'label'}]

export const ArrayInput = () => {
  const {value, onChange, annotation} = useEditor()
  const columns = makeColumns(annotation.editorProps?.columns ?? DEFAULT_COLUMNS)

  return <>
    <LabeledProperty annotation={annotation}/>
    <EditableTable data={value} onChange={onChange} columns={columns}/>
  </>
}
