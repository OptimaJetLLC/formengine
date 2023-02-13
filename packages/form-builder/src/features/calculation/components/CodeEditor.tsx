import CodeMirror from '@uiw/react-codemirror'
import {FullScreenExpandable, useBuilderStore} from 'fb-core'
import {observer} from 'mobx-react'
import {useCallback} from 'react'

interface CodeEditorProps {
  source: string
  setSource?: (value: string) => void,
  readonly?: boolean
}

export const CodeEditor = observer(({source, setSource, readonly}: CodeEditorProps) => {
  const {theme} = useBuilderStore()
  const onChange = useCallback(value => setSource?.(value), [])
  return <FullScreenExpandable>
    <CodeMirror
      className={'editor'}
      value={source}
      theme={theme as 'light' | 'dark'}
      height="100%"
      style={{flex: 1}}
      minHeight="200px"
      // extensions={[javascript()]}
      onChange={onChange}
      readOnly={readonly}
    />
  </FullScreenExpandable>
})
