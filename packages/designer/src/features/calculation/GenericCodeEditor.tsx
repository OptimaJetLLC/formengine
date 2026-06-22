import type {OnMount} from '@monaco-editor/react'
import type {BaseCompilationResult, IFormData} from '@react-form-builder/core'
import {useStore} from '@react-form-builder/core'
import {action} from 'mobx'
import type {ReactNode} from 'react'
import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Button, ButtonGroup} from 'rsuite'
import {CodeEditor} from '../components/CodeEditor/CodeEditor'
import type {CodeEditorLanguage} from '../components/CodeEditor/CodeEditorProps'
import {Columns, Rows} from '../components/Containers'
import type {ValidateBeforeSaveResult} from '../localization/localizationEditorUtils'
import {resolveGenericCodeEditorSave} from '../localization/localizationEditorUtils'
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
   * The React key used to remount the code editor when external context changes.
   */
  editorKey?: string
  /**
   * True when the begin context line can be edited.
   */
  canEditBeginContextLine?: boolean
  /**
   * The callback function called when the Monaco editor is mounted.
   */
  onEditorMount?: OnMount
  /**
   * Resolves the source code value that should be saved.
   * @param fallbackSource the in-memory editor source code.
   * @returns the normalized source code to save.
   */
  getSourceForSave?: (fallbackSource: string) => string
  /**
   * Resolves whether validation should run before saving.
   * @param value the source code value that would be saved.
   * @returns the validation mode for the save action.
   */
  validateBeforeSave?: (value: string) => ValidateBeforeSaveResult
  /**
   * Additional toolbar controls rendered after the default save and close buttons.
   */
  toolbarExtra?: ReactNode
  /**
   * The initial test form data for the testing editor.
   */
  initialTestData?: Record<string, unknown>
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
  const {onCompile, onSave, getSourceForSave, validateBeforeSave} = props
  const propsSourceCode = useMemo(() => props.source ?? codePlaceHolder, [props.source, codePlaceHolder])
  const [sourceCode, setSourceCode] = useState(propsSourceCode)
  const [initialValue, setInitialValue] = useState(propsSourceCode)
  const testingEditor = useRef<TestingEditorRef>({})
  const {formData} = useStore()
  const showTestingEditor = !props.compact
  const testFormData = props.initialTestData ?? formData.data

  const resolveSourceForSave = useCallback((fallbackSource: string) => {
    return getSourceForSave?.(fallbackSource) ?? fallbackSource
  }, [getSourceForSave])

  const handleSave = useCallback(() => {
    const valueToSave = resolveSourceForSave(sourceCode)
    const testResult = validateBeforeSave?.(valueToSave) === 'skip-test'
      ? undefined
      : testingEditor.current.test?.()
    if (resolveGenericCodeEditorSave(valueToSave, {validateBeforeSave, testResult}) === 'abort') return

    action(() => onSave(valueToSave))()
    setInitialValue(valueToSave)
    setSourceCode(valueToSave)
  }, [onSave, resolveSourceForSave, sourceCode, validateBeforeSave])

  useEffect(() => {
    setInitialValue(propsSourceCode)
    setSourceCode(propsSourceCode)
  }, [propsSourceCode])

  const testingFunction = useCallback(
    (formData: IFormData) => onCompile(resolveSourceForSave(sourceCode), formData),
    [onCompile, resolveSourceForSave, sourceCode],
  )

  const handleClose = useCallback(() => props.onClose(), [props])

  return (
    <Columns className={styles.columns}>
      <Rows className={styles.rows}>
        <CodeEditor key={props.editorKey}
                    beginContextLine={props.beginContextLine}
                    endContextLine={props.endContextLine}
                    canEditBeginContextLine={props.canEditBeginContextLine}
                    initialValue={initialValue}
                    language={props.language}
                    onMount={props.onEditorMount}
                    onChange={setSourceCode}/>
        <div className={styles.toolbar}>
          <ButtonGroup size={'sm'}>
            <Button appearance="primary" onClick={handleSave} data-testid={'save-code-action-button'}>{t('common.save')}</Button>
            <Button appearance="ghost" onClick={handleClose}>{t('common.close')}</Button>
          </ButtonGroup>
          <div className={styles.extra}>
            {props.toolbarExtra}
          </div>
          {props.compact && <TestRunner testingFunction={testingFunction} ref={testingEditor} compact/>}
        </div>
      </Rows>
      {showTestingEditor &&
        <TestingEditor initialData={testFormData} testingFunction={testingFunction} ref={testingEditor}/>
      }
    </Columns>
  )
}
