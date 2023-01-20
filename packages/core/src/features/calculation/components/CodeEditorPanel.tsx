import styled from '@emotion/styled'
import {observer} from 'mobx-react'
import React, {useEffect, useState} from 'react'
import {Button, ButtonGroup, Checkbox, Panel} from 'rsuite'
import {ComponentStore} from '../../../stores/ComponentStore'
import {useBuilderStore} from '../../../utils/contexts/BuilderStoreContext'
import {Annotation} from '../../annotation/utils/annotations/Annotation'
import {CompilationResult, compileFn} from '../propertyCalculator'
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

  return <SPanel bodyFill>
    <Header>{header}</Header>
    <CodeEditor source={sourceCode} setSource={setSourceCode}/>
    <div style={{marginTop: 10}}>
      <ButtonGroup>
        <Button appearance="primary" onClick={compileCode}>Compile</Button>
        <Button appearance="ghost" onClick={saveCode}>Save</Button>
        <Button appearance="ghost" onClick={onClose}>Close</Button>
      </ButtonGroup>
      <Checkbox checked={useFn} onChange={(_, checked) => setUseFn(checked)}>
        Use calculated property
      </Checkbox>
    </div>
    <ErrorMessage result={compilationError}/>
  </SPanel>
}

const CodeEditorPanelWrapper = () => {
  const store = useBuilderStore()
  if (!store.calculatedProperty) return null

  return <_CodeEditorPanel {...store.calculatedProperty} onClose={() => store.calculatedProperty = undefined}/>
}

export const CodeEditorPanel = observer(CodeEditorPanelWrapper)

const Header = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
`

const SPanel = styled(Panel)`
  background-color: #ffffffa1;
  padding: 20px
`
