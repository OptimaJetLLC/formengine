import styled from '@emotion/styled'
import type {CssPart} from '@react-form-builder/core'
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
  useWrapperStyles?: boolean
  /**
   * The tab which is selected by default.
   */
  defaultActiveTab?: CssPart
}

type Item = { value: CssPart, label: string, hint?: string }

const RawCSSEditor = ({device, useWrapperStyles, defaultActiveTab}: CSSEditorProps) => {
  const {store} = useComponentData()
  const t = useTranslationPart('style')
  const [activeTab, setActiveTab] = useState<CssPart>(defaultActiveTab ?? 'css')
  useEffect(() => {
    setActiveTab(defaultActiveTab ?? 'css')
  }, [defaultActiveTab])
  const initialValue = useMemo(() => {
    return store[activeTab]?.[device]?.string ?? ''
  }, [store, device, activeTab])

  const onChange = useCallback((value: any) => {
    store[activeTab] ??= {}
    store[activeTab]![device] ??= {}
    store[activeTab]![device]!.string = value
  }, [store, activeTab, device])

  const handleSelect: RadioButtonsProps['onChange'] = useCallback(value => setActiveTab(value as CssPart), [setActiveTab])

  const items: Item[] = useMemo(() => ([
    {value: 'css', label: t('component'), hint: t('componentTab.hint')},
    {value: 'wrapperCss', label: t('wrapper'), hint: t('wrapperTab.hint')}
  ]), [t])

  const options = useMemo(() => ({
    contextmenu: false,
    lineNumbers: 'off',
    minimap: {enabled: false},
    glyphMargin: false,
    folding: false,
    lineDecorationsWidth: 0,
    lineNumbersMinChars: 0,
    autoIndent: 'full'
  } satisfies editor.IStandaloneEditorConstructionOptions), [])

  return (
    <Rows>
      <PropertyBlockHeader header={t('header.name')} hint={t('header.hint')}/>
      {useWrapperStyles && <RadioButtons value={activeTab} onChange={handleSelect} items={items}/>}
      <SCodeEditor
        key={`${store.key}${activeTab}${device}`}
        language="css"
        beginContextLine={'element.style {'}
        endContextLine="}"
        initialValue={initialValue}
        onChange={onChange}
        height={'20vh'}
        options={options}
      />
    </Rows>
  )
}

export const CSSEditor = namedObserver('CSSEditor', RawCSSEditor)
