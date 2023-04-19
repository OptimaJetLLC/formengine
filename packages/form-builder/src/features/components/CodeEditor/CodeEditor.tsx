import Editor from '@monaco-editor/react'
import {observer} from 'mobx-react'
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
  readOnly?: boolean
  contextmenu?: boolean
  /**
   * Read only line for adding context to a code. Automatically adds the "}" symbol to the end.
   * Especially useful to add jsdoc for typing before.
   * @example
   * '... jsdoc ...
   * function abc(name) {'
   */
  contextLine?: string
}

export const CodeEditor = observer(({readOnly, language, contextmenu, ...props}: CodeEditorProps) => {
  const {theme} = useBuilderStore()
  const [defaultValue, handleMount] = useContextLine(props.value, props.onChange, props.contextLine)

  return (
    <Editor
      onMount={handleMount}
      defaultValue={defaultValue}
      height="90vh"
      language={language ?? 'javascript'}
      options={{readOnly, contextmenu}}
      theme={theme === 'light' ? 'light' : 'vs-dark'}
    />
  )
})
