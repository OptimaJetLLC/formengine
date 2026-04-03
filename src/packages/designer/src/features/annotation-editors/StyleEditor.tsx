import styled from '@emotion/styled'
import {namedObserver, useComponentData} from '@react-form-builder/core'
import type {editor} from 'monaco-editor'
import {useCallback, useEffect, useMemo, useState} from 'react'
import type {Device} from '../../utils/types'
import {CodeEditor} from '../components/CodeEditor/CodeEditor'
import {Rows} from '../components/Containers'
import type {RadioButtonsProps} from '../components/RadioButtons'
import {RadioButtons} from '../components/RadioButtons'
import {useTranslationPart} from '../localization/hooks'
import {PropertyBlockHeader} from '../ui/RightPanel/PropertiesEditor/components/PropertyBlockHeader'

const SCodeEditor = styled(CodeEditor)`
  .suggest-widget {
    width: 100% !important;
    inset-inline-start: 0 !important;
    overflow: hidden;
  }
`

/**
 * The part of the style properties of a component.
 */
type StylePart = 'style' | 'wrapperStyle'

/**
 * CSSEditor React component properties.
 */
interface StyleEditorProps {
  /**
   * Display resolution type.
   */
  device: Device
  /**
   * Flag, true if you need use wrapper styles tab, false otherwise.
   */
  useWrapperStyles?: boolean
  /**
   * The tab which is selected by default.
   */
  defaultActiveTab?: StylePart
}

type Item = { value: StylePart, label: string }

const options: editor.IStandaloneEditorConstructionOptions = {
  contextmenu: false,
  lineNumbers: 'off',
  minimap: {enabled: false},
  glyphMargin: false,
  folding: false,
  lineDecorationsWidth: 0,
  lineNumbersMinChars: 0,
  autoIndent: 'full'
}

const RawStyleEditor = ({device, useWrapperStyles, defaultActiveTab}: StyleEditorProps) => {
  const {store} = useComponentData()
  const t = useTranslationPart('styleEditor')
  const [activeTab, setActiveTab] = useState<StylePart>(defaultActiveTab ?? 'style')

  const initialValue = useMemo(() => {
    return store[activeTab]?.[device]?.string ?? ''
  }, [store, activeTab, device])

  const onChange = useCallback((value: any) => {
    store[activeTab] ??= {}
    store[activeTab][device] ??= {}
    store[activeTab][device].string = value
  }, [activeTab, device, store])

  const handleSelect: RadioButtonsProps['onChange'] = useCallback(value => {
    setActiveTab(value as StylePart)
  }, [])

  const items: Item[] = useMemo(() => [
    {value: 'style', label: t('componentTab.name'), hint: t('componentTab.hint')},
    {value: 'wrapperStyle', label: t('wrapperTab.name'), hint: t('wrapperTab.hint')}
  ], [t])

  useEffect(() => {
    setActiveTab(defaultActiveTab ?? 'style')
  }, [defaultActiveTab])

  return (
    <Rows>
      <PropertyBlockHeader header={t('header.name')} hint={t('header.hint')}/>
      {useWrapperStyles && <RadioButtons value={activeTab} onChange={handleSelect} items={items}/>}
      <SCodeEditor
        key={`${store.key}${activeTab}${device}`}
        language="css"
        beginContextLine={`${activeTab} {`}
        endContextLine="}"
        initialValue={initialValue}
        onChange={onChange}
        height={'20vh'}
        options={options}
      />
    </Rows>
  )
}

export const StyleEditor = namedObserver('StyleEditor', RawStyleEditor)
