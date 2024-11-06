import type {Annotation, ComponentPropertyComputeType} from '@react-form-builder/core'
import {namedObserver} from '@react-form-builder/core'
import {useCallback, useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import type {EditableProperty} from '../../../stores/BuilderStore'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {CalculableCodeEditor} from '../../calculation/CalculableCodeEditor'
import {RadioButtons} from '../../components/RadioButtons'
import {LocalizationEditor} from '../../localization/LocalizationEditor'
import {Header} from './Header'
import {SimpleValueEditor} from './SimpleValueEditor'

type ComputeType = ComponentPropertyComputeType | 'simpleValue'

const editors: Record<ComputeType, any> = {
  function: CalculableCodeEditor,
  localization: LocalizationEditor,
  simpleValue: SimpleValueEditor
}

/**
 * ComputedPropertyEditor React component properties.
 */
export interface ComputedPropertyEditorProps {
  /**
   * The editable computable property.
   */
  property: EditableProperty
}

const buttonsStyle = {flex: 0}

const RawComputedPropertyEditor = ({property}: ComputedPropertyEditorProps) => {
  const builderStore = useBuilderStore()
  const {t} = useTranslation()
  const initialComputeType = property.getComputeType() ?? 'simpleValue'
  const [computeType, setComputeType] = useState<ComputeType>(initialComputeType)
  const {annotation, componentKey} = property
  const Editor = editors[computeType]
  const toggleItems = getToggleItems(annotation, t)
  const handleClose = useCallback(() => builderStore.currentEditable = undefined, [builderStore])
  const handleComputeTypeChange = useCallback((value) => setComputeType(value as ComponentPropertyComputeType), [])

  useEffect(() => setComputeType(initialComputeType), [initialComputeType])

  return <>
    <Header>
      {`${t('bottomPanel.editProperty')}: ${componentKey}.${annotation.name}`}
      {toggleItems.length &&
        <RadioButtons value={computeType} label={'Use'} items={toggleItems} style={buttonsStyle} onChange={handleComputeTypeChange}/>
      }
    </Header>
    <Editor editableProperty={property} onClose={handleClose}/>
  </>
}

export const ComputedPropertyEditor = namedObserver('ComputedPropertyEditor', RawComputedPropertyEditor)

const getToggleItems = ({calculable, localizable}: Annotation, translate: (key: string) => string) => [
  ...calculable ? ['function'] : [],
  ...localizable ? ['localization'] : [],
  ...calculable || localizable ? ['simpleValue'] : []
].map(value => ({label: translate(`bottomPanel.${value}`), value}))
