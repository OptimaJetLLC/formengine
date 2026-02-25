import {css} from '@emotion/react'
import styled from '@emotion/styled'
import type {IconDefinition} from '@fortawesome/fontawesome-common-types'
import * as faPlay from '@fortawesome/free-solid-svg-icons/faPlay.js'
import type {IFormData} from '@react-form-builder/core'
import {CalculableResult, forwardRef, isUndefined, namedObserver} from '@react-form-builder/core'
import type {editor} from 'monaco-editor'
import type {RefObject} from 'react'
import {useCallback, useEffect, useMemo, useState} from 'react'
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

const messageColor: Partial<Record<TypeAttributes.Status, string>> = {
  error: 'var(--rs-red-500)',
  warning: 'var(--rs-orange-400)',
  success: 'var(--rs-green-500)'
}

const messageColors = (type: TypeAttributes.Status) => css`
  .rs-theme-dark && {
    background-color: initial !important;

    .rs-message-body, .rs-btn-close {
      color: white;
    }

    .rs-message-icon-wrapper .rs-icon {
      color: ${messageColor[type]} !important;
    }
  }
`

const SCompactMessage = styled(Message)<{ type: TypeAttributes.Status }>`
  ${({type}) => messageColors(type)};
  background-color: initial !important;
  flex: 1;

  .rs-message-container {
    padding: 5px;
  }
`

const SMessage = styled(Message)<{ type: TypeAttributes.Status }>`
  ${({type}) => messageColors(type)};
  border-radius: 6px;
  border: 2px solid ${({type}) => messageColor[type]};
`

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

const divStyle = {maxHeight: 80, overflow: 'auto', wordBreak: 'break-word'} as const
const preStyle = {whiteSpace: 'pre-wrap', margin: 0} as const

const TestingResult = ({result, onClose, compact}: { result: CalculableResult, onClose: () => void, compact?: boolean }) => {
  const MessageComponent = compact ? SCompactMessage : SMessage
  const formattedContent = (
    <div style={divStyle}>
        <pre style={preStyle}>
          <ResultMessage result={result}/>
        </pre>
    </div>
  )
  return (
    <MessageComponent type={getType(result)} closable={!compact} onClose={onClose} showIcon>
      {compact ? <ResultMessage result={result}/> : formattedContent}
    </MessageComponent>
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

const buttonStyle = {display: 'flex', gap: 10} as const
const checkboxStyle = {height: 32} as const

const columnsStyleBase = {
  paddingInlineEnd: 10,
  paddingTop: 3,
  alignItems: 'end',
  flex: 1
} as const

const rowsStyle = {width: '100%', flex: 0} as const

const RawTestRunner = forwardRef(({data, testingFunction, compact}: TestRunnerProps, ref) => {
  const t = useTranslationPart('testingEditor')
  const builderStore = useBuilderStore()
  const [result, setResult] = useState<CalculableResult>()

  const test = useCallback(() => {
    const calculated = calculate(data ?? '{}', testingFunction)
    setResult(calculated)
    return calculated
  }, [data, testingFunction])

  useEffect(() => {
    if (ref && typeof ref === 'object') {
      ((ref as RefObject<TestingEditorRef>).current ?? {}).test = test
    }

    if (builderStore.testingAutorun) {
      test()
      return
    }
    setResult(undefined)
  }, [test, builderStore.testingAutorun, ref])

  const handleAutorunChecked: CheckboxProps['onChange'] = useCallback((_: ValueType | undefined, checked: boolean) => {
    return builderStore.testingAutorun = checked
  }, [builderStore])

  const handleCloseResult = useCallback(() => setResult(undefined), [])

  const columnsStyle = useMemo(() => ({
    ...columnsStyleBase,
    justifyContent: compact ? 'end' : 'space-between',
  }), [compact])

  const buttons = <Columns style={columnsStyle}>
    {compact && result && <TestingResult compact result={result} onClose={handleCloseResult}/>}
    <Button onClick={test} size={'sm'} appearance={'ghost'} style={buttonStyle}>
      <FaIcon icon={faPlay as unknown as IconDefinition}/> {t('run')}
    </Button>
    <Checkbox checked={builderStore.testingAutorun} onChange={handleAutorunChecked} style={checkboxStyle}>{t('autorun')}</Checkbox>
  </Columns>

  return compact
    ? buttons
    : <Rows style={rowsStyle}>
      {result && <TestingResult result={result} onClose={handleCloseResult}/>}
      {buttons}
    </Rows>
})

export const TestRunner = namedObserver('TestRunner', RawTestRunner)

const rowsStyle2 = {flex: 1, minHeight: 100, minWidth: 0, alignItems: 'start', position: 'relative'} as const
const spanStyle = {marginTop: -40, paddingBlock: 7, opacity: 0.6} as const
const divStyle2 = {flex: 1, minHeight: 20, width: '100%'} as const

const RawTestingEditor = forwardRef(({testingFunction, initialData}: TestingEditorProps, ref) => {
  const t = useTranslationPart('testingEditor')
  const builderStore = useBuilderStore()
  const [data, setData] = useState(builderStore.testingData ?? init(initialData))
  const [editorInitialData] = useState(data)

  useEffect(() => () => {
    builderStore.testingData = data
  }, [builderStore, data])

  return (
    <Rows style={rowsStyle2}>
      <span style={spanStyle}>{t('testFormData')}</span>
      <div style={divStyle2}>
        <CodeEditor language="json" initialValue={editorInitialData} onChange={setData} options={editorOptions}/>
      </div>
      <TestRunner data={data} testingFunction={testingFunction} ref={ref}/>
    </Rows>
  )
})

export const TestingEditor = namedObserver('TestingEditor', RawTestingEditor)
