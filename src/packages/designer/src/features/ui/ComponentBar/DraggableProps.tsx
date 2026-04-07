import type {ComponentData} from '@react-form-builder/core'

/**
 * Properties of the draggable component.
 */
export interface DraggableProps {
  /**
   * The flag of dragging the component, if true - the component is dragged, false - otherwise.
   */
  draggable?: boolean
  /**
   * The callback function called when a component needs to be added to a target component.
   * @param source the component to be added.
   */
  onAdd?: (source: ComponentData) => void

  /**
   * The callback function called when a component is double-clicked.
   */
  onDoubleClick?: (source: ComponentData) => void
}
