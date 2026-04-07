import {BuilderView, FormBuilder} from '@react-form-builder/designer'
import '@react-form-builder/designer/dist/css/rsuite-no-reset.min.css'
import '@react-form-builder/designer/dist/css/formengine-rsuite.css'
import '@react-form-builder/designer/dist/index.css'

const view = new BuilderView([])

export const DesignerOnly = () => {
  return <FormBuilder view={view}/>
}
