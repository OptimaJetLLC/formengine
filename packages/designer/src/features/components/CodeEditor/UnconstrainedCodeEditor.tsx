import type {OnMount} from '@monaco-editor/react'
import type {editor} from 'monaco-editor'
import {useEffect, useRef} from 'react'
import type {UnconstrainedCodeEditorProps} from './CodeEditorProps'
import {MonacoCodeEditor} from './MonacoCodeEditor'

/**
 * The React component that displays monaco code editor.
 * @param props the React component properties.
 * @returns the React element.
 */
export const UnconstrainedCodeEditor = (props: UnconstrainedCodeEditorProps) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor>()

  useEffect(() => {
    editorRef.current?.setValue(props.initialValue)
  }, [props.initialValue])

  const handleMount: OnMount = editor => {
    editor.onDidChangeModelContent(() => props.onChange(editor.getValue()))
    editorRef.current = editor
  }

  return <MonacoCodeEditor
    onMount={handleMount}
    className={props.className}
    defaultValue={props.initialValue}
    height={props.height ?? '100%'}
    width={props.width ?? '100%'}
    language={props.language ?? 'javascript'}
    options={{
      wordWrap: 'on',
      ...props.options
    }}
    theme={props.theme}
  />
}
