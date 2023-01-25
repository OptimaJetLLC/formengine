import {javascript} from '@codemirror/lang-javascript'
import CodeMirror from '@uiw/react-codemirror'
import {useCallback} from 'react'

interface CodeEditorProps {
  source: string
  setSource?: (value: string) => void,
  readonly?: boolean
}

export const CodeEditor = ({source, setSource, readonly}: CodeEditorProps) => {
  const onChange = useCallback(value => setSource?.(value), [])
  return (
    <CodeMirror
      value={source}
      height="100%"
      minHeight="200px"
      extensions={[javascript()]}
      onChange={onChange}
      readOnly={readonly}
    />
  )
}
