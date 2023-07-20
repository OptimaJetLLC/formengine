import styled from '@emotion/styled'
import {BaseCompilationResult, CompilationResult, compileFn, namedObserver} from '@react-form-builder/core'
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

/**
 * React component to display compilation error messages.
 * @param props props the React component properties.
 * @param props.result any compilation result
 * @returns the React element.
 */
export const ErrorMessage = ({result}: { result?: BaseCompilationResult }) => {
  if (!result) return null

  const {error, exceptions} = result

  const messages: string[] = []
  if (error && exceptions) {
    exceptions.forEach(exception => {
      let message = exception.message
      if (isJsSyntaxError(exception)) {
        const lineNumber = exception.lineNumber >= 3 ? exception.lineNumber - 2 : exception.lineNumber
        message = `${message} (${lineNumber}:${exception.columnNumber})`
      }
      messages.push(message)
    })
  } else {
    messages.push('OK')
  }

  const color = error ? 'red' : 'green'

  return <span>Compilation result: <code style={{color: color}}>{messages.join('/n')}</code></span>
}

/**
 * Properties of the React component {@link CodeEditorPanel}.
 */
export interface CodeEditorPanelProps {
  editableProperty: EditableProperty
  onClose: () => void
  onSave: () => void
}

export const CodeEditorPanel = namedObserver('CodeEditorPanel', ({editableProperty, onClose, onSave}: CodeEditorPanelProps) => {
  const [sourceCode, setSourceCode] = useState(editableProperty.property?.fnSource || codePlaceHolder)
  const [compilationError, setCompilationError] = useState<CompilationResult | undefined>()
  const [useFn, setUseFn] = useState(editableProperty.property?.useFn || false)
  const [initialValue, setInitialValue] = useState('')

  const compileCode = () => {
    const result = compileFn(sourceCode)
    setCompilationError(result)
  }

  const saveCode = () => {
    editableProperty.saveProperty({useFn: useFn, fnSource: sourceCode})
    setInitialValue(sourceCode)
    onSave()
  }

  useEffect(() => {
    const initialValue = editableProperty.property?.fnSource || codePlaceHolder
    setInitialValue(initialValue)
  }, [editableProperty])

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
    <CodeEditor key={editableProperty.annotation.key} beginContextLine={functionHeader} endContextLine="}" initialValue={initialValue}
                onChange={setSourceCode}/>
    <SDiv>
      <ButtonGroup>
        <Button appearance="primary" onClick={compileCode}>Compile</Button>
        <Button appearance="ghost" onClick={action(() => saveCode())}>Save</Button>
        <Button appearance="ghost" onClick={onClose}>Close</Button>
      </ButtonGroup>
      <Checkbox checked={useFn} onChange={(_, checked) => setUseFn(checked)}>
        Use calculated property
      </Checkbox>
      <ErrorMessage result={compilationError}/>
    </SDiv>
  </>
})

const SDiv = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px;
  align-items: center;
`
