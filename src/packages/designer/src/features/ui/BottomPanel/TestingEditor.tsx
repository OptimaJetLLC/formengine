import type {IconDefinition} from '@fortawesome/fontawesome-common-types'
import * as faPlay from '@fortawesome/free-solid-svg-icons/faPlay.js'
import type {IFormData} from '@react-form-builder/core'
import {CalculableResult, forwardRef, isUndefined, namedObserver} from '@react-form-builder/core'
import cx from 'clsx'
import type {editor} from 'monaco-editor'
import type {RefObject} from 'react'
import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {Button, Checkbox, Message} from 'rsuite'
import type {CheckboxProps, ValueType} from 'rsuite/esm/Checkbox/Checkbox'
import type {TypeAttributes} from 'rsuite/esm/internals/types'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {prepareForJson} from '../../../utils/parseJson'
import {CodeEditor} from '../../components/CodeEditor/CodeEditor'
import {Columns, Rows} from '../../components/Containers'
import {FaIcon} from '../../components/Icons'
import {useTranslationPart} from '../../localization/hooks'
import {TestFormData} from './TestFormData'
import styles from './TestingEditor.module.css'

const messageClass: Partial<Record<TypeAttributes.Status, string>> = {
  error: styles.error,
  warning: styles.warning,
  success: styles.success,
}

const getType = (result: CalculableResult): TypeAttributes.Status => {
  if (!isUndefined(result.result) && !result.warning) {
    return 'success'
  }

  if (result.warning) {
    return 'warning'
  }

  if (result.error || result.exceptions) {
    return 'error'
  }

  return 'warning'
}

const stringify = (data: any) => {
  if (typeof data === 'string') return data
  return JSON.stringify(prepareForJson(data, {previewNativeObjects: true}), null, 2)
}

const init = (data: Record<string, any>) => {
  return stringify({data, errors: {}})
}

const ResultMessage = ({result}: { result: CalculableResult }) => {
  const t = useTranslationPart('testingEditor')

  return <div data-testid={'test-result'}>
    {!isUndefined(result.result)
      ? stringify(result?.result)
      : result.exceptions?.map(e => e.message) ?? t('hasNotReturnedValue')
    }
  </div>
}

const TestingResult = ({result, onClose, compact}: { result: CalculableResult, onClose: () => void, compact?: boolean }) => {
  const type = getType(result)

  const formattedContent = (
    <div className={styles.resultContent}>
      <pre className={styles.resultPre}>
        <ResultMessage result={result}/>
      </pre>
    </div>
  )
  return (
    <Message
      className={cx(messageClass[type], styles.message, compact ? styles.messageCompact : styles.messageBordered)}
      type={type}
      closable={!compact}
      onClose={onClose}
      showIcon
    >
      {compact ? <ResultMessage result={result}/> : formattedContent}
    </Message>
  )
}

function calculate(data: string, testingFunction: TestingFunction) {
  try {
    const {data: parsedData, errors} = JSON.parse(data)
    return testingFunction(new TestFormData(parsedData, errors))
  } catch (e: any) {
    return CalculableResult.error([e])
  }
}

const editorOptions: editor.IStandaloneEditorConstructionOptions = {
  contextmenu: false,
  lineNumbers: 'off',
  minimap: {enabled: false},
  glyphMargin: false,
  folding: false,
  lineDecorationsWidth: 0,
  lineNumbersMinChars: 0,
  autoIndent: 'full'
}

/**
 * The TestingEditor instance
 */
export type TestingEditorRef = {
  /**
   * The testing function.
   * @returns the {@link CalculableResult}.
   */
  test?: () => CalculableResult
}
type TestingFunction = (data: IFormData) => CalculableResult
type TestingEditorProps = { testingFunction: TestingFunction, initialData: Record<string, any> }
type TestRunnerProps = { data?: string, testingFunction: TestingFunction, compact?: boolean }

const RawTestRunner = forwardRef(({data, testingFunction, compact}: TestRunnerProps, ref) => {
  const t = useTranslationPart('testingEditor')
  const builderStore = useBuilderStore()
  const [result, setResult] = useState<CalculableResult>()
  const lastRunRef = useRef<{ data: string, fn: TestingFunction } | null>(null)
  const columnsClassName = cx(styles.columnsStyle, compact ? styles.compact : undefined)

  const test = useCallback(() => {
    const dataKey = data ?? '{}'
    const calculated = calculate(dataKey, testingFunction)
    setResult(calculated)
    lastRunRef.current = {data: dataKey, fn: testingFunction}
    return calculated
  }, [data, testingFunction])

  const displayResult = useMemo(() => {
    if (builderStore.testingAutorun) return result
    const last = lastRunRef.current
    const dataKey = data ?? '{}'
    if (last && last.data === dataKey && last.fn === testingFunction) return result
    return undefined
  }, [builderStore.testingAutorun, result, data, testingFunction])

  const handleAutorunChecked: CheckboxProps['onChange'] = useCallback((_: ValueType | undefined, checked: boolean) => {
    if (!checked) {
      lastRunRef.current = null
      setResult(undefined)
    }
    // eslint-disable-next-line react-hooks/immutability
    builderStore.testingAutorun = checked
  }, [builderStore])

  const handleCloseResult = useCallback(() => {
    lastRunRef.current = null
    setResult(undefined)
  }, [])

  const buttons = <Columns className={columnsClassName}>
    {compact && displayResult && <TestingResult compact result={displayResult} onClose={handleCloseResult}/>}
    <Button onClick={test} size={'sm'} appearance={'ghost'} className={styles.buttons}>
      <FaIcon icon={faPlay as unknown as IconDefinition}/> {t('run')}
    </Button>
    <Checkbox
      checked={builderStore.testingAutorun}
      onChange={handleAutorunChecked}
      className={styles.checkbox}
    >
      {t('autorun')}
    </Checkbox>
  </Columns>

  useEffect(() => {
    if (ref && typeof ref === 'object') {
      ((ref as RefObject<TestingEditorRef>).current ?? {}).test = test
    }

    if (builderStore.testingAutorun) {
      test()
    }
  }, [test, builderStore.testingAutorun, ref])

  return compact
    ? buttons
    : (
      <Rows className={styles.borderedRows}>
        {displayResult && <TestingResult result={displayResult} onClose={handleCloseResult}/>}
        {buttons}
      </Rows>
    )
})

export const TestRunner = namedObserver('TestRunner', RawTestRunner)

const RawTestingEditor = forwardRef(({testingFunction, initialData}: TestingEditorProps, ref) => {
  const t = useTranslationPart('testingEditor')
  const builderStore = useBuilderStore()
  const [data, setData] = useState(builderStore.testingData ?? init(initialData))
  const [editorInitialData] = useState(data)

  useEffect(() => () => {
    builderStore.testingData = data
  }, [builderStore, data])

  return (
    <Rows className={styles.rows}>
      <span className={styles.formData}>{t('testFormData')}</span>
      <div className={styles.editorWrapper}>
        <CodeEditor language="json" initialValue={editorInitialData} onChange={setData} options={editorOptions}/>
      </div>
      <TestRunner data={data} testingFunction={testingFunction} ref={ref}/>
    </Rows>
  )
})

export const TestingEditor = namedObserver('TestingEditor', RawTestingEditor)
