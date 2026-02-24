import {createView, FormViewer} from '@react-form-builder/core'

const view = createView([])
const getForm = () => JSON.stringify({
  form: {
    key: 'Screen',
    type: 'Screen'
  }
})

/**
 * Full test app.
 * @returns React app.
 */
export const App = () => {
  return <FormViewer view={view} getForm={getForm}/>
}
