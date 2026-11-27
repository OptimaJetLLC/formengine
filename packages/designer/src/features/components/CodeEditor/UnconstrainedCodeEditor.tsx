import type {OnMount} from '@monaco-editor/react'
import type {editor} from 'monaco-editor'
import {useCallback, useEffect, useMemo, useRef} from 'react'
import type {UnconstrainedCodeEditorProps} from './CodeEditorProps'
import {MonacoCodeEditor} from './MonacoCodeEditor'
import {registerCodeEditorSaveAction} from './registerCodeEditorSaveAction'

/**
 * The React component that displays monaco code editor.
 * @param props the React component properties.
 * @returns the React element.
 */
export const UnconstrainedCodeEditor = (props: UnconstrainedCodeEditorProps) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor>(null)
  const {onChange, onMount, onSave} = props
  const onSaveRef = useRef(onSave)

  useEffect(() => {
    onSaveRef.current = onSave
  }, [onSave])

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
      registerCodeEditorSaveAction(editor, monaco, value => onSaveRef.current?.(value))

      onMount?.(editor, monaco)
    },
    [onChange, onMount]
  )

  const options: editor.IStandaloneEditorConstructionOptions = useMemo(
    () => ({
      wordWrap: 'on',
      ...props.options,
    }),
    [props.options]
  )

  return (
    <MonacoCodeEditor
      onMount={handleMount}
      className={props.className}
      defaultValue={props.initialValue}
      height={props.height ?? '100%'}
      width={props.width ?? '100%'}
      language={props.language ?? 'javascript'}
      options={options}
      theme={props.theme}
    />
  )
}
