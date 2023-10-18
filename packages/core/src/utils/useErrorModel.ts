import {Model} from '../features/define'
import {errorMessageModel, ErrorWrapperProps} from '../features/validation/components/DefaultErrorMessage'
import {useStore} from './contexts/StoreContext'

/**
 * @returns the model of React component used to display the error.
 */
export const useErrorModel = (): Model<ErrorWrapperProps> => {
  const viewerStore = useStore()
  const model = viewerStore.form.errorType
    ? viewerStore.formViewerPropsStore.view.find(viewerStore.form.errorType)
    : errorMessageModel
  return model ?? errorMessageModel
}
