import {ComponentPropertyComputeType, namedObserver} from '@react-form-builder/core'
import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Button} from 'rsuite'
import {EditableProperty} from '../../../stores/BuilderStore'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {LabeledValue} from '../../annotation/utils/LabeledValue'
import {CalculableCodeEditor} from '../../calculation/CalculableCodeEditor'
import {RadioButtons} from '../../components/RadioButtons'
import {LocalizationEditor} from '../../localization/LocalizationEditor'
import {Header} from './Header'

const editors: Record<ComponentPropertyComputeType, any> = {
  function: CalculableCodeEditor,
  localization: LocalizationEditor
}

export const ComputedPropertyEditor = namedObserver('ComputedPropertyEditor', ({property}: { property: EditableProperty }) => {
  const builderStore = useBuilderStore()
  const {t} = useTranslation()
  const initialComputeType = property.property?.computeType
  const [computeType, setComputeType] = useState<ComponentPropertyComputeType>(initialComputeType ?? 'function')
  const {calculable, localizable, name} = property.annotation

  useEffect(() => {
    setComputeType(initialComputeType ?? 'function')
  }, [initialComputeType])

  const Editor = editors[computeType]

  const toggleItems: LabeledValue[] = [
    {label: t('bottomPanel.calculable'), value: 'function'},
    {label: t('bottomPanel.localization'), value: 'localization'}
  ]

  const reset = () => property.saveProperty({computeType: undefined})

  return <>
    <Header>
      {`${t('bottomPanel.editProperty')}: ${property.componentKey}.${name}`}
      {calculable && localizable &&
        <div style={{display: 'flex', gap: 10}}>
          <RadioButtons value={computeType} label={'Use'} items={toggleItems} style={{width: 'min-content', marginLeft: 5, flex: 0}}
                        onChange={value => setComputeType(value as ComponentPropertyComputeType)}/>
          {!!initialComputeType && <Button onClick={reset} size={'xs'}>{t('common.reset')}</Button>}
        </div>
      }
    </Header>
    <Editor editableProperty={property}
            onClose={() => builderStore.currentEditable = undefined}/>
  </>
})
