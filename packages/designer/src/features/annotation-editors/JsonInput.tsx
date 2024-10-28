import {Close, Code} from '@rsuite/icons'
import {isObject} from 'lodash-es'
import {useCallback, useMemo} from 'react'
import {Input, InputGroup} from 'rsuite'
import {useBuilderStore} from '../../utils/BuilderStoreContext'

const stringify = (value: any, space?: number) => {
  try {
    return JSON.stringify(value, null, space)
  } catch (e) {
    return
  }
}

/**
 * The JSON editor properties.
 */
export interface JsonInputProps {
  /**
   * The editor value.
   */
  value: any
  /**
   * The editor onChange handler.
   * @param value the changed value.
   */
  onChange: (value: any) => void
  /**
   * The editor onClean handler.
   */
  onClean: () => void
  /**
   * The editor onValidate handler.
   */
  onValidate?: (value: string) => void
  /**
   * The editor's React key.
   */
  editorKey: string
  /**
   * The editor title.
   */
  editorTitle: string
}

/**
 * Plain JSON object editor.
 * @param props the component properties.
 * @returns the React element.
 */
export const JsonInput = (props: JsonInputProps) => {
  const {value, onChange, onClean, onValidate, editorKey, editorTitle} = props
  const builderStore = useBuilderStore()

  const strVal = useMemo(() => {
    return (isObject(value) ? stringify(value, 2) : value) ?? ''
  }, [value])

  const valuePreview = useMemo(() => {
    return value ? stringify(value)?.substring(0, 50) ?? 'Error' : ''
  }, [value])

  const editJson = useCallback(() => {
    builderStore.editJsonCode(editorKey, editorTitle, strVal, onChange, onValidate)
  }, [builderStore, editorKey, editorTitle, onChange, strVal, onValidate])

  return <InputGroup inside size="xs">
    <Input value={valuePreview} onClick={editJson} readOnly color={'var(--rs-btn-ghost-text)'}/>
    <InputGroup.Button onClick={value ? onClean : editJson}>
      {value ? <Close/> : <Code/>}
    </InputGroup.Button>
  </InputGroup>
}
