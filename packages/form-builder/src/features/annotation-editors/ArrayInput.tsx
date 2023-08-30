import {EditableTable, makeColumns} from '../components/EditableTable'
import LabeledProperty from '../components/LabeledProperty'
import type {AnnotationEditorProps} from './AnnotationEditorProps'

const DEFAULT_COLUMNS = [{name: 'value'}, {name: 'label'}]

/**
 * The property editor for the array property type.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
export const ArrayInput = (props: AnnotationEditorProps) => {
  const {value, onChange, annotation} = props
  const columns = makeColumns(annotation.editorProps?.columns ?? DEFAULT_COLUMNS)

  return <>
    <LabeledProperty annotation={annotation}/>
    <EditableTable data={value} onChange={onChange} columns={columns}/>
  </>
}
