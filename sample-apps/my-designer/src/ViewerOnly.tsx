import {createView, FormViewer} from '@react-form-builder/core'
import '@react-form-builder/core/assets/styles.css'

const view = createView([])

export const ViewerOnly = () => {
  return <div style={{width: 400, height: 400, border: '1px solid red'}}>
    <FormViewer view={view}/>
  </div>
}
