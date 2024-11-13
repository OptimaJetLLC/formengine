import {css} from '@emotion/css'
import styled from '@emotion/styled'
import type {IconDefinition} from '@fortawesome/fontawesome-common-types'
import * as faCode from '@fortawesome/free-solid-svg-icons/faCode.js'
import * as faGlobe from '@fortawesome/free-solid-svg-icons/faGlobe.js'
import * as faEdit from '@fortawesome/free-solid-svg-icons/faMarker.js'
import type {Annotation, ComponentData} from '@react-form-builder/core'
import type {HTMLAttributes} from 'react'
import {cloneElement, useCallback, useMemo} from 'react'
import {IconButton} from 'rsuite'
import {EditableProperty} from '../../stores/BuilderStore'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import {useUniqueId} from '../../utils/useUniqueId'
import type {CalculableEditorProps} from '../annotation-editors/AnnotationEditorProps'
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

type ButtonType = 'disabled' | 'calculation' | 'localization' | 'localizable' | 'calculable' | 'calculableAndLocalizable'

type ButtonAppearance = {
  hint: string,
  color?: string,
  icon: IconDefinition,
}

const ButtonAppearance: Record<ButtonType, ButtonAppearance> = {
  'disabled': {
    hint: 'neitherCalculableNorLocalizable',
    icon: faEdit as unknown as IconDefinition,
    color: 'var(--rs-btn-default-disabled-bg)'
  },
  'calculation': {
    hint: 'editCalculable',
    color: 'var(--rs-btn-primary-bg)',
    icon: faCode as unknown as IconDefinition,
  },
  'localization': {
    hint: 'editLocalizable',
    color: 'var(--rs-btn-primary-bg)',
    icon: faGlobe as unknown as IconDefinition,
  },
  'calculable': {
    hint: 'hintCalculable',
    icon: faEdit as unknown as IconDefinition,
  },
  'localizable': {
    hint: 'hintLocalizable',
    icon: faEdit as unknown as IconDefinition,
  },
  'calculableAndLocalizable': {
    hint: 'hintCalculableAndLocalizable',
    icon: faEdit as unknown as IconDefinition,
  }
}

const RawCodeButton = (props: CodeButtonProps) => {
  const {annotation, getComputeCode, setComputeCode, disableCompute, getComputeType, hasComputeCode, componentData} = props
  const store = useBuilderStore()
  const disabled = !annotation.calculable && !annotation.localizable
  const getLabel = useTranslationPart('propertiesEditor.codeButton')
  const calculableType = getComputeType()

  const buttonType = useMemo<ButtonType>(() => {
    const calculation = calculableType === 'function' && hasComputeCode('function')
    const localization = calculableType === 'localization' && hasComputeCode('localization')

    if (disabled) return 'disabled'
    if (calculation) return 'calculation'
    if (localization) return 'localization'
    if (annotation.calculable && annotation.localizable) return 'calculableAndLocalizable'
    if (annotation.calculable) return 'calculable'
    if (annotation.localizable) return 'localizable'

    return 'disabled'
  }, [annotation.calculable, annotation.localizable, disabled, hasComputeCode, calculableType])

  const buttonStyle = useMemo(() => {
    const {hint, icon, color} = ButtonAppearance[buttonType]
    return {icon, color, hint: getLabel(hint)}
  }, [buttonType, getLabel])

  const handleClick = useCallback(() => {
    return store.currentEditable = new EditableProperty(disableCompute, setComputeCode,
      getComputeCode, getComputeType, hasComputeCode, annotation, componentData.key)
  }, [annotation, componentData.key, disableCompute, getComputeCode, getComputeType, hasComputeCode, setComputeCode, store])

  return <Hinted hint={buttonStyle.hint}>
    <SIconButton onClick={handleClick} disabled={disabled}
                 icon={<FaIcon icon={buttonStyle.icon} color={buttonStyle.color}/>}
                 size={'xs'} appearance={'subtle'}/>
  </Hinted>
}

const CodeButton = customizableObserver('PropertyCodeButton', RawCodeButton)

const CustomizedLabel = customizable('PropertyLabel', HintedLabel)

const RawCustomizedInput = (props: HTMLAttributes<HTMLDivElement>) => <div style={{width: '100%'}} {...props}/>

const CustomizedInput = customizable('PropertyInput', RawCustomizedInput)

const RawLabeledProperty = (props: LabeledPropertyProps) => {
  const {annotation, children, style} = props
  const {className, ...codeButtonProps} = props
  const id = useUniqueId('id-')
  const componentType = props.componentData.model.type
  const commonLabels = useTranslationPart(`annotation.${annotation.key}`)
  const componentLabels = useTranslationPart(`${componentType}.${annotation.key}`)
  const getLabel = (key: string) => componentLabels(key) || commonLabels(key)
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
}

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
export const LabeledProperty = customizable('LabeledProperty', RawLabeledProperty)

const SIconButton = styled(IconButton)`
  min-width: 24px;
  margin-inline-end: -6px;
`

export default LabeledProperty
