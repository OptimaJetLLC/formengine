import {loadResource} from '@react-form-builder/core'

const cssFiles = import.meta.glob('../public/css/*', {as: 'url'})

/**
 * Loads the Left-To-Right (LTR) CSS for the "rsuite" library.
 * @returns the Promise that resolves when the LTR CSS has been loaded successfully.
 */
export const ltrCssLoader = async () => {
  const href = await cssFiles['../public/css/rsuite.min.css']()
  await loadResource('rsuite-ltr-css', href, 'stylesheet')
}

/**
 * Loads the Right-to-Left (RTL) CSS for the "rsuite" library.
 * @returns the Promise that resolves when the RTL CSS has been loaded successfully.
 */
export const rtlCssLoader = async () => {
  const href = await cssFiles['../public/css/rsuite-rtl.min.css']()
  await loadResource('rsuite-rtl-css', href, 'stylesheet')
}
