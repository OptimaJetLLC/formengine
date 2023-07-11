import {FormViewerProps} from '@react-form-builder/core'
import {BuilderView} from './features/define/utils/BuilderView'
import {FormStorage} from './stores/FormStorage'

/**
 * Properties of the React Form builder component.
 */
export interface FormBuilderProps extends FormViewerProps {

  /**
   * All the metadata of the components of the form builder.
   */
  view: BuilderView

  /**
   * The external form storage.
   */
  formStorage?: FormStorage
}
