import {ComponentData} from '@react-form-builder/core'
import {Annotation} from '../annotation/types/annotations/Annotation'

/**
 * Represents the props for any annotation editor component.
 */
export interface AnnotationEditorProps {
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
