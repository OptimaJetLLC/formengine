import type {OnMount} from '@monaco-editor/react'
import type {editor} from 'monaco-editor'
import {useCallback, useEffect, useRef} from 'react'
import type {UnconstrainedCodeEditorProps} from './CodeEditorProps'
import {MonacoCodeEditor} from './MonacoCodeEditor'
import {useMonacoAutoformat} from './useMonacoAutoformat'

/**
 * The React component that displays monaco code editor.
 * @param props the React component properties.
 * @returns the React element.
 */
export const UnconstrainedCodeEditor = (props: UnconstrainedCodeEditorProps) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor>(null)
  const {onChange, onMount} = props

  useEffect(() => {
    const editor = editorRef.current
    if (!editor || editor.getValue() === props.initialValue) {
      return
    }
    editor.setValue(props.initialValue)
  }, [props.initialValue])

  const handleMount: OnMount = useCallback(
    (editor, monaco) => {
      editor.onDidChangeModelContent(() => onChange(editor.getValue()))
      editorRef.current = editor

      onMount?.(editor, monaco)
    },
    [onChange, onMount]
  )

  const {monacoOptions, onMount: autoformatOnMount} = useMonacoAutoformat(props.autoformat, props.options, handleMount)

  return (
    <MonacoCodeEditor
      onMount={autoformatOnMount}
      className={props.className}
      defaultValue={props.initialValue}
      height={props.height ?? '100%'}
      width={props.width ?? '100%'}
      language={props.language ?? 'javascript'}
      options={monacoOptions}
      theme={props.theme}
    />
  )
}
