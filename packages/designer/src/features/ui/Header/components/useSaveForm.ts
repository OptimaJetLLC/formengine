import {useTranslation} from 'react-i18next'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {useShowMessage} from '../../../toast/toast'

/**
 * @returns the function to save the form.
 */
export const useSaveForm = () => {
  const builderStore = useBuilderStore()
  const {t} = useTranslation()
  const showMessage = useShowMessage()
  return (formName?: string) => {
    builderStore
      .save(formName)
      .then(() => showMessage({type: 'success', message: t('leftMenu.formSaved')}))
      .catch(err => {
        console.error(err)
        showMessage({type: 'error', message: t('leftMenu.formSaveError')})
      })
  }
}
