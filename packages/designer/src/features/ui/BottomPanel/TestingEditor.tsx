import {css} from '@emotion/react'
import styled from '@emotion/styled'
import type {IconDefinition} from '@fortawesome/fontawesome-common-types'
import * as faPlay from '@fortawesome/free-solid-svg-icons/faPlay.js'
import type {ComponentData, IFormData} from '@react-form-builder/core'
import {CalculableResult, initFormFields, namedObserver, useStore} from '@react-form-builder/core'
import {isUndefined} from 'lodash-es'
import type {editor} from 'monaco-editor'
import type {RefObject} from 'react'
import {forwardRef, useCallback, useEffect, useState} from 'react'
import {Button, Checkbox, Message} from 'rsuite'
import type {CheckboxProps} from 'rsuite/esm/Checkbox/Checkbox'
import type {TypeAttributes} from 'rsuite/esm/internals/types'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {prepareForJson} from '../../../utils/parseJson'
import {CodeEditor} from '../../components/CodeEditor/CodeEditor'
import {Columns, Rows} from '../../components/Containers'
import {FaIcon} from '../../components/Icons'
import {useTranslationPart} from '../../localization/hooks'

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
type TestingEditorProps = { testingFunction: TestingFunction }
type TestRunnerProps = { data?: string, testingFunction: TestingFunction, compact?: boolean }

const RawTestingEditor = forwardRef(({testingFunction}: TestingEditorProps, ref) => {
  const t = useTranslationPart('testingEditor')
  const builderStore = useBuilderStore()
  const {formData} = useStore()
  const [data, setData] = useState(builderStore.testingData ?? init(formData))
  const [initialData] = useState(data)

  useEffect(() => () => {
    builderStore.testingData = data
  }, [builderStore, data])

  return (
    <Rows style={{flex: 1, minHeight: 100, minWidth: 0, alignItems: 'start', position: 'relative'}}>
      <span style={{marginTop: -40, paddingBlock: 7, opacity: 0.6}}>{t('testFormData')}</span>
      <div style={{flex: 1, minHeight: 20, width: '100%'}}>
        <CodeEditor language="json" initialValue={initialData} onChange={setData} options={editorOptions}/>
      </div>
      <TestRunner data={data} testingFunction={testingFunction} ref={ref}/>
    </Rows>
  )
})

export const TestingEditor = namedObserver('TestingEditor', RawTestingEditor)

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

  const handleAutorunChecked: CheckboxProps['onChange'] = (_, val) => builderStore.testingAutorun = val

  const buttons = <Columns
    style={{justifyContent: compact ? 'end' : 'space-between', paddingInlineEnd: 10, paddingTop: 3, alignItems: 'end', flex: 1}}>
    {compact && result && <TestingResult compact result={result} onClose={() => setResult(undefined)}/>}
    <Button onClick={test} size={'sm'} appearance={'ghost'} style={{display: 'flex', gap: 10}}>
      <FaIcon icon={faPlay as unknown as IconDefinition}/> {t('run')}
    </Button>
    <Checkbox checked={builderStore.testingAutorun} onChange={handleAutorunChecked} style={{height: 32}}>{t('autorun')}</Checkbox>
  </Columns>

  return compact
    ? buttons
    : <Rows style={{width: '100%', flex: 0}}>
      {result && <TestingResult result={result} onClose={() => setResult(undefined)}/>}
      {buttons}
    </Rows>
})

export const TestRunner = namedObserver('TestRunner', RawTestRunner)

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

const TestingResult = ({result, onClose, compact}: { result: CalculableResult, onClose: () => void, compact?: boolean }) => {
  const MessageComponent = compact ? SCompactMessage : SMessage
  const formattedContent = (
    <div style={{maxHeight: 80, overflow: 'auto', wordBreak: 'break-word'}}>
        <pre style={{whiteSpace: 'pre-wrap', margin: 0}}>
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

const ResultMessage = ({result}: { result: CalculableResult }) => {
  const t = useTranslationPart('testingEditor')
  return <div>
    {!isUndefined(result.result)
      ? stringify(result?.result)
      : result.exceptions?.map(e => e.message) ?? t('hasNotReturnedValue')
    }
  </div>
}

function calculate(data: string, testingFunction: TestingFunction) {
  try {
    const {data: parsedData, errors} = JSON.parse(data)
    return testingFunction(new TestFormData(parsedData, errors))
  } catch (e: any) {
    return CalculableResult.error([e])
  }
}

const init = (data: ComponentData) => {
  return stringify({data: initFormFields(data), errors: {}})
}

const stringify = (data: any) => {
  if (typeof data === 'string') return data
  return JSON.stringify(prepareForJson(data, {previewNativeObjects: true}), null, 2)
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

/**
 * The class for accessing the test form data.
 */
export class TestFormData implements IFormData {
  index = undefined
  state = {}
  hasErrors = false
  isValidating = false
  parentData: Record<string, unknown> = {}
  rootData: Record<string, unknown> = {}

  /**
   * Constructor
   * @param data the test form data.
   * @param errors the test form errors.
   */
  constructor(public data = {}, public errors = {}) {
  }

  /** @inheritDoc */
  clear() {
    this.data = {}
  }

  /** @inheritDoc */
  validate() {
    return Promise.resolve()
  }

  /** @inheritDoc */
  reset() {
  }

  /** @inheritDoc */
  setAllErrors() {
  }

  /** @inheritDoc */
  getValidationResult() {
    return Promise.resolve(undefined)
  }

  /** @inheritDoc */
  get fluentData() {
    return this.data
  }
}
