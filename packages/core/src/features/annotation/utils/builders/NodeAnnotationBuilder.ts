import type {EditorType} from '../../types/annotations/EditorType'
import {AnnotationBuilder} from './AnnotationBuilder'

/**
 * The builder class to define the node metadata property.
 * @template T the property type.
 */
export class NodeAnnotationBuilder<T> extends AnnotationBuilder<T> {

  /**
   * Creates a component property metadata builder.
   * @param editor the property editor type.
   * @template T the property type.
   */
  constructor(editor: EditorType) {
    super(editor)
  }

  /**
   * Specifies a function that will create conditions that check if a child component can be bound to a parent slot.
   * @param slotConditionBuilder the function that returns a string containing the source code of the function to bind child components.
   * @returns the instance of the metadata property builder.
   */
  withSlotConditionBuilder(slotConditionBuilder: (props: any) => string): this {
    return this.setup({slotConditionBuilder})
  }
}

/**
 * Creates a component property metadata builder.
 * @param editor the property editor type.
 * @template T the property type.
 * @returns the NodeAnnotationBuilder instance.
 */
export function createNodeAnnotation<T>(editor: EditorType) {
  return new NodeAnnotationBuilder<T>(editor)
}

