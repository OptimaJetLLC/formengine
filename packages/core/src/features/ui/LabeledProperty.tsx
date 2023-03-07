import styled from '@emotion/styled'
import {IconDefinition} from '@fortawesome/fontawesome-common-types'
import * as faCode from '@fortawesome/free-solid-svg-icons/faCode'
import {observer} from 'mobx-react'
import {cloneElement, ComponentProps} from 'react'
import {IconButton} from 'rsuite'
import useUniqueId from 'rsuite/cjs/utils/useUniqueId'
import {useBuilderStore} from '../../utils/contexts/BuilderStoreContext'
import {useComponentData} from '../../utils/contexts/ComponentDataContext'
import {Hinted, HintedLabel} from '../annotation/components/Hinted'
import {Annotation} from '../annotation/utils/annotations/Annotation'
import {useTranslationPart} from '../localization/hooks'
import {LabeledInput} from './Containers'
import {FaIcon} from './Icons'

export interface LabeledPropertyProps extends ComponentProps<any> {
  idPrefix?: string
  annotation: Annotation
}

const _CodeButton = ({annotation}: { annotation: Annotation }) => {
  const {componentStore} = useComponentData()
  const store = useBuilderStore()
  const hasCode = componentStore.props[annotation.key]?.fnSource
  const useFn = componentStore.props[annotation.key]?.useFn
  const getLabel = useTranslationPart('propertiesEditor.calculable')
  const hint = !annotation.calculable
    ? getLabel('notCalculable')
    : hasCode ? getLabel('edit') : getLabel('hint')
  const color = hasCode && useFn
    ? 'var(--rs-btn-primary-bg)'
    : hasCode ? 'var(--rs-primary-200)' : undefined

  const handleClick = () =>
    store.calculatedProperty = store.calculatedProperty?.annotation === annotation ? undefined : {componentStore, annotation}

  return <Hinted hint={hint}>
    <SIconButton onClick={handleClick} disabled={!annotation.calculable}
                 icon={<FaIcon icon={faCode as unknown as IconDefinition} color={color}/>}
                 size={'xs'} appearance={'subtle'}/>
  </Hinted>
}

const CodeButton = observer(_CodeButton)

export const LabeledProperty = ({idPrefix, annotation, children}: LabeledPropertyProps) => {
  const id = useUniqueId(idPrefix || 'id-')
  const getLabel = useTranslationPart(`annotation.${annotation.key}`)

  return <LabeledInput>
    <CodeButton annotation={annotation}/>
    <HintedLabel htmlFor={id} hint={getLabel('hint') || annotation.hint}>
      <>{getLabel('name') || annotation.name}</>
    </HintedLabel>
    {children ? cloneElement(children, {id}) : undefined}
  </LabeledInput>
}

const SIconButton = styled(IconButton)`
  min-width: 24px;
  margin-inline-end: -6px;
  margin-bottom: -2px !important;
`

export default LabeledProperty
