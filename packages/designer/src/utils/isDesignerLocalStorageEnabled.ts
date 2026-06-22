/**
 * @returns true if the local storage is enabled for Designer, false otherwise.
 * @ignore
 */
export const isDesignerLocalStorageEnabled = () => {
  return globalThis.FORM_BUILDER_DESIGNER_DISABLE_LOCAL_STORAGE !== 'true'
}
