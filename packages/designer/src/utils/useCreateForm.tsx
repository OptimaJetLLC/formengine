import {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {useShowMessage} from '../features/toast/toast'
import {useBuilderStore} from './BuilderStoreContext'

/**
 * Used for open create form dialog.
 * @param onSuccess the callback function that is called when a form is successfully created.
 * @returns the function for open create form dialog
 */
export function useCreateForm(onSuccess?: () => void) {
  const builderStore = useBuilderStore()
  const {t} = useTranslation()
  const showMessage = useShowMessage()

  const onError = useCallback((err: any) => {
    console.error(err)
    showMessage({type: 'error', message: err})
  }, [showMessage])

  const loadForm = useCallback((name: string) => {
    builderStore.loadForm(name, onSuccess, onError)
  }, [builderStore, onError, onSuccess])

  const handleAddForm = useCallback((name: string) => {
    if (name) {
      builderStore.createForm(name)
        .then(onSuccess)
        .then(() => loadForm(name))
    }
  }, [builderStore, loadForm, onSuccess])

  const validate = useCallback(async (value: string) => {
    const formKeys = await builderStore.getFormKeys()
    if (formKeys.includes(value)) return t('formsList.formWithNameExists')
  }, [builderStore, t])

  return useCallback(() => {
    builderStore.showPromptModal({
      value: '',
      onOk: handleAddForm,
      title: t('leftMenu.enterFormName'),
      placeholder: t('leftMenu.formNamePlaceholder'),
      validate
    })
  }, [builderStore, handleAddForm, t, validate])
}
