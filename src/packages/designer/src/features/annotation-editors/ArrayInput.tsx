import {namedObserver, useStore} from '@react-form-builder/core'
import {useCallback, useMemo} from 'react'
import {EditableTable} from '../components/EditableTable/EditableTable'
import {makeColumns} from '../components/EditableTable/utils'
import LabeledProperty from '../components/LabeledProperty'
import type {AnnotationEditorProps} from './AnnotationEditorProps'

const DEFAULT_COLUMNS = [{name: 'value'}, {name: 'label'}]

/**
 * The property editor for the array property type.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
const RawArrayInput = (props: AnnotationEditorProps) => {
  const {value, onChange, annotation, componentData} = props
  const {onAdd, onRemove, columns, calculateEditorProps} = annotation.editorProps ?? {}
  const viewerStore = useStore()
  const preparedColumns = useMemo(() => makeColumns(columns ?? DEFAULT_COLUMNS), [columns])

  const handleAdd = useCallback((index: number) => {
    onAdd?.(index, componentData, viewerStore)
  }, [viewerStore, componentData, onAdd])

  const handleRemove = useCallback((index: number) => {
    onRemove?.(index, componentData, viewerStore)
  }, [viewerStore, componentData, onRemove])

  const calculatedProps = calculateEditorProps?.(componentData, onChange) ?? {}

  return <>
    <LabeledProperty {...props}/>
    <EditableTable data={value} onChange={onChange} columns={preparedColumns}
                   onRemove={handleRemove} onAdd={handleAdd} {...calculatedProps}
    />
  </>
}

export const ArrayInput = namedObserver('ArrayInput', RawArrayInput)
