import type {IconDefinition} from '@fortawesome/fontawesome-common-types'
import * as faCode from '@fortawesome/free-solid-svg-icons/faCode.js'
import * as faGlobe from '@fortawesome/free-solid-svg-icons/faGlobe.js'
import * as faEdit from '@fortawesome/free-solid-svg-icons/faMarker.js'
import type {Annotation, ComponentData} from '@react-form-builder/core'
import {isEqual} from '@react-form-builder/core'
import cx from 'clsx'
import type {ComponentProps, HTMLAttributes, ReactNode} from 'react'
import {cloneElement, useCallback, useMemo} from 'react'
import {IconButton} from 'rsuite'
import {EditableProperty} from '../../stores/BuilderStore'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import {useUniqueId} from '../../utils/useUniqueId'
import {withLocalization} from '../../utils/withLocalization'
import type {CalculableEditorProps} from '../annotation-editors/AnnotationEditorProps'
import {Hinted, HintedLabel} from '../annotation-editors/Hinted'
import {customizable} from '../customization/customizable'
import {customizableObserver} from '../customization/customizableObserver'
import {useTranslationPart} from '../localization/hooks'
import {Columns, LabeledInput} from './Containers'
import {FaIcon} from './Icons'
import styles from './LabeledProperty.module.css'
import {useTranslatedComponentProperty} from './useTranslatedComponentProperty'

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
  /**
   * Annotation editor value.
   */
  value?: any
}

/**
 * Represents the properties of a Code Button component.
 */
interface CodeButtonProps extends CalculableEditorProps {
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
    const localizationAvailable = withLocalization(store)
    const localization = localizationAvailable && calculableType === 'localization' && hasComputeCode('localization')

    if (disabled) return 'disabled'
    if (calculation) return 'calculation'
    if (localization) return 'localization'
    if (annotation.calculable && (localizationAvailable && annotation.localizable)) return 'calculableAndLocalizable'
    if (annotation.calculable) return 'calculable'
    if (annotation.localizable) return 'localizable'

    return 'disabled'
  }, [calculableType, hasComputeCode, store, disabled, annotation.calculable, annotation.localizable])

  const buttonStyle = useMemo(() => {
    const {hint, icon, color} = ButtonAppearance[buttonType]
    return {icon, color, hint: getLabel(hint)}
  }, [buttonType, getLabel])

  const handleClick = useCallback(() => {
    // eslint-disable-next-line react-hooks/immutability
    store.currentEditable = new EditableProperty(disableCompute, setComputeCode,
      getComputeCode, getComputeType, hasComputeCode, annotation, componentData.key)
  }, [annotation, componentData.key, disableCompute, getComputeCode, getComputeType, hasComputeCode, setComputeCode, store])

  const icon = useMemo(() => <FaIcon icon={buttonStyle.icon} color={buttonStyle.color}/>, [buttonStyle.icon, buttonStyle.color])

  return (
    <Hinted hint={buttonStyle.hint}>
      <IconButton
        className={styles.iconButton}
        onClick={handleClick}
        disabled={disabled}
        icon={icon}
        size={'xs'}
        appearance={'subtle'}
      />
    </Hinted>
  )
}

const CodeButton = customizableObserver('PropertyCodeButton', RawCodeButton)

const CustomizedLabel = customizable('PropertyLabel', HintedLabel)

const RawCustomizedInput = (props: HTMLAttributes<HTMLDivElement>) => {
  return <div {...props} className={cx(styles.customizedInput, props.className)}/>
}

const CustomizedInput = customizable('PropertyInput', RawCustomizedInput)

interface LabeledWrapperProps extends ComponentProps<any> {
  leftButton?: ReactNode
  label?: string
  hint?: ReactNode
  required?: boolean
  dataTestId?: string
  inputTestId?: string
}

/**
 * The LabeledWrapper
 * @param props the React component properties.
 * @returns the React element.
 */
export const LabeledWrapper = (props: LabeledWrapperProps) => {
  const {children, className, style, label, hint, required, leftButton, dataTestId, inputTestId} = props
  const id = useUniqueId('id-')
  const labelClassName = cx({required})

  return (
    <LabeledInput style={style} className={className} data-testid={dataTestId}>
      <Columns className={styles.columns}>
        {leftButton ?? <div className={styles.leftButtonPlaceholder}/>}
        <CustomizedLabel htmlFor={id} hint={hint} className={labelClassName}>
          <>{label}</>
        </CustomizedLabel>
      </Columns>
      {!!children && <CustomizedInput>
        {cloneElement(children, {id, 'data-testid': inputTestId})}
      </CustomizedInput>}
    </LabeledInput>
  )
}

const RawLabeledProperty = (props: LabeledPropertyProps) => {
  const {annotation, children, style, value} = props
  const {className, ...codeButtonProps} = props
  const componentType = props.componentData.model.type

  const leftButton = useMemo(() => {
    const needCodeButton = annotation.calculable || annotation.localizable
    return needCodeButton ? <CodeButton {...codeButtonProps}/> : undefined
  }, [annotation.calculable, annotation.localizable, codeButtonProps])

  const {hint, label} = useTranslatedComponentProperty(annotation, componentType)

  const valueModified = !isEqual(value, annotation.default)
  const adjustedClassName = [className, valueModified ? 'valueModified' : ''].filter(v => !!v).join(' ')

  return <LabeledWrapper style={style}
                         className={adjustedClassName}
                         required={annotation.required}
                         hint={hint}
                         label={label}
                         leftButton={leftButton}
                         dataTestId={`${annotation.key}-labeled-wrapper`}
                         inputTestId={`${annotation.key}-property-input`}>
    {children}
  </LabeledWrapper>
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
const LabeledProperty = customizable('LabeledProperty', RawLabeledProperty)

export default LabeledProperty
