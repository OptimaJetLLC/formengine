import type {BaseCompilationResult} from '@react-form-builder/core'
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
export const CodeEditorErrorMessage = ({result}: { result?: BaseCompilationResult }) => {
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
