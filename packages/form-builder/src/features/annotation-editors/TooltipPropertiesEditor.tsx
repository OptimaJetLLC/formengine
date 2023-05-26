import {useEffect, useState} from 'react'
import useUniqueId from 'rsuite/esm/utils/useUniqueId.js'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import {LabeledInput} from '../components/Containers'
import {useTranslationPart} from '../localization/hooks'
import {PropertyBlock} from '../ui/RightPanel/PropertiesEditor/components/Properties'
import {SCheckbox} from './BooleanInput'
import {HintedLabel} from './Hinted'

export const TooltipPropertiesEditor = () => {
  const t = useTranslationPart('annotation.tooltipProps')
  const id = useUniqueId('tooltip-')
  const selected = useBuilderStore().oneSelected
  const store = useBuilderStore()
  const [useTooltip, setUseTooltip] = useState(!!selected?.tooltipProps)

  useEffect(() => {
    if (!selected) return
    selected.tooltipProps = useTooltip ? {...selected.tooltipProps} : undefined
  }, [useTooltip])

  const selectedTooltipType = store.viewer.tooltipType
  if (!selectedTooltipType) return null

  const tooltipAnnotations = store.view.getTooltipAnnotations(selectedTooltipType)

  if (!tooltipAnnotations) return null

  return <>
    <LabeledInput>
      <HintedLabel hint={<>{t('hint')}</>} htmlFor={id}>
        <h6>{t('tooltip')}</h6>
      </HintedLabel>
      <SCheckbox checked={useTooltip} onChange={(_, checked) => setUseTooltip(checked)} id={id}></SCheckbox>
    </LabeledInput>
    {!!selected?.tooltipProps &&
      <PropertyBlock annotations={tooltipAnnotations} context={selected?.tooltipProps}/>
    }
  </>
}

