import {isObject} from '@react-form-builder/core'
import {useCallback, useEffect, useMemo} from 'react'
import {JsonCode} from '../../stores/BuilderStore'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import {toPrettyJsonString} from '../../utils/toPrettyJsonString'

/**
 * Opens the bottom-panel JSON editor and keeps its snapshot in sync with `value`.
 * @param editorKey the open-editor identity, usually the property key.
 * @param editorTitle the editor title shown in the bottom panel.
 * @param value the live property value.
 * @param onChange the property setter.
 * @param onValidate optional JSON validation before save.
 * @returns preview text and the callback that opens the editor.
 */
export function useOpenJsonEditor(
  editorKey: string,
  editorTitle: string,
  value: unknown,
  onChange: (value: any) => void,
  onValidate?: (value: string) => void
) {
  const builderStore = useBuilderStore()
  const strVal = useMemo(() => {
    if (isObject(value)) return toPrettyJsonString(value, 2) ?? ''
    return typeof value === 'string' ? value : ''
  }, [value])

  const valuePreview = useMemo(() => {
    return value ? (toPrettyJsonString(value)?.substring(0, 50) ?? 'Error') : ''
  }, [value])

  const editJson = useCallback(() => {
    builderStore.editJsonCode(editorKey, editorTitle, strVal, onChange, onValidate)
  }, [builderStore, editorKey, editorTitle, onChange, onValidate, strVal])

  useEffect(() => {
    const editable = builderStore.currentEditable
    if (!(editable instanceof JsonCode)) return
    if (editable.editorKey !== editorKey || editable.editorTitle !== editorTitle) return
    if (editable.json === strVal) return
    builderStore.editJsonCode(editorKey, editorTitle, strVal, onChange, onValidate)
  }, [builderStore, editorKey, editorTitle, onChange, onValidate, strVal])

  return {valuePreview, editJson}
}
