import {FormViewerLite} from '@react-form-builder/core/lite'

const getForm = () => ''

/**
 * Lite test app.
 * @returns React app.
 */
export const App = () => {
  return <FormViewerLite view={{} as any} getForm={getForm} />
}
