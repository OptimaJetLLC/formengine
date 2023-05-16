import styled from '@emotion/styled'
import {CompilationResult, compileFn, namedObserver} from '@react-form-builder/core'
import {action} from 'mobx'
import {useEffect, useState} from 'react'
import {Button, ButtonGroup, Checkbox} from 'rsuite'
import {EditableProperty} from '../../stores/BuilderStore'
import {CodeEditor} from '../components/CodeEditor'

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
  editableProperty: EditableProperty
  onClose: () => void
}

export const CodeEditorPanel = namedObserver('CodeEditorPanel', ({editableProperty, onClose}: CodeEditorPanelProps) => {
  const [sourceCode, setSourceCode] = useState(editableProperty.property?.fnSource || codePlaceHolder)
  const [compilationError, setCompilationError] = useState<CompilationResult | undefined>()
  const [useFn, setUseFn] = useState(editableProperty.property?.useFn || false)

  const compileCode = () => {
    const result = compileFn(sourceCode)
    setCompilationError(result)
  }

  const saveCode = () => editableProperty.saveProperty({useFn: useFn, fnSource: sourceCode})

  useEffect(() => {
    setSourceCode(editableProperty.property?.fnSource || codePlaceHolder)
    setUseFn(editableProperty.property?.useFn || false)
  }, [editableProperty])

  const functionHeader = `/**
* @param {Form} form
* @return {${editableProperty.annotation.schema?.type}}
*/
function Calculation (form) {`

  return <>
    <CodeEditor key={editableProperty.annotation.key} contextLine={functionHeader} value={sourceCode} onChange={setSourceCode}/>
    <SDiv>
      <ButtonGroup>
        <Button appearance="primary" onClick={compileCode}>Compile</Button>
        <Button appearance="ghost" onClick={action(() => saveCode())}>Save</Button>
        <Button appearance="ghost" onClick={onClose}>Close</Button>
      </ButtonGroup>
      <Checkbox checked={useFn} onChange={(_, checked) => setUseFn(checked)}>
        Use calculated property
      </Checkbox>
    </SDiv>
    <ErrorMessage result={compilationError}/>
  </>
})

const SDiv = styled.div`
  padding: 10px;
`
