import {createView, FormViewerLite} from '@react-form-builder/core/lite'

const view = createView([])
const getForm = () => JSON.stringify({
  form: {
    key: 'Screen',
    type: 'Screen'
  }
})

/**
 * Lite test app.
 * @returns React app.
 */
export const App = () => {
  return <FormViewerLite view={view} getForm={getForm}/>
}
