import {Annotation, ComponentPropertyComputeType, namedObserver} from '@react-form-builder/core'
import {useCallback, useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {EditableProperty} from '../../../stores/BuilderStore'
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

export const ComputedPropertyEditor = namedObserver('ComputedPropertyEditor', ({property}: { property: EditableProperty }) => {
  const builderStore = useBuilderStore()
  const {t} = useTranslation()
  const initialComputeType = property.getComputeType() ?? 'simpleValue'
  const [computeType, setComputeType] = useState<ComputeType>(initialComputeType)
  const {annotation, componentKey} = property
  const Editor = editors[computeType]
  const toggleItems = getToggleItems(annotation, t)
  const handleClose = useCallback(() => builderStore.currentEditable = undefined, [builderStore.currentEditable])


  useEffect(() => setComputeType(initialComputeType), [initialComputeType])

  return <>
    <Header>
      {`${t('bottomPanel.editProperty')}: ${componentKey}.${annotation.name}`}
      {toggleItems.length &&
        <RadioButtons value={computeType} label={'Use'} items={toggleItems} style={{flex: 0}}
                      onChange={value => setComputeType(value as ComponentPropertyComputeType)}/>
      }
    </Header>
    <Editor editableProperty={property} onClose={handleClose}/>
  </>
})

const getToggleItems = ({calculable, localizable}: Annotation, translate: (key: string) => string) => [
  ...calculable ? ['function'] : [],
  ...localizable ? ['localization'] : [],
  ...calculable || localizable ? ['simpleValue'] : []
].map(value => ({label: translate(`bottomPanel.${value}`), value}))
