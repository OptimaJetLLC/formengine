import styled from '@emotion/styled'
import {CssPart, namedObserver, useComponentData} from '@react-form-builder/core'
import {useMemo, useState} from 'react'
import {Device} from '../../utils/types'
import {CodeEditor} from '../components/CodeEditor'
import {Rows} from '../components/Containers'
import {RadioButtons, RadioButtonsProps} from '../components/RadioButtons'
import {useTranslationPart} from '../localization/hooks'

/**
 * CSSEditor React component properties.
 */
export interface CSSEditorProps {
  /**
   * Display resolution type.
   */
  device: Device
  /**
   * Flag, true if you need use wrapper styles tab, false otherwise.
   */
  useWrapperStyles: boolean
}

type Item = { value: CssPart, label: string }

export const CSSEditor = namedObserver('CSSEditor', ({device, useWrapperStyles}: CSSEditorProps) => {
  const {store} = useComponentData()
  const t = useTranslationPart('style')
  const [activeTab, setActiveTab] = useState<CssPart>('css')
  const initialValue = useMemo(() => {
    return store[activeTab]?.[device]?.string ?? ''
  }, [store, device, activeTab])
  const onChange = (value: any) => {
    store[activeTab] ??= {}
    store[activeTab]![device] ??= {}
    store[activeTab]![device]!.string = value
  }
  const handleSelect: RadioButtonsProps['onChange'] = value => setActiveTab(value as CssPart)

  const items: Item[] = [
    {value: 'css', label: t('component')},
    {value: 'wrapperCss', label: t('wrapper')}
  ]

  return (
    <Rows>
      {useWrapperStyles && <RadioButtons value={activeTab} onChange={handleSelect} items={items}/>}
      <SCodeEditor
        key={`${store.key}${activeTab}${device}`}
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
    </Rows>
  )
})

const SCodeEditor = styled(CodeEditor)`
  .suggest-widget {
    width: 100% !important;
    left: 0 !important;
    overflow: hidden;
  }
`
