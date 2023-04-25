import Editor from '@monaco-editor/react'
import {observer} from 'mobx-react'
import type {editor} from 'monaco-editor'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import './config'
import {useContextLine} from './useContextLine'

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
