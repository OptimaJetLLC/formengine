import {Annotation, useStore} from 'fb-core'
import {useEffect, useState} from 'react'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import {useTranslationPart} from '../localization/hooks'
import {LabeledInput} from '../ui/common/Containers'
import {renderSubsectionProperties} from '../ui/RightPanel/PropertiesEditor/components/Properties'
import {SCheckbox} from './BooleanInput'
import {HintedLabel} from './Hinted'

export const TooltipPropertiesEditor = () => {
  const t = useTranslationPart('annotation.tooltipProps')
  const {selected} = useBuilderStore()
  const store = useStore()
  const [useTooltip, setUseTooltip] = useState(!!selected?.data.tooltipProps)
  useEffect(() => {
    if (!selected) return
    selected.data.tooltipProps = useTooltip ? {...selected.data.tooltipProps} : undefined
  }, [useTooltip])

  const selectedTooltipType = store.tooltipType
  if (!selectedTooltipType) return null

  const tooltipAnnotations = store.props.view.getTooltipAnnotations(selectedTooltipType)
  const tooltipAnnotationArray = Object.keys(tooltipAnnotations)
    .map(k => tooltipAnnotations[k]?.build(k)).filter(a => !!a) as Annotation[]
  return <>
    <LabeledInput>
      <HintedLabel hint={<>{t('hint')}</>}>
        <>{t('useTooltip')}</>
      </HintedLabel>
      <SCheckbox checked={useTooltip} onChange={(_, checked) => setUseTooltip(checked)}></SCheckbox>
    </LabeledInput>
    {!!selected?.data.tooltipProps &&
      renderSubsectionProperties(tooltipAnnotationArray, () => selected?.data.tooltipProps!)
    }
  </>
}

