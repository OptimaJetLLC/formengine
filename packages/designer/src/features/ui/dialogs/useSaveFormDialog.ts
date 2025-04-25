import {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'

/**
 * Shows save form prompt with editable name.
 * @param onOk the save handler.
 * @returns the show function.
 */
export const useSaveFormDialog = (onOk: (name: string) => void): () => void => {
  const builderStore = useBuilderStore()
  const {t} = useTranslation()

  return useCallback(() => {
    builderStore.showPromptModal({
      fields: [{name: 'name'}],
      onOk: (({name}) => onOk(name)),
      title: t('leftMenu.enterFormName'),
      placeholder: t('leftMenu.formNamePlaceholder')
    })
  }, [builderStore, onOk, t])
}
