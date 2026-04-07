import type {ComponentPropertyComputeType} from '@react-form-builder/core'
import {namedObserver} from '@react-form-builder/core'
import {useCallback, useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import type {BuilderStore, EditableProperty} from '../../../stores/BuilderStore'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {withLocalization} from '../../../utils/withLocalization'
import {CalculableCodeEditor} from '../../calculation/CalculableCodeEditor'
import {RadioButtons} from '../../components/RadioButtons'
import {useTranslationPart} from '../../localization/hooks'
import {LocalizationEditor} from '../../localization/LocalizationEditor'
import styles from './ComputedPropertyEditor.module.css'
import {Header} from './Header'
import {SimpleValueEditor} from './SimpleValueEditor'

const getToggleItems = (calculable: boolean,
                        localizable: boolean,
                        translate: (key: string) => string) => [
  ...calculable ? ['function'] : [],
  ...localizable ? ['localization'] : [],
  ...calculable || localizable ? ['simpleValue'] : []
].map(value => ({label: translate(`bottomPanel.${value}`), value}))

type ComputeType = ComponentPropertyComputeType | 'simpleValue'

const NoopLocalizationStub = () => {
  const t = useTranslationPart('bottomPanel')

  return <h4>{t('localizationNotSet')}</h4>
}

const getEditor = (computeType: ComputeType, builderStore: BuilderStore) => {
  switch (computeType) {
    case 'simpleValue':
      return SimpleValueEditor
    case 'localization':
      return withLocalization(builderStore) ? LocalizationEditor : NoopLocalizationStub
    case 'function':
      return CalculableCodeEditor
  }
}

/**
 * ComputedPropertyEditor React component properties.
 */
interface ComputedPropertyEditorProps {
  /**
   * The editable computable property.
   */
  property: EditableProperty
}

const RawComputedPropertyEditor = ({property}: ComputedPropertyEditorProps) => {
  const builderStore = useBuilderStore()
  const {t} = useTranslation()
  const initialComputeType = property.getComputeType() ?? 'simpleValue'
  const [computeType, setComputeType] = useState<ComputeType>(initialComputeType)
  const {annotation, componentKey} = property
  const Editor = getEditor(computeType, builderStore)
  const localizable = annotation.localizable && withLocalization(builderStore)
  const toggleItems = getToggleItems(annotation.calculable, localizable, t)
  const handleClose = useCallback(() => builderStore.currentEditable = undefined, [builderStore])
  const handleComputeTypeChange = useCallback((value: string | number) => setComputeType(value as ComponentPropertyComputeType), [])

  useEffect(() => setComputeType(initialComputeType), [initialComputeType])

  return <>
    <Header>
      {`${t('bottomPanel.editProperty')}: ${componentKey}.${annotation.name}`}
      {toggleItems.length &&
        <RadioButtons value={computeType} label={'Use'} items={toggleItems} className={styles.buttons} onChange={handleComputeTypeChange}/>
      }
    </Header>
    <Editor editableProperty={property} onClose={handleClose}/>
  </>
}

export const ComputedPropertyEditor = namedObserver('ComputedPropertyEditor', RawComputedPropertyEditor)
