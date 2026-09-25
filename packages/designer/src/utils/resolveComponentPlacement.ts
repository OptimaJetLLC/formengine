import type {ComponentData} from '@react-form-builder/core'
import {isNonVisual} from '@react-form-builder/core'
import type {InsertPosition} from './types'

/**
 * Resolved insert placement for a component move or add.
 */
interface ComponentPlacement {
  /**
   * The insertion target after policy rules are applied.
   */
  target: ComponentData
  /**
   * The insertion position relative to the target.
   */
  insertPosition: InsertPosition
  /**
   * The parent slot name, if any.
   */
  slot?: string
  /**
   * The slot condition source, if any.
   */
  slotCondition?: string
}

/**
 * Resolves insert placement so non-visual components always land under the form root with no slot.
 * @param source the component being placed.
 * @param target the requested insertion target.
 * @param insertPosition the requested insertion position.
 * @param slot the requested parent slot name.
 * @param slotCondition the requested slot condition source.
 * @returns the placement to use for the operation.
 */
export function resolveComponentPlacement(
  source: ComponentData,
  target: ComponentData,
  insertPosition: InsertPosition,
  slot?: string,
  slotCondition?: string
): ComponentPlacement {
  if (isNonVisual(source)) {
    return {
      target: target.root,
      insertPosition: 'inner',
      slot: undefined,
      slotCondition: undefined,
    }
  }
  return {target, insertPosition, slot, slotCondition}
}

/**
 * Returns the parent that will own the component after the given placement.
 * @param placement the resolved placement.
 * @returns the parent component for containment checks.
 */
export function getPlacementParent(placement: ComponentPlacement): ComponentData {
  return placement.insertPosition === 'inner'
    ? placement.target
    : (placement.target.parent ?? placement.target.root)
}
