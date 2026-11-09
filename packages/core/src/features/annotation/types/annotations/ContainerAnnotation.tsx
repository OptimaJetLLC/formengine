import type {ComponentProperty} from '../../../../stores/ComponentProperty'
import type {ComponentData} from '../../../../utils/contexts/ComponentDataContext'
import type {NodeEditorType} from '../../utils/builders/NodeEditorType'
import {Annotation} from './Annotation'

/**
 * Configures a component that automatically wraps direct children of another component type in a container slot.
 */
export interface ChildWrapperOptions {
  /**
   * The component type used as the wrapper.
   */
  readonly componentType: string
  /**
   * The wrapper slot that receives the original child.
   * When omitted, the child is placed with an unset slot, which means the wrapper's `children` slot
   * (same as other default-slot placements; the property is omitted from form JSON).
   */
  readonly childSlot?: string
}

/**
 * Metadata for the component container property for the form builder.
 * The Container property of a component can contain other React components.
 */
export class ContainerAnnotation extends Annotation {
  /**
   * The function that checks whether a child component can be inserted into a parent component.
   */
  insertPredicate?: (self: ComponentData, child: ComponentData) => boolean

  /**
   * The component that automatically wraps direct children of another component type on insert or move.
   */
  childWrapper?: ChildWrapperOptions

  /**
   * The default editor.
   */
  defaultEditor?: NodeEditorType

  /**
   * Returns the node editor type for the component property.
   * @param componentProperty the component property.
   * @returns the node editor type for the component property.
   */
  getNodeEditorType(componentProperty?: ComponentProperty): NodeEditorType {
    return (componentProperty?.editorType ?? this.defaultEditor ?? 'node') as NodeEditorType
  }
}
