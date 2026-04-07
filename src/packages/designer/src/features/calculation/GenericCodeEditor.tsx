import type {BaseCompilationResult, IFormData} from '@react-form-builder/core'
import {useStore} from '@react-form-builder/core'
import {action} from 'mobx'
import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Button, ButtonGroup} from 'rsuite'
import {CodeEditor} from '../components/CodeEditor/CodeEditor'
import type {CodeEditorLanguage} from '../components/CodeEditor/CodeEditorProps'
import {Columns, Rows} from '../components/Containers'
import type {TestingEditorRef} from '../ui/BottomPanel/TestingEditor'
import {TestingEditor, TestRunner} from '../ui/BottomPanel/TestingEditor'
import styles from './GenericCodeEditor.module.css'

/**
 * Properties of the React component {@link GenericCodeEditor}.
 */
export interface GenericCodeEditorProps {
  /**
   * Context line before the source code.
   */
  beginContextLine?: string
  /**
   * Context line after the source code.
   */
  endContextLine?: string
  /**
   * Language mode.
   */
  language?: CodeEditorLanguage;
  /**
   * The source code.
   */
  source?: string
  /**
   * The callback function called when the source code is saved.
   * @param the source code.
   */
  onSave: (value: string) => void
  /**
   * The callback function called when the editor is closed.
   */
  onClose: () => void
  /**
   * The callback function called at compile time.
   * @param sourceCode the source code.
   * @param formData the test form data.
   * @returns the compilation result.
   */
  onCompile: (sourceCode: string, formData: IFormData) => BaseCompilationResult
  /**
   * The compact style without test data.
   */
  compact?: boolean
}

/**
 * Generic code editor.
 * @param props the React component properties
 * @returns the React element.
 */
export const GenericCodeEditor = (props: GenericCodeEditorProps) => {
  const {t} = useTranslation()
  const codePlaceHolder = t('codeEditor.codePlaceholder')
  const {onCompile, onSave} = props
  const propsSourceCode = useMemo(() => props.source ?? codePlaceHolder, [props.source, codePlaceHolder])
  const [sourceCode, setSourceCode] = useState(propsSourceCode)
  const [initialValue, setInitialValue] = useState(propsSourceCode)
  const testingEditor = useRef<TestingEditorRef>({})
  const {formData} = useStore()

  const handleSave = useCallback(() => {
    const result = testingEditor.current.test?.()
    if (result?.error) return
    action(() => onSave(sourceCode))()
    setInitialValue(sourceCode)
  }, [onSave, sourceCode])

  useEffect(() => {
    setInitialValue(propsSourceCode)
    setSourceCode(propsSourceCode)
  }, [propsSourceCode])

  const testingFunction = useCallback((formData: IFormData) => onCompile(sourceCode, formData), [sourceCode, onCompile])

  const handleClose = useCallback(() => props.onClose(), [props])

  return (
    <Columns className={styles.columns}>
      <Rows className={styles.rows}>
        <CodeEditor beginContextLine={props.beginContextLine} endContextLine={props.endContextLine}
                    initialValue={initialValue} language={props.language} onChange={setSourceCode}/>
        <div className={styles.toolbar}>
          <ButtonGroup size={'sm'}>
            <Button appearance="primary" onClick={handleSave} data-testid={'save-code-action-button'}>{t('common.save')}</Button>
            <Button appearance="ghost" onClick={handleClose}>{t('common.close')}</Button>
          </ButtonGroup>
          {props.compact && <TestRunner testingFunction={testingFunction} ref={testingEditor} compact/>}
        </div>
      </Rows>
      {!props.compact && <TestingEditor initialData={formData.data} testingFunction={testingFunction} ref={testingEditor}/>}
    </Columns>
  )
}
