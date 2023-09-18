import {Annotation, ComponentData, ComponentPropertyComputeType} from '@react-form-builder/core'

/**
 * Represents the props used to edit a calculable property.
 */
export interface CalculableEditorProps {
  disableCompute: () => void
  setComputeCode: (value: string, type: ComponentPropertyComputeType) => void
  getComputeCode: (type: ComponentPropertyComputeType) => string,
  getComputeType: () => ComponentPropertyComputeType | undefined
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
}
