import type {CssPart} from '@react-form-builder/core'
import {namedObserver, useComponentData} from '@react-form-builder/core'
import {useCallback, useMemo, useState} from 'react'
import type {Device} from '../../utils/types'
import {Rows} from '../components/Containers'
import type {RadioButtonsProps} from '../components/RadioButtons'
import {RadioButtons} from '../components/RadioButtons'
import {useTranslationPart} from '../localization/hooks'
import {PropertyBlockHeader} from '../ui/RightPanel/PropertiesEditor/components/PropertyBlockHeader'
import styles from './StyleCodeEditor.module.css'
import {StyleCodeField} from './StyleCodeField'

/**
 * CSSEditor React component properties.
 */
interface CSSEditorProps {
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

const CSSEditorBody = ({device, useWrapperStyles, defaultActiveTab}: CSSEditorProps) => {
  const t = useTranslationPart('style')
  const [activeTab, setActiveTab] = useState<CssPart>(defaultActiveTab ?? 'css')

  const handleSelect: RadioButtonsProps['onChange'] = useCallback(value => setActiveTab(value as CssPart), [setActiveTab])

  const items: Item[] = useMemo(() => ([
    {value: 'css', label: t('component'), hint: t('componentTab.hint')},
    {value: 'wrapperCss', label: t('wrapper'), hint: t('wrapperTab.hint')}
  ]), [t])

  return (
    <Rows data-testid="css-editor">
      <PropertyBlockHeader header={t('header.name')} hint={t('header.hint')}/>
      {useWrapperStyles && <RadioButtons className={styles.tabs} value={activeTab} onChange={handleSelect} items={items}/>}
      <StyleCodeField
        part={activeTab}
        device={device}
        beginContextLine="element.style {"
        cleanButtonTestId="css-editor-clean-button"
      />
    </Rows>
  )
}

const RawCSSEditor = (props: CSSEditorProps) => {
  const {store} = useComponentData()
  return <CSSEditorBody key={store.key} {...props}/>
}

export const CSSEditor = namedObserver('CSSEditor', RawCSSEditor)
