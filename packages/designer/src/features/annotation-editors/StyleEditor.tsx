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
 * The part of the style properties of a component.
 */
type StylePart = 'style' | 'wrapperStyle'

/**
 * StyleEditor React component properties.
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

type Item = {value: StylePart; label: string}

const StyleEditorBody = ({device, useWrapperStyles, defaultActiveTab}: StyleEditorProps) => {
  const t = useTranslationPart('styleEditor')
  const [activeTab, setActiveTab] = useState<StylePart>(defaultActiveTab ?? 'style')

  const handleSelect: RadioButtonsProps['onChange'] = useCallback(value => {
    setActiveTab(value as StylePart)
  }, [])

  const items: Item[] = useMemo(
    () => [
      {value: 'style', label: t('componentTab.name'), hint: t('componentTab.hint')},
      {value: 'wrapperStyle', label: t('wrapperTab.name'), hint: t('wrapperTab.hint')},
    ],
    [t]
  )

  return (
    <Rows data-testid="style-editor">
      <PropertyBlockHeader header={t('header.name')} hint={t('header.hint')} />
      {useWrapperStyles && <RadioButtons className={styles.tabs} value={activeTab} onChange={handleSelect} items={items} />}
      <StyleCodeField part={activeTab} device={device} beginContextLine={`${activeTab} {`} cleanButtonTestId="style-editor-clean-button" />
    </Rows>
  )
}

const RawStyleEditor = (props: StyleEditorProps) => {
  const {store} = useComponentData()
  return <StyleEditorBody key={store.key} {...props} />
}

export const StyleEditor = namedObserver('StyleEditor', RawStyleEditor)
