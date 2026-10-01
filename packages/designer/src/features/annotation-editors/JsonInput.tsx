import {Close, Code} from '@rsuite/icons'
import {Input, InputGroup} from 'rsuite'
import {useOpenJsonEditor} from './useOpenJsonEditor'

/**
 * The JSON editor properties.
 */
interface JsonInputProps {
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
  const {valuePreview, editJson} = useOpenJsonEditor(editorKey, editorTitle, value, onChange, onValidate)

  return (
    <InputGroup inside size="xs">
      <Input value={valuePreview} onClick={editJson} readOnly color={'var(--rs-btn-ghost-text)'} />
      <InputGroup.Button onClick={value ? onClean : editJson}>{value ? <Close /> : <Code />}</InputGroup.Button>
    </InputGroup>
  )
}
