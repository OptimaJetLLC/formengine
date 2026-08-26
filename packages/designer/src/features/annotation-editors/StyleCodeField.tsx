import {namedObserver, useComponentData} from '@react-form-builder/core'
import type {editor} from 'monaco-editor'
import {useCallback} from 'react'
import type {Device} from '../../utils/types'
import {CodeEditor} from '../components/CodeEditor/CodeEditor'
import {CleanButton} from './CleanButton'
import styles from './StyleCodeEditor.module.css'
import type {StyleStorePart} from './utils/writeStylePartString'
import {writeStylePartString} from './utils/writeStylePartString'

/**
 * Properties of the {@link StyleCodeField} component.
 */
interface StyleCodeFieldProps {
  /**
   * The store part edited by this field.
   */
  part: StyleStorePart
  /**
   * Display resolution type.
   */
  device: Device
  /**
   * Context line rendered before the editable CSS body.
   */
  beginContextLine: string
  /**
   * Test identifier of the reset button.
   */
  cleanButtonTestId: string
}

const options: editor.IStandaloneEditorConstructionOptions = {
  contextmenu: false,
  lineNumbers: 'off',
  minimap: {enabled: false},
  glyphMargin: false,
  folding: false,
  lineDecorationsWidth: 0,
  lineNumbersMinChars: 0,
  autoIndent: 'full'
}

const RawStyleCodeField = ({part, device, beginContextLine, cleanButtonTestId}: StyleCodeFieldProps) => {
  const {store} = useComponentData()
  const initialValue = store[part]?.[device]?.string ?? ''

  const onChange = useCallback((value: string) => {
    writeStylePartString(store, part, device, value)
  }, [store, part, device])

  const handleClean = useCallback(() => {
    writeStylePartString(store, part, device)
  }, [part, device, store])

  return (
    <div className={styles.editorContainer}>
      <CodeEditor
        key={`${store.key}${part}${device}`}
        language="css"
        className={styles.editorWrapper}
        beginContextLine={beginContextLine}
        endContextLine="}"
        initialValue={initialValue}
        onChange={onChange}
        height={'20vh'}
        options={options}
      />
      <CleanButton onClick={handleClean} className={styles.cleanButton} data-testid={cleanButtonTestId}/>
    </div>
  )
}

export const StyleCodeField = namedObserver('StyleCodeField', RawStyleCodeField)
