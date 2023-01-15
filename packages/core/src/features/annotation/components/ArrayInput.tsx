import {LabeledProperty} from '../../ui/Containers'
import {EditableTable, makeColumns} from '../../ui/EditableTable'
import {PropertyEditorProps} from '../types'
import {makeAnnotationProps} from '../utils'

const DEFAULT_COLUMNS = [{name: 'value'}, {name: 'label'}]

export const ArrayInput = ({...props}: PropertyEditorProps) => {
  const {value, onChange} = makeAnnotationProps(props)
  const columns = makeColumns(props.annotation.editorProps?.columns ?? DEFAULT_COLUMNS)

  return <>
    <LabeledProperty annotation={props.annotation} componentStore={props.componentStore}/>
    <EditableTable data={value} onChange={onChange} columns={columns}/>
  </>
}
