import Editor, {OnMount} from '@monaco-editor/react'
import type {WrapperProps} from '@react-form-builder/core'
// @ts-ignore it no have type declarations ☹️
import {constrainedEditor} from 'constrained-editor-plugin'
import {observer} from 'mobx-react'
import type {editor} from 'monaco-editor'
import {useCallback, useEffect, useRef, useState} from 'react'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import './config'

const LtrDiv = ({children}: WrapperProps) => {
  return <div dir="ltr" style={{width: '100%', height: '100%'}}>{children}</div>
}

interface CodeEditorProps {
  initialValue: string
  onChange: (value: string) => void
  /**
   * @default 'javascript'
   */
  language?: 'javascript' | 'json' | 'css' | 'fluent'
  /**
   * Read only line for adding context to a code. Automatically adds the "}" symbol to the end.
   * Especially useful to add jsdoc for typing before.
   * @example
   * '... jsdoc ...
   * function abc(name) {'
   */
  beginContextLine?: string
  endContextLine?: string
  canEditBeginContextLine?: boolean
  height?: string | number
  width?: string | number
  className?: string
  options?: editor.IStandaloneEditorConstructionOptions
}

export const CodeEditor = observer((props: CodeEditorProps) => {
  const hasBeginContextLine = !!props.beginContextLine
  const hasEndContextLine = !!props.endContextLine
  const [initialValue, setInitialValue] = useState('')

  useEffect(() => {
    let initialValueWithContextLines = ''

    if (hasBeginContextLine && props.canEditBeginContextLine) {
      initialValueWithContextLines = `${props.beginContextLine}${props.initialValue}`
    } else if (hasBeginContextLine) {
      initialValueWithContextLines = `${props.beginContextLine}\n${props.initialValue}`
    } else {
      initialValueWithContextLines = props.initialValue
    }

    if (hasEndContextLine) {
      initialValueWithContextLines += `\n${props.endContextLine}`
    }

    setInitialValue(initialValueWithContextLines)
  }, [props.beginContextLine, props.endContextLine, props.initialValue])

  const editorRef = useRef<editor.IStandaloneCodeEditor>()

  useEffect(() => {
    editorRef.current?.setValue(initialValue)
  }, [initialValue])

  const handleMount: OnMount = useCallback((editor, monaco) => {
    if (!hasBeginContextLine && !hasEndContextLine) {
      editor.onDidChangeModelContent(() => props.onChange(editor.getValue()))
      return
    }
    const model = editor.getModel() as ConstrainedModel

    const [beginContextLineEndLine, beginContextLineEndColumn] = getEndPosition(props.beginContextLine ?? '')
    const [endContextLineEndLine] = getEndPosition(props.endContextLine ?? '')
    const lastEditableLine = hasEndContextLine ? model.getLineCount() - (endContextLineEndLine - 1) : model.getLineCount()
    const lastEditableColumn = hasEndContextLine ? 1 : model.getFullModelRange().endColumn

    const constrainedInstance = constrainedEditor(monaco)
    constrainedInstance.initializeIn(editor)
    constrainedInstance.addRestrictionsTo(model, [{
      label: 'body',
      allowMultiline: true,
      //editable range: [startLine, startColumn, endLine, endColumn]
      range: [beginContextLineEndLine, beginContextLineEndColumn, lastEditableLine, lastEditableColumn],
      validate(current: string, _: any, {endLineOfRange, startLineOfRange}: Info) {
        if (startLineOfRange) return current.startsWith('\n') || props.canEditBeginContextLine
        if (endLineOfRange) return current.endsWith('\n') || !hasEndContextLine
        return true
      }
    }])

    model.onDidChangeContentInEditableRange((value) => {
      let editableCode = value.body
      if (hasBeginContextLine && editableCode.startsWith('\n')) {
        editableCode = editableCode.substring(1)
      }
      if (hasEndContextLine && editableCode.endsWith('\n')) {
        editableCode = editableCode.substring(0, editableCode.length - 1)
      }
      props.onChange(editableCode)
    })

    editorRef.current = editor
  }, [props.beginContextLine, props.endContextLine])

  const {theme} = useBuilderStore()

  return (
    <LtrDiv>
      <Editor
        onMount={handleMount}
        className={props.className}
        defaultValue={initialValue}
        height={props.height ?? '100%'}
        width={props.width ?? '100%'}
        language={props.language ?? 'javascript'}
        options={{
          wordWrap: 'on',
          ...props.options
        }}
        theme={theme === 'light' ? 'light' : 'vs-dark'}
      />
    </LtrDiv>
  )
})

function getEndPosition(str: string) {
  const lines = str.split('\n')
  const lastLineLength = lines.at(-1)?.length ?? 0
  return [lines.length, lastLineLength + 1] as const
}

type ConstrainedModel = editor.ITextModel & {
  onDidChangeContentInEditableRange: (callback: (value: Record<string, string>) => void) => void
}

type Info = {
  endLineOfRange: boolean,
  startLineOfRange: boolean
}
