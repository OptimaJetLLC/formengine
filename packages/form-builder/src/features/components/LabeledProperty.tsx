import styled from '@emotion/styled'
import {IconDefinition} from '@fortawesome/fontawesome-common-types'
import * as faCode from '@fortawesome/free-solid-svg-icons/faCode'
import {ComponentProperty, namedObserver, useComponentData} from '@react-form-builder/core'
import {cloneElement, ComponentProps} from 'react'
import {IconButton} from 'rsuite'
import useUniqueId from 'rsuite/esm/utils/useUniqueId'
import {EditableProperty} from '../../stores/BuilderStore'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import {Hinted, HintedLabel} from '../annotation-editors/Hinted'
import {Annotation} from '../annotation/types/annotations/Annotation'
import {useTranslationPart} from '../localization/hooks'
import {Columns, LabeledInput} from './Containers'
import {FaIcon} from './Icons'

export interface LabeledPropertyProps extends ComponentProps<any> {
  idPrefix?: string
  annotation: Annotation
  getEditableProperty?: () => EditableProperty
}

interface CodeButtonProps {
  annotation: Annotation
  property?: ComponentProperty
  getEditableProperty: () => EditableProperty
}

const CodeButton = namedObserver('CodeButton', ({annotation, property, getEditableProperty}: CodeButtonProps) => {
  const store = useBuilderStore()
  const hasCode = property?.fnSource
  const useFn = property?.useFn
  const getLabel = useTranslationPart('propertiesEditor.calculable')
  const hint = !annotation.calculable
    ? getLabel('notCalculable')
    : hasCode ? getLabel('edit') : getLabel('hint')
  const color = hasCode && useFn
    ? 'var(--rs-btn-primary-bg)'
    : hasCode ? 'var(--rs-primary-200)' : undefined

  const handleClick = () =>
    store.calculatedProperty = store.calculatedProperty?.annotation === annotation ? undefined : getEditableProperty()

  return <Hinted hint={hint}>
    <SIconButton onClick={handleClick} disabled={!annotation.calculable}
                 icon={<FaIcon icon={faCode as unknown as IconDefinition} color={color}/>}
                 size={'xs'} appearance={'subtle'}/>
  </Hinted>
})

export const LabeledProperty = ({idPrefix, annotation, getEditableProperty, children, ...props}: LabeledPropertyProps) => {
  const id = useUniqueId(idPrefix || 'id-')
  const getLabel = useTranslationPart(`annotation.${annotation.key}`)
  const {store} = useComponentData()

  const defaultGetEditableProperty = () => {
    if (getEditableProperty) return getEditableProperty()
    return {
      componentKey: store.key,
      annotation: annotation,
      property: store.props[annotation.key],
      saveProperty: (property: ComponentProperty) => {
        const storedProperty = store.props[annotation.key] || {value: undefined}
        store.props[annotation.key] = Object.assign(storedProperty, property)
        return store.props[annotation.key]
      }
    }
  }

  const property = defaultGetEditableProperty().property

  return <LabeledInput {...props}>
    <Columns gap={10}>
      <CodeButton annotation={annotation} property={property} getEditableProperty={defaultGetEditableProperty}/>
      <HintedLabel htmlFor={id} hint={getLabel('hint') || annotation.hint}>
        <>{getLabel('name') || annotation.name}</>
      </HintedLabel>
    </Columns>
    {children ? cloneElement(children, {id}) : undefined}
  </LabeledInput>
}

const SIconButton = styled(IconButton)`
  min-width: 24px;
  margin-inline-end: -6px;
  margin-bottom: -2px !important;
`

export default LabeledProperty
