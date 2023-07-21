import {css} from '@emotion/css'
import styled from '@emotion/styled'
import {IconDefinition} from '@fortawesome/fontawesome-common-types'
import * as faCode from '@fortawesome/free-solid-svg-icons/faCode.js'
import * as faGlobe from '@fortawesome/free-solid-svg-icons/faGlobe.js'
import * as faEdit from '@fortawesome/free-solid-svg-icons/faMarker.js'
import {ComponentProperty, namedObserver, useComponentData, useStore} from '@react-form-builder/core'
import {cloneElement, ComponentProps} from 'react'
import {IconButton} from 'rsuite'
import useUniqueId from 'rsuite/esm/utils/useUniqueId.js'
import {EditableProperty} from '../../stores/BuilderStore'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import {Hinted, HintedLabel} from '../annotation-editors/Hinted'
import {Annotation} from '../annotation/types/annotations/Annotation'
import {useTranslationPart} from '../localization/hooks'
import {Columns, LabeledInput} from './Containers'
import {FaIcon} from './Icons'

const afterRedAsterisk = css`
  &:after {
    padding-left: 3px;
    content: "*";
    color: red;
  }
`

/**
 * The properties of the React {@link LabeledProperty} component.
 */
export interface LabeledPropertyProps extends ComponentProps<any> {
  idPrefix?: string
  annotation: Annotation
  getEditableProperty?: () => EditableProperty
}

interface CodeButtonProps {
  currentEditableProperty: EditableProperty
  getEditableProperty: () => EditableProperty
}

const CodeButton = namedObserver('CodeButton', ({currentEditableProperty, getEditableProperty}: CodeButtonProps) => {
  const store = useBuilderStore()
  const viewerStore = useStore()
  const property = currentEditableProperty.property
  const annotation = currentEditableProperty.annotation
  const hasCode = property?.fnSource
  const hasFluentLocalization = viewerStore.localization.hasComponentProperty(currentEditableProperty.componentKey, annotation.key)
  const useFn = property?.useFn
  const useFluentLocalization = property?.useFluentLocalization
  const getLabel = useTranslationPart('propertiesEditor.codeButton')

  const getHintTranslation = () => {
    if (!annotation.calculable && !annotation.localizable) return 'neitherCalculableNorLocalizable'
    if (hasCode) return 'editCalculable'
    if (hasFluentLocalization) return 'editLocalizable'
    if (annotation.calculable && annotation.localizable) return 'hintCalculableAndLocalizable'
    if (annotation.calculable) return 'hintCalculable'
    return 'hintLocalizable'
  }
  const hint = getLabel(getHintTranslation())

  const getColor = () => {
    if ((hasCode && useFn) || (hasFluentLocalization && useFluentLocalization)) return 'var(--rs-btn-primary-bg)'
    if (hasCode || hasFluentLocalization) return 'var(--rs-primary-200)'
  }

  const getIcon = () => {
    if (hasCode) return faCode as unknown as IconDefinition
    if (hasFluentLocalization) return faGlobe as unknown as IconDefinition
    return faEdit as unknown as IconDefinition
  }

  const handleClick = () =>
    store.calculatedProperty = store.calculatedProperty?.annotation === annotation ? undefined : getEditableProperty()

  return <Hinted hint={hint}>
    <SIconButton onClick={handleClick} disabled={!annotation.calculable}
                 icon={<FaIcon icon={getIcon()} color={getColor()}/>}
                 size={'xs'} appearance={'subtle'}/>
  </Hinted>
})

/**
 * The React component that displays a component property and label.
 * @param props the React component properties.
 * @param props.idPrefix the prefix for the id attribute in HTML.
 * @param props.annotation the component property metadata.
 * @param props.getEditableProperty function that returns the parameters of the component's editable property.
 * @param props.children the React component that displays a component property.
 * @param props.props the other properties of the component.
 * @returns the React element.
 */
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

  const className = annotation.required ? afterRedAsterisk : undefined

  return <LabeledInput {...props}>
    <Columns gap={10}>
      <CodeButton currentEditableProperty={defaultGetEditableProperty()} getEditableProperty={defaultGetEditableProperty}/>
      <HintedLabel htmlFor={id} hint={getLabel('hint') || annotation.hint} className={className}>
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
