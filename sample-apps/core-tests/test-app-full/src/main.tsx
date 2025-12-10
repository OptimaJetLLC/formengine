import {FormViewer} from '@react-form-builder/core'

const getForm = () => ''

/**
 * Full test app.
 * @returns React app.
 */
export const App = () => {
  return <FormViewer view={{} as any} getForm={getForm} />
}
