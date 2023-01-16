import {javascript} from '@codemirror/lang-javascript'
import CodeMirror from '@uiw/react-codemirror'
import {useCallback} from 'react'

interface CodeEditorProps {
  source: string
  setSourceCode?: (value: string) => void
}

export const CodeEditor = ({source, setSourceCode}: CodeEditorProps) => {
  const onChange = useCallback(value => setSourceCode?.(value), [])
  return (
    <CodeMirror
      value={source}
      height="200px"
      extensions={[javascript()]}
      onChange={onChange}
    />
  )
}
