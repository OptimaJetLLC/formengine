import styled from '@emotion/styled'
import {Annotation, CompilationResult, compileFn, ComponentStore, useBuilderStore, useTranslationPart} from 'fb-core'
import {observer} from 'mobx-react'
import {useEffect, useState} from 'react'
import {Button, ButtonGroup, Checkbox} from 'rsuite'
import {CodeEditor} from './CodeEditor'

const codePlaceHolder = '// enter your code here'

interface JsSyntaxError extends Error {
  lineNumber: number
  columnNumber: number
}

const isJsSyntaxError = (error: Error): error is JsSyntaxError => {
  const e: any = error
  return typeof e.lineNumber === 'number' && typeof e.columnNumber === 'number'
}

const ErrorMessage = ({result}: { result?: CompilationResult }) => {
  if (!result) return null

  const {error, exception} = result

  let message = 'OK'
  if (error && exception) {
    message = exception.message
    if (isJsSyntaxError(exception)) {
      // omit the first two lines of the function declaration
      const lineNumber = exception.lineNumber >= 3 ? exception.lineNumber - 2 : exception.lineNumber
      message = `${exception.message} (${lineNumber}:${exception.columnNumber})`
    }
  }

  const color = error ? 'red' : 'green'

  return <span>Compilation result: <code style={{color: color}}>{message}</code></span>
}

interface CodeEditorPanelProps {
  componentStore: ComponentStore
  annotation: Annotation
  onClose: () => void
}

const _CodeEditorPanel = ({componentStore, annotation, onClose}: CodeEditorPanelProps) => {
  const property = componentStore.props[annotation.key]
  const [sourceCode, setSourceCode] = useState(property?.fnSource || codePlaceHolder)
  const [compilationError, setCompilationError] = useState<CompilationResult | undefined>()
  const [useFn, setUseFn] = useState(property?.useFn || false)

  const compileCode = () => {
    const result = compileFn(sourceCode)
    setCompilationError(result)
  }

  const saveCode = () => {
    componentStore.props[annotation.key] ??= {}
    const componentProperty = componentStore.props[annotation.key]
    componentProperty.useFn = useFn
    componentProperty.fnSource = sourceCode
  }

  useEffect(() => {
    setSourceCode(property?.fnSource || codePlaceHolder)
    setUseFn(property?.useFn || false)
  }, [property])

  const header = <p>Calculated property for &lt;
    <code>{componentStore.key}.{annotation.name}</code> &gt;
    (must return {annotation.schema?.type})</p>

  return <>
    <Header>{header}</Header>
    <CodeEditor source={sourceCode} setSource={setSourceCode}/>
    <SDiv>
      <ButtonGroup>
        <Button appearance="primary" onClick={compileCode}>Compile</Button>
        <Button appearance="ghost" onClick={saveCode}>Save</Button>
        <Button appearance="ghost" onClick={onClose}>Close</Button>
      </ButtonGroup>
      <Checkbox checked={useFn} onChange={(_, checked) => setUseFn(checked)}>
        Use calculated property
      </Checkbox>
    </SDiv>
    <ErrorMessage result={compilationError}/>
  </>
}

const CodeEditorPanelWrapper = () => {
  const store = useBuilderStore()
  const t = useTranslationPart('codeEditor')
  return store.calculatedProperty?.componentStore.key
      ? <_CodeEditorPanel {...store.calculatedProperty} onClose={() => store.calculatedProperty = undefined}/>
      : <Placeholder>{t('placeholder')}</Placeholder>
}

export const CodeEditorPanel = observer(CodeEditorPanelWrapper)

const SDiv = styled.div`
  padding: 10px;
`

const Placeholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 16px;
`

const Header = styled.div`
  padding: 10px;
  font-size: 16px;
`
