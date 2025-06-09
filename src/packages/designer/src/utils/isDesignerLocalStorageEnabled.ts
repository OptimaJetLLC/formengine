/**
 * @returns true if the local storage is enabled for Designer, false otherwise.
 */
export const isDesignerLocalStorageEnabled = () => {
  return process.env.FORM_BUILDER_DESIGNER_DISABLE_LOCAL_STORAGE !== 'true'
}
