import {isDesignerLocalStorageEnabled} from '../../../utils/isDesignerLocalStorageEnabled'

/**
 * The left panel tab identifiers.
 */
export type LeftPanelSection = 'tree' | 'forms' | 'components' | 'settings'

const leftPanelSections: Record<LeftPanelSection, true> = {
  components: true,
  tree: true,
  settings: true,
  forms: true,
}

/**
 * The default left panel tab.
 */
export const defaultLeftPanelTab: LeftPanelSection = 'components'

const localStorageLeftPanelActiveTabKey = 'leftPanelActiveTab'

function isLeftPanelSection(value: string | null): value is LeftPanelSection {
  return value !== null && Object.hasOwn(leftPanelSections, value)
}

/**
 * Reads the persisted left panel tab from localStorage.
 * @returns the stored tab if it is valid, the default tab otherwise.
 */
export function readLeftPanelActiveTab(): LeftPanelSection {
  if (!isDesignerLocalStorageEnabled()) return defaultLeftPanelTab
  const value = localStorage.getItem(localStorageLeftPanelActiveTabKey)
  return isLeftPanelSection(value) ? value : defaultLeftPanelTab
}

/**
 * Persists the left panel tab to localStorage.
 * @param tab the tab to persist.
 */
export function persistLeftPanelActiveTab(tab: LeftPanelSection) {
  if (isDesignerLocalStorageEnabled()) {
    localStorage.setItem(localStorageLeftPanelActiveTabKey, tab)
  }
}
