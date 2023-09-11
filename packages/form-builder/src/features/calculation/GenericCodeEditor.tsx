import styled from '@emotion/styled'
import type {BaseCompilationResult, CompilationResult} from '@react-form-builder/core'
import {action} from 'mobx'
import {useEffect, useState} from 'react'
import {Button, ButtonGroup} from 'rsuite'
import {CodeEditor} from '../components/CodeEditor'
import {Rows} from '../components/Containers'
import {useTranslationPart} from '../localization/hooks'

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
const ErrorMessage = ({result}: { result?: BaseCompilationResult }) => {
  const t = useTranslationPart('codeEditor')

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
    messages.push(t('ok'))
  }

  const color = error ? 'red' : 'green'

  return <span>{t('compilationResult')} <code style={{color: color}}>{messages.join('/n')}</code></span>
}

/**
 * Properties of the React component {@link GenericCodeEditor}.
 */
export interface GenericCodeEditorProps {
  editorKey: any
  beginContextLine?: string
  endContextLine?: string
  source?: string
  onChange: (value: string) => void
  onClose: () => void
  onCompile: (value: string) => BaseCompilationResult
}

/**
 * Generic code editor.
 * @param props the React component properties
 * @returns the React element.
 */
export const GenericCodeEditor = (props: GenericCodeEditorProps) => {
  const t = useTranslationPart('codeEditor')
  const codePlaceHolder = t('codePlaceholder')

  const [sourceCode, setSourceCode] = useState(props.source ?? codePlaceHolder)
  const [compilationError, setCompilationError] = useState<CompilationResult | undefined>()
  const [initialValue, setInitialValue] = useState('')

  const compileCode = () => {
    const result = props.onCompile(sourceCode)
    setCompilationError(result)
    return result
  }

  const saveCode = () => {
    const compilationResult = compileCode()
    if (compilationResult.error) return
    setCompilationError(undefined)
    props.onChange(sourceCode)
    setInitialValue(sourceCode)
  }

  useEffect(() => {
    const initialValue = props.source || codePlaceHolder
    setInitialValue(initialValue)
    setSourceCode(initialValue)
  }, [props.source])

  return <Rows gap={10}>
    <CodeEditor key={props.editorKey} beginContextLine={props.beginContextLine} endContextLine={props.endContextLine}
                initialValue={initialValue} onChange={setSourceCode}/>
    <SDiv>
      <ButtonGroup size={'sm'}>
        <Button appearance="primary" onClick={compileCode}>{t('compile')}</Button>
        <Button appearance="ghost" onClick={action(() => saveCode())}>{t('save')}</Button>
        <Button appearance="ghost" onClick={() => props.onClose()}>{t('close')}</Button>
      </ButtonGroup>
      <ErrorMessage result={compilationError}/>
    </SDiv>
  </Rows>
}

const SDiv = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`
