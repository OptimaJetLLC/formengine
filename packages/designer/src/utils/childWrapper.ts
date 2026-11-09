import type {
  Annotation,
  ChildWrapperOptions,
  ComponentData,
  ComponentNodeLocation,
  ComponentPlacementChange,
  Meta,
} from '@react-form-builder/core'
import {isContainer} from '@react-form-builder/core'
import type {ComponentPlacement} from './resolveComponentPlacement'

/**
 * Returns the auto-wrapper configuration for a child dropped into a parent slot, if wrapping is needed.
 * @param annotation the parent slot annotation
 * @param child the child being inserted or moved
 * @returns the wrapper configuration, or undefined when the child should be inserted directly
 */
export function getChildWrapper(annotation: Annotation | undefined, child: ComponentData): ChildWrapperOptions | undefined {
  if (!annotation || !isContainer(annotation) || !annotation.childWrapper) return undefined
  if (child.model.type === annotation.childWrapper.componentType) return undefined
  return annotation.childWrapper
}

/**
 * Captures a component's current position in the component tree.
 * @param node the component to locate
 * @returns the component location, or undefined when it is detached
 */
function getComponentNodeLocation(node: ComponentData): ComponentNodeLocation | undefined {
  const parent = node.parent
  if (!parent) return undefined
  const index = parent.children.indexOf(node)
  if (index < 0) return undefined
  return {parent, index, slot: node.store.slot, slotCondition: node.store.slotCondition}
}

/**
 * Deletes a component and notifies placement listeners after detach and before dispose.
 * {@link ComponentData.delete} removes the node from its parent, then fires `onBeforeDelete`, then disposes.
 * The location is captured before delete so listeners still receive a valid {@link ComponentNodeLocation}.
 * @param source the component to delete
 * @param notifyRemoval called with the pre-captured location when delete reaches onBeforeDelete for `source`
 */
export function deleteComponentAndNotifyRemoval(source: ComponentData, notifyRemoval: (previous: ComponentNodeLocation) => void): void {
  const previous = getComponentNodeLocation(source)
  if (!previous) {
    source.delete()
    return
  }

  const onBeforeDelete = (deletedNode: ComponentData): void => {
    if (deletedNode !== source) return
    notifyRemoval(previous)
  }

  source.events.onBeforeDelete.subscribe(onBeforeDelete)
  try {
    source.delete()
  } finally {
    source.events.onBeforeDelete.unsubscribe(onBeforeDelete)
  }
}

/**
 * Checks direct containment without applying child-wrapper auto-wrap.
 * @param parent the prospective parent
 * @param child the prospective child
 * @param childMeta the child metadata
 * @param annotation the parent slot annotation
 * @param slot the parent slot name
 * @returns true if the child can be a direct child of the parent
 */
export function canContainDirect(
  parent: ComponentData,
  child: ComponentData,
  childMeta: Meta,
  annotation: Annotation | undefined,
  slot?: string
): boolean {
  const slotName = slot ?? 'children'

  if (childMeta.insertRestriction?.(child, parent, slotName) === false) return false

  if (annotation && isContainer(annotation) && annotation.insertPredicate) {
    return annotation.insertPredicate(parent, child)
  }
  return true
}

/**
 * Actions BuilderStore supplies so child-wrapper placement stays outside the store class.
 */
export interface ChildWrapperPlacementActions {
  /**
   * Places a component at the resolved placement without applying child-wrapper auto-wrap.
   */
  placeAt: (source: ComponentData, placement: ComponentPlacement) => void
  /**
   * Creates a seeded wrapper component (e.g. an accordion panel).
   */
  createWrapper: (componentType: string) => ComponentData
  /**
   * Notifies metadata after a node's tree position changes.
   */
  notifyPlacementChanged: (node: ComponentData, change: ComponentPlacementChange) => void
  /**
   * Notifies metadata after a wrapper has been created and added to the form.
   */
  notifyCreated: (node: ComponentData) => void
}

/**
 * Places a source node, auto-wrapping when the parent slot declares a child wrapper.
 * @param source the component being moved or inserted
 * @param placement the resolved placement under the destination parent
 * @param parentMeta metadata of the placement parent
 * @param actions store-backed place / create / notify callbacks
 */
export function placeSourceWithOptionalWrapper(
  source: ComponentData,
  placement: ComponentPlacement,
  parentMeta: Meta,
  actions: ChildWrapperPlacementActions
): void {
  const previous = getComponentNodeLocation(source)
  const annotation = parentMeta.properties.find(property => property.key === (placement.slot ?? 'children'))
  const childWrapper = getChildWrapper(annotation, source)
  let wrapper: ComponentData | undefined = undefined

  if (childWrapper) {
    wrapper = actions.createWrapper(childWrapper.componentType)
    actions.placeAt(wrapper, placement)
    actions.placeAt(source, {target: wrapper, insertPosition: 'inner', slot: childWrapper.childSlot})
  } else {
    actions.placeAt(source, placement)
  }

  if (wrapper) {
    const current = getComponentNodeLocation(wrapper)
    if (!current) throw new Error('The auto-created child wrapper was not attached to the component tree')
    actions.notifyPlacementChanged(wrapper, {type: 'insert', current})
  }

  const current = getComponentNodeLocation(source)
  if (!current) throw new Error('The placed component was not attached to the component tree')
  actions.notifyPlacementChanged(source, previous ? {type: 'move', previous, current} : {type: 'insert', current})

  if (wrapper) actions.notifyCreated(wrapper)
}
