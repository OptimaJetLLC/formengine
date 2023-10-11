import styled from '@emotion/styled'
import {Device, useComponentData} from '@react-form-builder/core'
import {observer} from 'mobx-react'
import {useMemo} from 'react'
import {CodeEditor} from '../components/CodeEditor'

export const CSSEditor = observer(({device}: { device: Device }) => {
  const {store} = useComponentData()
  const initialValue = useMemo(() => store?.css?.[device]?.string ?? '', [store, device])
  const onChange = (value: any) => {
    store.css ??= {}
    store.css[device] ??= {}
    store.css[device]!.string = value
  }

  return (
    <SCodeEditor
      key={`${store.key}${device}`}
      language="scss"
      beginContextLine={'element.style {'}
      endContextLine="}"
      initialValue={initialValue}
      onChange={onChange}
      height={'20vh'}
      options={{
        contextmenu: false,
        lineNumbers: 'off',
        minimap: {enabled: false},
        glyphMargin: false,
        folding: false,
        lineDecorationsWidth: 0,
        lineNumbersMinChars: 0,
        autoIndent: 'full'
      }}
    />
  )
})

const SCodeEditor = styled(CodeEditor)`
  .suggest-widget {
    width: 100% !important;
    left: 0 !important;
    overflow: hidden;
  }
`
