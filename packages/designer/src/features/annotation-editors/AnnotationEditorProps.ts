import type {Annotation, ComponentData, ComponentPropertyComputeType, LanguageFullCode} from '@react-form-builder/core'
import type {Section} from '../ui/RightPanel/PropertiesEditor/Section'

/**
 * Localization compute parameters.
 */
export type LocalizationComputeCodeParams = {
  /**
   * The full language code.
   */
  langCode?: LanguageFullCode
}

/**
 * The parameter type of the component property value parameters.
 */
export type ComputePropertiesParameters = {
  /**
   * Function parameters.
   */
  function: never
  /**
   * Localization parameters.
   */
  localization: LocalizationComputeCodeParams
}

/**
 * The compute type parameters.
 * @template T the component property value type.
 */
export type ComputeTypeParams<T extends ComponentPropertyComputeType> = ComputePropertiesParameters[T]

/**
 * Represents the props used to edit a calculable property.
 */
export interface CalculableEditorProps {
  /**
   * Disables the ability to make the property computable.
   */
  disableCompute: () => void
  /**
   * Sets the computed property code.
   * @param value the code of computed property.
   * @param type the component property value type.
   * @param params the parameters of the compute code.
   * @template T the component property value type.
   */
  setComputeCode: <T extends ComponentPropertyComputeType>(value: string, type: T, params?: ComputeTypeParams<T>) => void
  /**
   * Returns the code of the computed property.
   * @param type the component property value type.
   * @param params the parameters of the compute code.
   * @template T the component property value type.
   * @returns the code of the computed property.
   */
  getComputeCode: <T extends ComponentPropertyComputeType>(type: T, params?: ComputeTypeParams<T>) => string
  /**
   * Returns the type of calculation for the property.
   */
  getComputeType: () => ComponentPropertyComputeType | undefined

  /**
   * Returns true if the property has a compute code for the specified type, false otherwise.
   * @param type the compute type.
   * @returns true if the property has a compute code for the specified type, false otherwise.
   */
  hasComputeCode: (type: ComponentPropertyComputeType) => boolean
}

/**
 * Props for the AnnotationEditor component.
 */
export interface AnnotationEditorProps extends CalculableEditorProps {
  /**
   * Annotation editor value.
   */
  value: any
  /**
   * Annotation editor onChange handler.
   */
  onChange: (value: any) => void
  /**
   * Annotation editor onClean handler.
   */
  onClean: () => void
  /**
   * Displays an error message to the user.
   */
  showError?: (message?: string) => void
  /**
   * Annotation editor annotation.
   */
  annotation: Annotation
  /**
   * The component data.
   */
  componentData: ComponentData
  /**
   * The displayed section.
   */
  displayedSection?: Section
}
