import {useMemo} from 'react'
import {Model} from '../features/define'
import {errorMessageModel, ErrorWrapperProps} from '../features/validation/components/DefaultErrorMessage'
import {useStore} from './contexts/StoreContext'

/**
 * @returns the model of React component used to display the error.
 */
export const useErrorModel = (): Model<ErrorWrapperProps> => {
  const viewerStore = useStore()
  const errorType = viewerStore.form.errorType
  const view = viewerStore.formViewerPropsStore.view

  return useMemo(() => {
    const model = errorType ? view.find(errorType) : errorMessageModel
    return model ?? errorMessageModel
  }, [errorType, view])
}
