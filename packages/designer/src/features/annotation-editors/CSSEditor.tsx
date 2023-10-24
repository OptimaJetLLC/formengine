import styled from '@emotion/styled'
import {namedObserver, useComponentData} from '@react-form-builder/core'
import {useMemo} from 'react'
import {Device} from '../../utils/types'
import {CodeEditor} from '../components/CodeEditor'

/**
 * CSSEditor React component properties.
 */
export interface CSSEditorProps {
  /**
   * Display resolution type.
   */
  device: Device
}

export const CSSEditor = namedObserver('CSSEditor', ({device}: CSSEditorProps) => {
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
