import {langs} from '@uiw/codemirror-extensions-langs'
import CodeMirror from '@uiw/react-codemirror'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'

interface CodeEditorProps {
  value: string
  onChange?: (value: string) => void,
  readonly?: boolean
}

export const JsEditor = ({value, onChange, readonly}: CodeEditorProps) => {
  const {theme} = useBuilderStore()
  return (
    <CodeMirror
      className={'editor'}
      value={value}
      theme={theme as 'light' | 'dark'}
      height="100%"
      style={{flex: 1}}
      minHeight="200px"
      extensions={[langs.javascript()]}
      onChange={onChange}
      readOnly={readonly}
    />
  )
}
