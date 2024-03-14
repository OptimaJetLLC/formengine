import {css} from '@emotion/css'
import styled from '@emotion/styled'
import {IconDefinition} from '@fortawesome/fontawesome-common-types'
import * as faCode from '@fortawesome/free-solid-svg-icons/faCode.js'
import * as faGlobe from '@fortawesome/free-solid-svg-icons/faGlobe.js'
import * as faEdit from '@fortawesome/free-solid-svg-icons/faMarker.js'
import {Annotation, ComponentData} from '@react-form-builder/core'
import {cloneElement, HTMLAttributes} from 'react'
import {IconButton} from 'rsuite'
import useUniqueId from 'rsuite/esm/utils/useUniqueId.js'
import {EditableProperty} from '../../stores/BuilderStore'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import {CalculableEditorProps} from '../annotation-editors/AnnotationEditorProps'
import {Hinted, HintedLabel} from '../annotation-editors/Hinted'
import {customizable, customizableObserver} from '../customization'
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
export interface LabeledPropertyProps extends CalculableEditorProps, HTMLAttributes<any> {
  /**
   * The metadata for a React component property.
   */
  annotation: Annotation
  /**
   * The data required to display the component.
   */
  componentData: ComponentData
  /**
   * The child elements of the labeled property.
   */
  children?: any
  /**
   * The label style.
   */
  style?: any
}

/**
 * Represents the properties of a Code Button component.
 */
export interface CodeButtonProps extends CalculableEditorProps {
  /**
   * The metadata for a React component property.
   */
  annotation: Annotation
  /**
   * The data required to display the component.
   */
  componentData: ComponentData
}

const CodeButton = customizableObserver('PropertyCodeButton', (props: CodeButtonProps) => {
  const {annotation, getComputeCode, setComputeCode, disableCompute, getComputeType, hasComputeCode, componentData} = props
  const store = useBuilderStore()
  const hasCode = hasComputeCode('function')
  const hasFluentLocalization = hasComputeCode('localization')
  const calculableType = getComputeType()
  const useFn = calculableType === 'function'
  const useFluentLocalization = calculableType === 'localization'

  const getLabel = useTranslationPart('propertiesEditor.codeButton')

  const getHintTranslation = () => {
    if (!annotation.calculable && !annotation.localizable) return 'neitherCalculableNorLocalizable'
    if (hasCode && useFn) return 'editCalculable'
    if (hasFluentLocalization && useFluentLocalization) return 'editLocalizable'
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
    const codeIcon = faCode as unknown as IconDefinition
    const globeIcon = faGlobe as unknown as IconDefinition
    if (useFn) return codeIcon
    if (useFluentLocalization) return globeIcon
    if (hasCode) return codeIcon
    if (hasFluentLocalization) return globeIcon
    return faEdit as unknown as IconDefinition
  }

  const handleClick = () => {
    return store.currentEditable = new EditableProperty(disableCompute, setComputeCode,
      getComputeCode, getComputeType, hasComputeCode, annotation, componentData.key)
  }

  return <Hinted hint={hint}>
    <SIconButton onClick={handleClick} disabled={!annotation.calculable && !annotation.localizable}
                 icon={<FaIcon icon={getIcon()} color={getColor()}/>}
                 size={'xs'} appearance={'subtle'}/>
  </Hinted>
})

const CustomizedLabel = customizable('PropertyLabel', HintedLabel)
const CustomizedInput = customizable('PropertyInput', props => <div style={{width: '100%'}} {...props}/>)

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
export const LabeledProperty = customizable('LabeledProperty', (props: LabeledPropertyProps) => {
  const {annotation, children, style} = props
  const {className, ...codeButtonProps} = props
  const id = useUniqueId('id-')
  const getLabel = useTranslationPart(`annotation.${annotation.key}`)
  const labelClassName = annotation.required ? afterRedAsterisk : undefined

  return <LabeledInput style={style} className={className}>
    <Columns gap={10} style={{alignItems: 'center'}}>
      <CodeButton {...codeButtonProps}/>
      <CustomizedLabel htmlFor={id} hint={annotation.hint ?? getLabel('hint')} className={labelClassName}>
        <>{getLabel('name') || annotation.name}</>
      </CustomizedLabel>
    </Columns>
    {!!children && <CustomizedInput>{cloneElement(children, {id})}</CustomizedInput>}
  </LabeledInput>
})

const SIconButton = styled(IconButton)`
  min-width: 24px;
  margin-inline-end: -6px;
`

export default LabeledProperty
