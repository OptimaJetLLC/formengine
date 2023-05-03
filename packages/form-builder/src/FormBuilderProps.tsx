import {FormViewerProps} from 'fb-core'
import {BuilderView} from './features/define'
import {FormStorage} from './stores/FormStorage'

export interface FormBuilderProps extends FormViewerProps {
  view: BuilderView
  formStorage?: FormStorage
}
