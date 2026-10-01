/**
 * Floating / tree toolbar icons for the Designer Guide.
 * Content uses `:toolbar-icon[name]:` (remark) or `<ToolbarIcon name="…" />` (MDX).
 */

/** @typedef {'reveal' | 'nearby' | 'add' | 'clone' | 'preset' | 'remove' | 'open-actions'} ToolbarIconName */

/** @type {ReadonlyArray<ToolbarIconName>} */
const TOOLBAR_ICON_NAMES = Object.freeze([
  'reveal',
  'nearby',
  'add',
  'clone',
  'preset',
  'remove',
  'open-actions',
]);

/** @type {ReadonlySet<string>} */
const NAME_SET = new Set(TOOLBAR_ICON_NAMES);

/**
 * @param {string} name
 * @returns {name is ToolbarIconName}
 */
export function isToolbarIconName(name) {
  return NAME_SET.has(name);
}

/**
 * @param {ToolbarIconName} name
 * @returns {string}
 */
export function toolbarIconHtml(name) {
  return `<span class="fe-toolbar-icon fe-toolbar-icon--${name}" aria-hidden="true"></span>`;
}
