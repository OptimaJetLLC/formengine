import {useEffect, useState} from 'react'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import {LabeledInput} from '../components/Containers'
import {useTranslationPart} from '../localization/hooks'
import {PropertyBlock} from '../ui/RightPanel/PropertiesEditor/components/Properties'
import {SCheckbox} from './BooleanInput'
import {HintedLabel} from './Hinted'

export const TooltipPropertiesEditor = () => {
  const t = useTranslationPart('annotation.tooltipProps')
  const selected = useBuilderStore().getSingleSelected()
  const store = useBuilderStore()
  const [useTooltip, setUseTooltip] = useState(!!selected?.data.tooltipProps)

  useEffect(() => {
    if (!selected) return
    selected.data.tooltipProps = useTooltip ? {...selected.data.tooltipProps} : undefined
  }, [useTooltip])

  const selectedTooltipType = store.viewer.tooltipType
  if (!selectedTooltipType) return null

  const tooltipAnnotations = store.view.getTooltipAnnotations(selectedTooltipType)

  if (!tooltipAnnotations) return null

  return <>
    <LabeledInput>
      <HintedLabel hint={<>{t('hint')}</>}>
        <>{t('useTooltip')}</>
      </HintedLabel>
      <SCheckbox checked={useTooltip} onChange={(_, checked) => setUseTooltip(checked)}></SCheckbox>
    </LabeledInput>
    {!!selected?.data.tooltipProps &&
      <PropertyBlock annotations={tooltipAnnotations} context={selected?.data.tooltipProps}/>
    }
  </>
}

