import {FormViewerProps} from '@react-form-builder/core'
import {BuilderView} from './features/define/utils/BuilderView'
import {FormStorage} from './stores/FormStorage'

export interface FormBuilderProps extends FormViewerProps {
  view: BuilderView
  formStorage?: FormStorage
}
