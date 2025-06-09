import {useCallback, useMemo} from 'react'
import type {InputCellProps} from '../components/EditableTable'
import {EditableTable, makeColumns, SCell} from '../components/EditableTable'
import LabeledProperty from '../components/LabeledProperty'
import type {AnnotationEditorProps} from './AnnotationEditorProps'
import {JsonInput} from './JsonInput'

interface JsonCellProps extends InputCellProps {
  editorTitle: string
}

const valueIsObject = (value: string): void => {
  const parsed = JSON.parse(value)
  if (typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('The value must be an object')
  }
}

const JsonCell = ({rowData, dataKey, rowIndex, onChange, editorTitle, ...props}: JsonCellProps) => {
  const value = rowData[dataKey] ?? {}
  const title = useMemo(() => `${editorTitle}[${rowIndex}]`, [editorTitle, rowIndex])

  const handleChange = useCallback((newValue: any) => {
    rowData[dataKey] = newValue
    onChange?.(newValue, dataKey, rowIndex)
  }, [dataKey, onChange, rowData, rowIndex])

  const handleClean = useCallback(() => {
    handleChange(undefined)
  }, [handleChange])

  return (
    <SCell {...props}>
      <JsonInput editorKey={`${dataKey}-${rowIndex}`} editorTitle={title} value={value}
                 onChange={handleChange} onClean={handleClean} onValidate={valueIsObject}/>
    </SCell>
  )
}

const DEFAULT_COLUMNS = [{name: 'item', input: JsonCell}]

/**
 * The property editor for the array of objects property type.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
export const ArrayOfObjectInput = (props: AnnotationEditorProps) => {
  const {value, onChange, annotation} = props

  const editorColumns = useMemo(() => {
    const result = annotation.editorProps?.columns ?? DEFAULT_COLUMNS
    const column = result?.[0]
    if (column && !column.inputProps) {
      column.inputProps = {editorTitle: `${props.componentData.key}.${annotation.name}`}
    }
    return makeColumns(result)
  }, [annotation.editorProps?.columns, annotation.name, props.componentData.key])

  return <>
    <LabeledProperty {...props}/>
    <EditableTable data={value} onChange={onChange} columns={editorColumns}/>
  </>
}
