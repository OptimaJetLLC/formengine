import type {ComponentData} from '@react-form-builder/core'
import {runInAction, set} from 'mobx'

/** FormEngine type name for the accordion container. */
export const accordionType = 'RsAccordion'

/** FormEngine type name for an accordion panel. */
export const accordionPanelType = 'RsAccordionPanel'

type SyncAccordionPanelKeysOptions = {
  /**
   * Panel that is about to be removed (still present in `accordion.children`).
   * Excluded from reindexing; used to retarget active/default keys to a neighbor.
   */
  removedPanel?: ComponentData
  /**
   * Index of the removed panel in the parent's complete child list before it was detached.
   */
  removedChildIndex?: number
  /**
   * Panel that was inserted into the accordion.
   * Existing panels take precedence when it temporarily shares their eventKey.
   */
  insertedPanel?: ComponentData
}

/**
 * Returns accordion panel children in tree order.
 * @param accordion the accordion component data
 * @param exclude optional panel to exclude (e.g. one being removed)
 * @returns panel component data list
 */
export function getAccordionPanels(accordion: ComponentData, exclude?: ComponentData): ComponentData[] {
  return accordion.children.filter(child => child !== exclude && child.model.type === accordionPanelType)
}

/**
 * Reads a string property value from a component store.
 * @param component the component data
 * @param propName the property name
 * @returns the string value, or undefined
 */
function readStringProp(component: ComponentData, propName: string): string | undefined {
  const value = component.store.props[propName]?.value
  return typeof value === 'string' && value.length > 0 ? value : undefined
}

/**
 * Writes a string property value on a component store.
 * @param component the component data
 * @param propName the property name
 * @param value the value to set, or undefined to clear
 */
function writeStringProp(component: ComponentData, propName: string, value: string | undefined): void {
  runInAction(() => {
    if (value === undefined) {
      if (component.store.props[propName]) {
        component.store.props[propName].value = undefined
      }
      return
    }
    if (component.store.props[propName]) {
      component.store.props[propName].value = value
      return
    }
    set(component.store.props, propName, {value})
  })
}

/**
 * Picks a neighbor panel when the active panel is removed.
 * Prefers the previous sibling; otherwise the next (which becomes the panel at the removed index).
 * @param panels remaining panels in order
 * @param removedIndex index of the removed panel among panels before removal
 * @returns the panel that should become active, or undefined if none remain
 */
export function pickNeighborPanel(panels: ComponentData[], removedIndex: number): ComponentData | undefined {
  if (!panels.length) return undefined
  if (removedIndex <= 0) return panels[0]
  return panels[Math.min(removedIndex - 1, panels.length - 1)]
}

/**
 * Index of a panel that is leaving this accordion among panel siblings.
 * Uses the live child list when the panel is still attached. After detach, requires the captured child index
 * from {@link ComponentNodeLocation} — no guessing from eventKey.
 * @param accordion the accordion containing the remaining panels
 * @param panels panel children still on the accordion, or all panel children before detach
 * @param removedPanel the panel that left or is about to leave
 * @param removedChildIndex index in the accordion's complete child list before detach
 * @returns the panel index before removal, or -1 when it cannot be determined
 */
function resolveRemovedIndex(
  accordion: ComponentData,
  panels: ComponentData[],
  removedPanel: ComponentData,
  removedChildIndex?: number
): number {
  const index = panels.indexOf(removedPanel)
  if (index >= 0) return index
  if (removedChildIndex === undefined || removedChildIndex < 0) return -1
  return accordion.children.slice(0, removedChildIndex).filter(child => child.model.type === accordionPanelType).length
}

/**
 * Reindexes direct accordion panel children to contiguous "1".."n" eventKeys and retargets activeKey /
 * defaultActiveKey. Call whenever the accordion's direct panel children are created, removed, moved, or reordered.
 * When a middle panel is removed, the previous sibling becomes active (or the next if the first was removed).
 * @param accordion the parent accordion component data
 * @param options sync options
 */
export function syncAccordionPanelKeys(accordion: ComponentData, options: SyncAccordionPanelKeysOptions = {}): void {
  if (accordion.model.type !== accordionType) return

  const {insertedPanel, removedPanel, removedChildIndex} = options
  const allPanels = accordion.children.filter(child => child.model.type === accordionPanelType)
  const removedIndex = removedPanel ? resolveRemovedIndex(accordion, allPanels, removedPanel, removedChildIndex) : -1
  const panels = getAccordionPanels(accordion, removedPanel)

  const previousActiveKey = readStringProp(accordion, 'activeKey')
  const previousDefaultKey = readStringProp(accordion, 'defaultActiveKey')

  const existingPanels = insertedPanel ? panels.filter(panel => panel !== insertedPanel) : panels
  const findPanel = (key: string | undefined) => {
    if (key === undefined) return undefined
    return (
      existingPanels.find(panel => readStringProp(panel, 'eventKey') === key) ??
      panels.find(panel => readStringProp(panel, 'eventKey') === key)
    )
  }
  let activePanel = findPanel(previousActiveKey)
  let defaultPanel = findPanel(previousDefaultKey)

  if (removedPanel && removedIndex >= 0) {
    const removedKey = readStringProp(removedPanel, 'eventKey')
    if (!activePanel && previousActiveKey !== undefined && previousActiveKey === removedKey) {
      activePanel = pickNeighborPanel(panels, removedIndex)
    }
    if (!defaultPanel && previousDefaultKey !== undefined && previousDefaultKey === removedKey) {
      defaultPanel = pickNeighborPanel(panels, removedIndex)
    }
  }

  panels.forEach((panel, index) => {
    writeStringProp(panel, 'eventKey', String(index + 1))
  })

  if (panels.length === 0) {
    writeStringProp(accordion, 'activeKey', undefined)
    writeStringProp(accordion, 'defaultActiveKey', '1')
    return
  }

  // After reindex, resolve keys from the retained panel identity.
  writeStringProp(accordion, 'activeKey', activePanel ? readStringProp(activePanel, 'eventKey') : undefined)
  writeStringProp(
    accordion,
    'defaultActiveKey',
    defaultPanel ? readStringProp(defaultPanel, 'eventKey') : readStringProp(panels[0], 'eventKey')
  )
}
