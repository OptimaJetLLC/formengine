export const toolbarHostAttr = 'data-fe-toolbar'

/**
 * Stable attribute on the toolbar action strip so its expanded width can be measured while it is hidden.
 */
export const toolbarStripAttr = 'data-fe-toolbar-strip'

/**
 * Stable attribute on the toolbar hamburger so it can be excluded from the expanded-width measurement.
 */
export const toolbarHubAttr = 'data-fe-toolbar-hub'

/**
 * Stable attribute on designer drag overlays so views can target them without CSS-module hashes.
 */
export const dragOverlayAttr = 'data-fe-drag-overlay'

/**
 * Stable attribute on editables that leave their overflow scrollbar uncovered.
 */
export const uncoverOverflowAttr = 'data-fe-uncover-overflow'

/**
 * CSS custom property for the uncovered scrollbar band shared by the overlay gap and view padding.
 */
export const uncoverInsetVar = '--fe-uncover-inset'

/**
 * Default uncovered scrollbar band in CSS pixels.
 */
export const uncoverInsetPx = 16

/**
 * Returns the nearest toolbar host ancestor, or document.body.
 * @param node the element to start from.
 * @returns the toolbar host or document.body.
 */
export const overlayRoot = (node: Element | null): HTMLElement => node?.closest(`[${toolbarHostAttr}]`) ?? document.body
