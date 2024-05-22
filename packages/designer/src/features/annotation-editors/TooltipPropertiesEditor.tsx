import {namedObserver, useTooltipType} from '@react-form-builder/core'
import {useCallback} from 'react'
import useUniqueId from 'rsuite/esm/utils/useUniqueId.js'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import {LabeledInput} from '../components/Containers'
import {useTranslationPart} from '../localization/hooks'
import {PropertyBlock} from '../ui/RightPanel/PropertiesEditor/components/Properties'
import {SCheckbox} from './BooleanInput'
import {HintedLabel} from './Hinted'

/**
 * React form builder component that displays the tooltip property editor .
 * @returns the React element.
 */
export const TooltipPropertiesEditor = namedObserver('TooltipPropertiesEditor', () => {
  const t = useTranslationPart('annotation.tooltipProps')
  const id = useUniqueId('tooltip-')
  const store = useBuilderStore()
  const selectedComponentStore = store.oneSelected?.store
  const tooltipProps = selectedComponentStore?.tooltipProps
  const hasTooltipProps = !!tooltipProps
  const selectedTooltipType = useTooltipType()
  const tooltipAnnotations = selectedTooltipType ? store.view.getTooltipAnnotations(selectedTooltipType) : null

  const handleToggle = useCallback((_, checked) => {
    if (selectedComponentStore) {
      selectedComponentStore.tooltipProps = checked ? {} : undefined
    }
  }, [selectedComponentStore])

  if (!selectedTooltipType || !tooltipAnnotations) return null

  return <>
    <LabeledInput>
      <HintedLabel hint={<>{t('hint')}</>} htmlFor={id}>
        <h6>{t('tooltip')}</h6>
      </HintedLabel>
      <SCheckbox checked={hasTooltipProps} onChange={handleToggle} id={id}></SCheckbox>
    </LabeledInput>
    {hasTooltipProps &&
      <PropertyBlock propertyBlockType={'tooltip'} annotations={tooltipAnnotations} context={tooltipProps}/>
    }
  </>
})
