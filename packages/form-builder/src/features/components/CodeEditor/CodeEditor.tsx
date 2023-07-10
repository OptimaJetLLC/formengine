import Editor, {OnMount} from '@monaco-editor/react'
// @ts-ignore it no have type declarations ☹️
import {constrainedEditor} from 'constrained-editor-plugin'
import {observer} from 'mobx-react'
import type {editor} from 'monaco-editor'
import {useCallback} from 'react'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import './config'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void,
  /**
   * @default 'javascript'
   */
  language?: 'javascript' | 'json' | 'css'
  /**
   * Read only line for adding context to a code. Automatically adds the "}" symbol to the end.
   * Especially useful to add jsdoc for typing before.
   * @example
   * '... jsdoc ...
   * function abc(name) {'
   */
  contextLine?: string
  height?: string | number
  width?: string | number
  className?: string
  options?: editor.IStandaloneEditorConstructionOptions
}

export const CodeEditor = observer((props: CodeEditorProps) => {
  const {theme} = useBuilderStore()
  const [defaultValue, handleMount] = useContextLine(props.value, props.onChange, props.contextLine)

  return (
    <Editor
      onMount={handleMount}
      className={props.className}
      defaultValue={defaultValue}
      height={props.height ?? '90vh'}
      width={props.width}
      language={props.language ?? 'javascript'}
      options={props.options}
      theme={theme === 'light' ? 'light' : 'vs-dark'}
    />
  )
})

function useContextLine(code: string, onChange: (value: string) => void, contextLine?: string) {
  const value = contextLine ? [contextLine, code, '}'].join('\n') : code

  const handleMount: OnMount = useCallback((editor, monaco) => {
    if (!contextLine) {
      editor.onDidChangeModelContent(() => onChange(editor.getValue()))
      return
    }

    const model = editor.getModel() as ConstrainedModel
    const constrainedInstance = constrainedEditor(monaco)
    const [endContextLine, endContextColumn] = getEndPosition(contextLine)
    const lastLine = model.getLineCount()

    constrainedInstance.initializeIn(editor)
    constrainedInstance.addRestrictionsTo(model, [{
      label: 'body',
      allowMultiline: true,
      //editable range: [startLine, startColumn, endLine, endColumn]
      range: [endContextLine, endContextColumn, lastLine, 1],
      validate(current: string, _: any, {endLineOfRange, startLineOfRange}: Info) {
        if (startLineOfRange) return current.startsWith('\n')
        if (endLineOfRange) return current.endsWith('\n')
        return true
      }
    }])

    model.onDidChangeContentInEditableRange((value) => onChange(value.body))
  }, [contextLine])

  return [value, handleMount] as const
}

type Info = {
  endLineOfRange: boolean,
  startLineOfRange: boolean
}

type ConstrainedModel = editor.ITextModel & {
  onDidChangeContentInEditableRange: (callback: (value: Record<string, string>) => void) => void
}

function getEndPosition(str: string) {
  const lines = str.split('\n')
  const lastLineLength = lines.at(-1)?.length ?? 0
  return [lines.length, lastLineLength + 1] as const
}
