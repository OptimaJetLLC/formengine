import {namedObserver, useTooltipType} from '@react-form-builder/core'
import {useCallback} from 'react'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import {useUniqueId} from '../../utils/useUniqueId'
import {LabeledInput} from '../components/Containers'
import {useTranslationPart} from '../localization/hooks'
import {PropertyBlock} from '../ui/RightPanel/PropertiesEditor/components/Properties'
import {SCheckbox} from './BooleanInput'
import {HintedLabel} from './Hinted'

/**
 * React form builder component that displays the tooltip property editor .
 * @returns the React element.
 */
const RawTooltipPropertiesEditor = () => {
  const t = useTranslationPart('annotation.tooltipProps')
  const id = useUniqueId('tooltip-')
  const store = useBuilderStore()
  const selectedComponentStore = store.oneSelected?.store
  const tooltipProps = selectedComponentStore?.tooltipProps
  const hasTooltipProps = !!tooltipProps
  const selectedTooltipType = useTooltipType()

  const tooltipAnnotations = selectedTooltipType
    ? store.view.getMeta(selectedTooltipType)?.properties
    : null

  const handleToggle = useCallback((_: unknown, checked: boolean) => {
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
      <SCheckbox checked={hasTooltipProps} onChange={handleToggle} id={id} data-testid="enable-tooltip-checkbox"></SCheckbox>
    </LabeledInput>
    {hasTooltipProps &&
      <PropertyBlock propertyBlockType={'tooltip'} annotations={tooltipAnnotations} context={tooltipProps}/>
    }
  </>
}

export const TooltipPropertiesEditor = namedObserver('TooltipPropertiesEditor', RawTooltipPropertiesEditor)
