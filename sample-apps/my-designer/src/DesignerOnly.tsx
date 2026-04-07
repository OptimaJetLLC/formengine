import {BuilderView, FormBuilder} from '@react-form-builder/designer'
import '@react-form-builder/designer/assets/designer.ltr.min.css'

const view = new BuilderView([])

export const DesignerOnly = () => {
  return <FormBuilder view={view}/>
}
