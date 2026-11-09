import type {ComponentData, ComponentMetadataEventListeners, ComponentPlacementChange} from '@react-form-builder/core'
import {accordionPanelType, accordionType, syncAccordionPanelKeys} from './panelKeys'

/**
 * Reindexes an accordion when one of its direct panel children changed.
 * @param parent the parent to reindex when it is an accordion
 * @param removedPanel panel that left this parent, when already detached or still present
 * @param removedChildIndex index in the parent's child list before the panel left
 */
function reindexAccordion(parent: ComponentData, removedPanel?: ComponentData, removedChildIndex?: number): void {
  if (parent.model.type !== accordionType) return
  syncAccordionPanelKeys(parent, removedPanel ? {removedPanel, removedChildIndex} : {})
}

function unhandledPlacementChange(_change: never): void {
  return undefined
}

/**
 * Applies accordion panel key sync for a completed placement change.
 * @param node the panel whose placement changed
 * @param change the completed placement change
 * @returns nothing
 */
function handleAccordionPanelPlacementChanged(node: ComponentData, change: ComponentPlacementChange): void {
  switch (change.type) {
    case 'insert':
      if (change.current.parent.model.type === accordionType) {
        syncAccordionPanelKeys(change.current.parent, {insertedPanel: node})
      }
      return
    case 'remove':
      reindexAccordion(change.previous.parent, node, change.previous.index)
      return
    case 'move':
      if (change.previous.parent !== change.current.parent) {
        reindexAccordion(change.previous.parent, node, change.previous.index)
      }
      if (change.current.parent.model.type !== accordionType) return
      syncAccordionPanelKeys(change.current.parent, change.previous.parent === change.current.parent ? {} : {insertedPanel: node})
      return
    default:
      return unhandledPlacementChange(change)
  }
}

/**
 * Keeps accordion panel eventKeys contiguous after a panel is inserted, moved, reordered, or removed.
 */
export const accordionPanelEventListeners: ComponentMetadataEventListeners = {
  /**
   * Reindexes accordion panel eventKeys after a panel is inserted, moved, reordered, or removed.
   * @param node the panel whose placement changed.
   * @param _store the form viewer settings.
   * @param change the completed placement change.
   */
  onNodePlacementChanged: (node, _store, change) => {
    if (node.model.type !== accordionPanelType) return
    handleAccordionPanelPlacementChanged(node, change)
  },
}
